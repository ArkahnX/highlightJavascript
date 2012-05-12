(function(window) {
	"use strict";
	var document = window.document;
	var highlightJavascript = function(input, options, language) {
			var lines, marginLeft, type, name, id, attr;
			var element = input;
			var selector = input.id;
			var originalCode = input.firstChild.data;
			var start = "<ol>";
			var end = "</ol>";
			var code = input.firstChild.data;
			var data = {
				"comment": {},
				"string": {},
				"code": {},
				"type": null
			};
			/**
			 * Make a reference to the language values. Javascript language definition is included by default.
			 */
			var regex = language.regex;
			var regexList = language.regexList;
			var types = ["comment", "string"];
			var i = 0;
			var e = 0;
			/**
			 * Functions defined outside of all loops in order to prevent having to recreate them repeatedly.
			 */
			var offsetFunctions = [function(string) {
				return "<a href=\"" + string + "\">" + string + "</a>";
			}, function(string, offset) {
				data[data.type][offset] = string;
				return "~{" + data.type + "-" + offset + "}~";
			}, function(string) {
				return "</span>" + string + "<span class=\"" + data.type + "\">";
			}, function(string) {
				data.code[e] = "<span class=\"" + regexList[i].css + "\">" + string + "</span>";
				e = e + 1;
				return "~{code-" + (e - 1) + "}~";
			}, function(string) {
				name = string.split("{")[1].split("-")[0];
				id = string.split("{")[1].split("-")[1].split("}")[0];
				return data[name][id];
			}];
			/**
			 * Used to fix issue caused by <pre><code class="">...</code></pre> being within the code.
			 * The browser would read the tags and implement them, causing undesired effects.
			 * In reality we want the tags to show up as text, not be rendered.
			 */
			code = code.replace(/\<\/?(?:code|pre)\s*(?:[^>]+)?\>/ig, function(string) {
				string = string.replace("<", "&lt;");
				string = string.replace(">", "&gt;");
				return string
			});
			/**
			 * Interpret urls as links.
			 */
			if (code.match(regex.url)) {
				code = code.replace(regex.url, offsetFunctions[0]);
			}
			/**
			 * Comment and String parsing are practically the same, with different parameters being the only difference, so we optomize by using this loop to avoid code duplication.
			 * Comment and string regex to look for is provided by the language definition.
			 */
			for (i = 0; i < types.length; i++) {
				data.type = types[i];
				if (code.match(regex[data.type])) {
					code = code.replace(regex[data.type], offsetFunctions[1]);
					for (attr in data[data.type]) {
						/**
						 * If Object.prototype has been modified we need the below line.
						 */
						if (data[data.type].hasOwnProperty(attr)) {
							data[data.type][attr] = "<span class=\"" + data.type + "\">" + data[data.type][attr];
							if (data[data.type][attr].match(regex.newline)) {
								data[data.type][attr] = data[data.type][attr].replace(regex.newline, offsetFunctions[2]);
							}
							data[data.type][attr] = data[data.type][attr] + "</span>";
						}
					}
				}
			}
			/**
			 * Run through each custom defined regex used by the language.
			 */
			for (i = 0; i < regexList.length; i++) {
				if (code.match(regexList[i].regex)) {
					code = code.replace(regexList[i].regex, offsetFunctions[3]);
				}
			}
			/**
			 * Replace all temporary code placeholders with the parsed values. This prevents duplicate parsing.
			 */
			if (code.match(/\~\{.*?\}\~/g)) {
				code = code.replace(/\~\{.*?\}\~/g, offsetFunctions[4]);
			}
			/**
			 * Split newlines into list items for proper numbering.
			 */
			if (code.match(regex.newline)) {
				code = code.split(regex.newline);
				code = code.join("</span></li><li><span>");
			}
			/**
			 * Todo, code may start and end with linebreak, make sure to remove initial and trailing linebreaks at start of parsing.
			 */
			code = "<li><span>" + code + "</span></li>";
			/**
			 * Replace pre tag code with parsed code.
			 */
			element.innerHTML = (start + code + end);
			/**
			 * Style for newlines.
			 */
			if (options && ((options[selector] && options[selector].indexOf("nolines") > -1) || options.all.indexOf("nolines") > -1)) {
				element.children[0].style.marginLeft = "5px";
				element.children[0].style.listStyleType = "none";
			} else {
				lines = ((originalCode.indexOf("\n") !== -1) ? originalCode.split("\n") : originalCode.split("\r")).length;
				if (lines > 100) {
					if(lines > 1000) {
						marginLeft = "5em";
						element.children[0].style.marginLeft = marginLeft;
					} else {
						marginLeft = "4em";
						element.children[0].style.marginLeft = marginLeft;
					}
				}
			}
		};
	var getKeywords = function(str) {
		str = str.join(" ");
		str = str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '|');
		return '\\b(?:' + str + ')(?!}~)?\\b';
	};
	var format = function(options) {
		var i, codeList, formattedOptions;
		if (options) {
			if (options === "nolines") {
				formattedOptions = {
					"all": ["nolines"]
				};
			}
		}
		codeList = document.querySelectorAll("pre code[class]");
		for (i = 0; i < codeList.length; i++) {
			if (highlightJavascript.language[codeList[i].className]) {
				highlightJavascript(codeList[i], formattedOptions, highlightJavascript.language[codeList[i].className]);
			} else {
				console.error("The language: \"" + codeList[i].className + "\", is not included!");
			}
		}
	};
	highlightJavascript["language"] = {};
	highlightJavascript["getKeywords"] = getKeywords;
	highlightJavascript["format"] = format;
	window["highlightJavascript"] = highlightJavascript;
}(window));
(function(sh) {
	var nativeVar = ["__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$_", "$input", "Array", "Boolean", "ChartoUTF8", "Date", "E", "Function", "JSON", "LN10", "LN2", "LOG10E", "LOG2E", "Math", "Number", "Object", "PI", "RegExp", "SQRT1_2", "SQRT2", "String", "UTC", "abs", "acos", "anchor", "apply", "asin", "atan", "atan2", "big", "bind", "blink", "bold", "call", "ceil", "charAt", "charCodeAt", "concat", "cos", "create", "defineProperties", "defineProperty", "document", "every", "exp", "filter", "fixed", "floor", "fontcolor", "fontsize", "forEach", "freeze", "getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getOwnPropertyDescriptor", "getOwnPropertyNames", "getPrototypeOf", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "hasOwnProperty", "indexOf", "isExtensible", "isFrozen", "isPrototypeOf", "isSealed", "italics", "join", "lastIndexOf", "link", "localeCompare", "log", "map", "match", "max", "min", "now", "parse", "pop", "pow", "preventExtensions", "propertyIsEnumerable", "push", "random", "reduce", "reduceRight", "replace", "reverse", "round", "seal", "search", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "shift", "sin", "slice", "small", "some", "sort", "splice", "split", "sqrt", "strike", "stringify", "sub", "substr", "substring", "sup", "tan", "toDateString", "toExponential", "toFixed", "toGMTDateString", "toISODateString", "toJSON", "toLocaleDateString", "toLocaleLowerCase", "toLocaleString", "toLocaleTimeString", "toLocaleUpperCase", "toLowerCase", "toPrecision", "toString", "toTimeString", "toUTCString", "toUpperCase", "trim", "trimLeft", "trimRight", "unshift", "valueOf", "window"];
	var reserved = ["function", "var", "let", "const", "void", "native"];
	var constructs = ["if", "for", "while", "with", "else", "return", "break", "new", "in", "switch", "try", "catch", "case"];
	var lang = ["NaN", "true", "false", "undefined", "null"];
	var constant = ["arguments", "caller", "constructor", "keys", "prototype", "MAX_VALUE", "MIN_VALUE", "NEGATIVE_INFINITY", "POSITIVE_INFINITY", "multiline", "lastMatch", "lastParen", "leftContext", "length", "name", "rightContext", "input"];
	var regex = {
		"url": /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/g,
		"comment": /\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g,
		"string": /(?:"|')[^(?:"|')\\]*(?:\\.[^(?:"|')\\]*)*(?:"|')/g,
		"number": /\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b(?!\}\~)/g,
		"newline": /[\r\n]/g,
		"math": /(\||\+|\=|\-|\/|\>|\<|\!|\?|\&|\%|\$)(?![0-9]*}~)/g,
		"bracket": /\{|\}|\(|\)|\[|\]/g,
		"function": /\b(?!function|if|else|for|while|with|try)(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,
		"regex": /\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g
	};
	var regexList = [{
		regex: regex["regex"],
		css: "regex"
	}, {
		regex: new RegExp(sh["getKeywords"](nativeVar), 'gm'),
		css: "native"
	}, {
		regex: new RegExp(sh["getKeywords"](reserved), 'gm'),
		css: "reserved"
	}, {
		regex: new RegExp(sh["getKeywords"](constructs), 'gm'),
		css: "constructs"
	}, {
		regex: new RegExp(sh["getKeywords"](lang), 'gm'),
		css: "language"
	}, {
		regex: new RegExp(sh["getKeywords"](constant), 'gm'),
		css: "constant"
	}, {
		regex: regex["number"],
		css: "number"
	}, {
		regex: regex["math"],
		css: "constructs"
	}, {
		regex: regex["function"],
		css: "function"
	}];
	sh.language = sh.language || {};
	sh.language["js"] = {
		regex: regex,
		regexList: regexList
	};
}(highlightJavascript));