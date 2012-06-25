(function (window) {
	"use strict";
	var document = window.document;
	if (typeof document.querySelector === "function") {
		var flatten = function (array) {
			var returnValue = [];
			var temporaryFlatArray;
			var i = 0;
			var e = 0;
			for (i = 0; i < array.length; i++) {
				if (Array.isArray(array[i])) {
					temporaryFlatArray = flatten(array[i]);
					for (e = 0; e < temporaryFlatArray.length; e++) {
						returnValue.push(temporaryFlatArray[e]);
					}
				} else {
					returnValue.push(array[i]);
				}
			}
			return returnValue;
		};
		var internalRegex = {
			/**
			* regex without whitespace
			* matches /
			* is not followed by a *
			* must contain one or more of pretty much anything
			* has a /
			* optional flags
			* is not followed by spaces, letters or numbers.
			* case insensitive.
			*/
			regex1: /\/(?![\*])(?:[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,<\.\>\/\?a-z0-9])+\/[gim]*(?=\,|\;|\]|\)|\}|\n|\r|\n\r|$)(?![a-z0-9\040])/gi,
			/**
			* regex with whitespace
			* matches /
			* is not followed by a *
			* must contain one or more of pretty much anything
			* has a /
			* optional flags
			* is not followed by spaces, letters or numbers.
			* case insensitive.
			*/
			regex2: /\/(?![\*])(?:\040*[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,<\.\>\/\?a-z0-9])+\/[gim]*(?=\,|\;|\]|\)|\}|\n|\r|\n\r|$)(?![a-z0-9\040])/gi,
			/**
			* numbers
			*/
			number: /[\+\-]?\b(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][\+\-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
			/**
			* matches and forgets '
			* matches and forgets ' or \
			* matches and forgets \ and all characters
			* matches and forgets '
			* or
			* matches and forgets "
			* matches and forgets " or \
			* matches and forgets \ and all characters
			* matches and forgets "
			*/
			string: /(?:'[^'\\]*(?:\\.[^'\\]*)*')|(?:"[^"\\]*(?:\\.[^"\\]*)*")/g,
			/**
			* matches and remembers (1) whitespace
			* matches and remembers (1) one character of a letter, number or whitespace
			* matches and remembers (2) //
			* matches and remembers (2) all characters until new line
			* case insensitive
			*/
			singlecomment: /\/\/.+?(?=\n|\r|$)/ig,
			/**
			* matches / *
			* matches any whitespace and non whitespace
			* matches * /
			*/
			multicomment: /\/\*[\s\S]+?\*\//g,
			/**
			* matches whitespace before or after string
			*/
			whitespace: /^\s+|\s+$/g,
			/**
			* matches any carage return
			*/
			newline: /[\n\r]/g,
			/**
			* matches "
			*/
			quote: /"/g,
			/**
			* matches <
			*/
			lessthan: /</g,
			/**
			* matches >
			*/
			greaterthan: />/g,
			/**
			* matches &
			*/
			ampersand: /&/g,
			/**
			* matches <a
			* with href="..."
			* and other attributes
			* matches >
			* matches text
			* matches </a>
			*/
			link: /<a\b href="[htpfs]+:\/\/[^"]+"[^>]*>(?:.*?)<\/a>/g,
			/**
			* matches <
			* matches and forgets ! or /
			* matches alpha-numeric tag name
			* matches and forgets attributes
			* matches >
			*/
			tag: /<(?:\!|\/)?[a-z][a-z0-1\-]\s*(?:[^>]+)?\>/ig,
			/**
			* matches url
			*/
			url: /(?:http|ftp|https):\/\/[\w\-_]+(?:\.[\w\-_]+)+(?:[\w\-\.,@?\^=%&amp;:\/~\+#]*[\w\-@?\^=%&amp;\/~\+#])?/g
		};
		var defaultProperties = {
			"selector": "",
			"findregex": true,
			"findcomments": true,
			"findstrings": true,
			"removewhitespace": true,
			"starttag": "<!--",
			"endtag": "-->",
			"language": "javascript",
			"showlinenumbers": true,
			"preparsed": false
		};
		var currentData = {
			minimumStart: 0,
			processed: [],
			initialLength: 0,
			options: {},
			language: {},
			data: "",
			node: null
		};
		var stringRegex = /^[0-9]*[a-z]+[0-9]*$/ig;
		var highlightJavascript = function(node, options) {
			var lines;
			currentData = {
				minimumStart: 0,
				processed: [node.innerHTML],
				initialLength: 0,
				options: options,
				language: highlightJavascript.language[options.language],
				data: node.innerHTML,
				node: node
			};
			for (var attr in currentData.language.regex) {
				if (currentData.language.regex.hasOwnProperty(attr)) {
					if (internalRegex[attr] !== currentData.language.regex[attr]) {
						internalRegex[attr] = currentData.language.regex[attr];
					}
				}
			}
			if (highlightJavascript.language[currentData.node.dataset.type]) {
				currentData.language = highlightJavascript.language[currentData.node.dataset.type];
			}
			currentData.processed[0] = currentData.processed[0].replace(currentData.options.starttag, "").replace(currentData.options.endtag, "");
			//if true, remove starting and ending whitespace
			if (currentData.options.removewhitespace) {
				currentData.processed[0] = currentData.processed[0].replace(internalRegex.whitespace, "");
			}
			currentData.initialLength = currentData.processed.length;
			//place to start searching the array. As more is parsed, the need to go back to zero diminishes, and we can start later in the array.
			currentData.minimumStart = 0;
			if (currentData.options.preparsed) {
				currentData.processed[0] = currentData.processed[0].replace(/&amp;/g, "&");
				currentData.processed[0] = currentData.processed[0].replace(/&lt;/g, "<");
				currentData.processed[0] = currentData.processed[0].replace(/&gt;/g, ">");
				currentData.processed[0] = currentData.processed[0].replace(/&quot;/g, '"');
			}
			while (highlightJavascript.parseQue()) {
				highlightJavascript.parseQue();
			}
			var parsed = highlightJavascript.mergeResults();
			if (parsed.match(internalRegex.newline)) {
				parsed = parsed.split(internalRegex.newline);
				parsed = parsed.join("</span></li><li><span>");
			}
			parsed = "<ol><li><span>" + parsed + "</span></li></ol>";
			currentData.node.parsed = parsed;
			currentData.node.unparsed = currentData.data;
			currentData.node.parse = function() {
				if (this.innerHTML === this.parsed) {
					console.warn("Already ran highlightJavascript on this node.");
				} else {
					this.innerHTML = this.parsed;
				}
			};
			currentData.node.unparse = function() {
				if (this.innerHTML === this.unparsed) {
					console.warn("Already ran highlightJavascript on this node.");
				} else {
					this.innerHTML = this.unparsed;
				}
			};
			currentData.node.innerHTML = parsed;
			//show line numbers
			if (currentData.options.showlinenumbers === false) {
				currentData.node.children[0].style.marginLeft = "5px";
				currentData.node.children[0].style.listStyleType = "none";
			} else {
				lines = ((currentData.data.indexOf("\n") !== -1) ? currentData.data.split("\n") : currentData.data.split("\r")).length;
				if (lines > 100) {
					if (lines > 1000) {
						currentData.node.children[0].style.marginLeft = "5em";
					} else {
						currentData.node.children[0].style.marginLeft = "4em";
					}
				}
			}

		};
		highlightJavascript.mergeResults = function(data) {
			if (!data) {
				data = currentData.processed;
			}

			var finalString = "";
			var length = data.length;
			for (var i = 0; i < length; i++) {
				if (typeof data[i] === "string") {
					finalString = finalString + data[i];
				} else if (typeof data[i] === "object") {
					if (Array.isArray(data[i].data)) {
						finalString = finalString + data[i].before + highlightJavascript.mergeResults(data[i].data) + data[i].after;
					} else {
						finalString = finalString + data[i].before + data[i].data + data[i].after;
					}
				}
			}
			return finalString;
		};
		highlightJavascript.parseQue = function() {
			var i=0;
			var que = ["link"];
			if (currentData.options.findregex) {
				que.push("regex1");
			}
			if (currentData.options.findcomments) {
				que.push("multicomment");
			}
			if (currentData.options.findcomments) {
				que.push("singlecomment");
			}
			if (currentData.options.findstrings) {
				que.push("string");
			}
			if (currentData.options.findregex) {
				que.push("regex2");
			}
			que.push("url");
			//only try things if it's a string. Otherwise it's an object meaning we've parsed it.
			if (typeof currentData.processed[currentData.minimumStart] === "string") {
				for (i = 0; i < que.length; i++) {
					if (currentData.processed[currentData.minimumStart].match(internalRegex[que[i]])) {
						currentData.processed = highlightJavascript.process(internalRegex[que[i]], [que[i]]);
						// check after each potential change to the array length
						if (highlightJavascript.restartScan()) {
							return true;
						}
					}
				}
				for (i = 0; i < currentData.language.regexList.length; i++) {
					if (currentData.processed[currentData.minimumStart].match(currentData.language.regexList[i].regex)) {
						currentData.processed = highlightJavascript.process.custom(currentData.language.regexList[i].regex, currentData.language.regexList[i].css);
						//check after each potential change to the array length
						if (highlightJavascript.restartScan()) {
							return true;
						}
					}
				}
			}
			//add one to minimumStart if we didn't find anything to parse in this index.
			currentData.minimumStart = currentData.minimumStart + 1;
			if (currentData.minimumStart < currentData.processed.length) {
				return true;
			} else {
				return false;
			}
		};
		highlightJavascript.restartScan = function() {
			if (currentData.originalLength !== currentData.processed.length) {
				currentData.originalLength = currentData.processed.length;
				return true;
			}
			return false;
		};
		highlightJavascript.process = function(regex, type) {
			var log = false;
			var matches = currentData.processed[currentData.minimumStart].match(regex);
			var parsedString = [currentData.processed[currentData.minimumStart]];

			var match, regexMatch, splitString, gaps, filled, i, e, r;
			for (i = 0; i < matches.length; i++) {
				match = highlightJavascript.process[type](matches[i]);
				for (e = 0; e < parsedString.length; e++) {
					if (typeof parsedString[e] === "string") {
						if (matches[i].match(stringRegex) && matches[i].match(internalRegex.newline) === null) {
							regexMatch = new RegExp("\\b" + matches[i] + "\\b", "gm");
						} else {
							regexMatch = matches[i];
						}
						if (parsedString[e].indexOf(matches[i]) > -1) {
							if (parsedString[e].split(regexMatch)[0] !== parsedString[e]) {
								splitString = parsedString[e].split(regexMatch);
								gaps = splitString.length - 1;
								filled = 0;
								for (r = splitString.length; r > 0; r--) {
									splitString.splice(r - 1, 0, match);
									filled = filled + 1;
									if (filled === gaps) {
										r = 0;
									}
								}
								parsedString[e] = splitString;
							}
						}
					}
				}
				parsedString = flatten(parsedString);
			}
			currentData.processed[currentData.minimumStart] = flatten(parsedString);
			return flatten(currentData.processed);
		};
		highlightJavascript.process.custom = function(regex, style) {
			var internalFunction = function(string, style) {
				return highlightJavascript.process.generic("custom", "<span class=\"" + style + "\">", highlightJavascript.process.sanitize(string), "</span>");
			};
			var matches = currentData.processed[currentData.minimumStart].match(regex);
			var parsedString = [currentData.processed[currentData.minimumStart]];
			var match, regexMatch, splitString, gaps, filled, i, e, r;
			for (i = 0; i < matches.length; i++) {
				match = internalFunction(matches[i], style);
				for (e = 0; e < parsedString.length; e++) {
					if (typeof parsedString[e] === "string") {
						if (matches[i].match(stringRegex) && matches[i].match(internalRegex.newline) === null) {
							regexMatch = new RegExp("\\b" + matches[i] + "\\b", "gm");
						} else {
							regexMatch = matches[i];
						}
						if (parsedString[e].indexOf(matches[i]) > -1) {
							if (parsedString[e].split(regexMatch)[0] !== parsedString[e]) {
								splitString = parsedString[e].split(regexMatch);
								gaps = splitString.length - 1;
								filled = 0;
								for (r = splitString.length; r > 0; r--) {
									splitString.splice(r - 1, 0, match);
									filled = filled + 1;
									if (filled === gaps) {
										r = 0;
									}
								}
								parsedString[e] = splitString;
							}
						}
					}
				}
				parsedString = flatten(parsedString);
			}
			currentData.processed[currentData.minimumStart] = flatten(parsedString);
			return flatten(currentData.processed);
		};
		highlightJavascript.process.sanitize = function(string) {
			string = string.replace(internalRegex.ampersand, function(string, offset) {
				return "&amp;";
			});
			string = string.replace(internalRegex.quote, function(string, offset) {
				return "&quot;";
			});
			string = string.replace(internalRegex.lessthan, function(string, offset) {
				return "&lt;";
			});
			string = string.replace(internalRegex.greaterthan, function(string, offset) {
				return "&gt;";
			});
			return string;
		};
		highlightJavascript.process.generic = function(type, before, data, after) {
			return {
				type: type,
				before: before,
				data: data,
				after: after
			};
		};
		highlightJavascript.process.link = function(string) {
			return highlightJavascript.process.generic("link", "", highlightJavascript.process.escaped(string), "");
		};
		highlightJavascript.process.url = function(string) {
			return highlightJavascript.process.generic("url", "<a href=\"" + string + "\">", highlightJavascript.process.escaped(string), "</a>");
		};
		highlightJavascript.process.regex1 = function(string) {
			return highlightJavascript.process.generic("regex", "<span class=\"regex\">", highlightJavascript.process.escaped(string), "</span>");
		};
		highlightJavascript.process.regex2 = function(string) {
			return highlightJavascript.process.generic("regex", "<span class=\"regex\">", highlightJavascript.process.escaped(string), "</span>");
		};
		highlightJavascript.process.singlecomment = function(string) {
			return highlightJavascript.process.generic("comment", "<span class=\"comment\">", highlightJavascript.process.escaped(string), "</span>");
		};
		highlightJavascript.process.multicomment = function(string) {
			var newString = highlightJavascript.process.inlineUrl(string);
			if (typeof newString === "object") {
				for (var q = 0; q < newString.length; q++) {
					if (typeof newString[q] === "string" && newString[q].match(internalRegex.newline)) {
						newString[q] = newString[q].replace(internalRegex.newline, "</span>$1<span class=\"comment\">");
					}
				}
			} else {
				if (newString.match(internalRegex.newline)) {
					newString = newString.replace(internalRegex.newline, "</span>$1<span class=\"comment\">");
				}
			}
			return highlightJavascript.process.generic("comment", "<span class=\"comment\">", newString, "</span>");
		};
		highlightJavascript.process.string = function(string) {
			var newString = highlightJavascript.process.inlineUrl(string);
			if (typeof newString === "object") {
				for (var q = 0; q < newString.length; q++) {
					if (typeof newString[q] === "string" && newString[q].match(internalRegex.newline)) {
						newString[q] = newString[q].replace(internalRegex.newline, "</span>$1<span class=\"string\">");
					}
				}
			} else {
				if (newString.match(internalRegex.newline)) {
					newString = newString.replace(internalRegex.newline, "</span>$1<span class=\"string\">");
				}
			}
			return highlightJavascript.process.generic("string", "<span class=\"string\">", newString, "</span>");
		};
		highlightJavascript.process.inlineUrl = function(string) {
			var internalFunction = function(string) {
				return highlightJavascript.process.generic("url", "<a href=\"" + string + "\">", string, "</a>");
			};
			var matches = string.match(internalRegex.url);
			if (matches === null) {
				return highlightJavascript.process.sanitize(string);
			}
			var parsedString = [string];
			var match, regexMatch, splitString, gaps, filled, i, e, r;
			for (i = 0; i < matches.length; i++) {
				match = internalFunction(matches[i]);
				for (e = 0; e < parsedString.length; e++) {
					if (typeof parsedString[e] === "string") {
						if (parsedString[e].indexOf(matches[i]) > -1) {
							splitString = parsedString[e].split(matches[i]);
							gaps = splitString.length - 1;
							filled = 0;
							for (r = splitString.length; r > 0; r--) {
								splitString.splice(r - 1, 0, match);
								filled = filled + 1;
								if (filled === gaps) {
									r = 0;
								}
							}
							parsedString[e] = splitString;
						}
					}
				}
				parsedString = flatten(parsedString);
			}
			parsedString = flatten(parsedString);
			for (var q = 0; q < parsedString.length; q++) {
				if (typeof parsedString[q] === "string") {
					parsedString[q] = highlightJavascript.process.sanitize(parsedString[q]);
				}
			}
			return parsedString;
		};
		highlightJavascript.process.escaped = function(string) {
			var internalFunction = function(string) {
				return highlightJavascript.process.generic("escaped", "<span class=\"constant\">", highlightJavascript.process.sanitize(string), "</span>");
			};
			var matches = string.match(internalRegex.escaped);
			if (matches === null) {
				return highlightJavascript.process.sanitize(string);
			}
			var parsedString = [string];
			var match, regexMatch, splitString, gaps, filled, i, e, r;
			for (i = 0; i < matches.length; i++) {
				match = internalFunction(matches[i]);
				for (e = 0; e < parsedString.length; e++) {
					if (typeof parsedString[e] === "string") {
						if (parsedString[e].indexOf(matches[i]) > -1) {
							if (matches[i].match(stringRegex) && matches[i].match(internalRegex.newline) === null) {
								regexMatch = new RegExp("\\b" + matches[i] + "\\b", "gm");
							} else {
								regexMatch = matches[i];
							}
							splitString = parsedString[e].split(regexMatch);
							gaps = splitString.length - 1;
							filled = 0;
							for (r = splitString.length; r > 0; r--) {
								splitString.splice(r - 1, 0, match);
								filled = filled + 1;
								if (filled === gaps) {
									r = 0;
								}
							}
							parsedString[e] = splitString;
						}
					}
				}
				parsedString = flatten(parsedString);
			}
			parsedString = flatten(parsedString);
			for (var q = 0; q < parsedString.length; q++) {
				if (typeof parsedString[q] === "string") {
					parsedString[q] = highlightJavascript.process.sanitize(parsedString[q]);
				}
			}
			return parsedString;
		};
		highlightJavascript.init = function(nodes, propertiesObject) {
			if (propertiesObject) {
				for (var attr in defaultProperties) {
					if (defaultProperties.hasOwnProperty(attr)) {
						if (propertiesObject[attr] !== undefined && (propertiesObject[attr] !== defaultProperties[attr])) {
							defaultProperties[attr] = propertiesObject[attr];
						}
					}
				}
			}
			if (defaultProperties.selector === "" && nodes !== "all") {
				defaultProperties.selector = "pre code[data-type=\"" + defaultProperties.language + "\"]";
			} else if (nodes === "all" && defaultProperties.selector === "") {
				defaultProperties.selector = "pre code[data-type]";
			}
			if (nodes === "all") {
				nodes = document.querySelectorAll(defaultProperties.selector);
			} else if (typeof nodes === "string") {
				nodes = document.querySelectorAll(nodes);
			}
			for (var i = 0; i < nodes.length; i++) {
				highlightJavascript(nodes[i], defaultProperties);
			}
		};
		highlightJavascript.getKeywords = function(array) {
			return '\\b' + array.join('\\b|\\b') + '\\b';
		};
		highlightJavascript.language = {};
		highlightJavascript.data = {};
		highlightJavascript.status = function() {

		};
		window.highlightJavascript = highlightJavascript;
	} else {
		if (console && typeof console.error === "function") {
			console.error("Your browser does not support document.querySelector. Please use a newer browser.");
		}
	}
}(window));