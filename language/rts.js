(function(sh) {
	var nativeVar = ["__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$_", "$input", "Array", "Boolean", "ChartoUTF8", "Date", "E", "Function", "JSON", "LN10", "LN2", "LOG10E", "LOG2E", "Math", "Number", "Object", "PI", "RegExp", "SQRT1_2", "SQRT2", "String", "UTC", "abs", "acos", "anchor", "apply", "asin", "atan", "atan2", "big", "bind", "blink", "bold", "call", "ceil", "charAt", "charCodeAt", "concat", "cos", "create", "defineProperties", "defineProperty", "document", "every", "exp", "filter", "fixed", "floor", "fontcolor", "fontsize", "forEach", "freeze", "getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getOwnPropertyDescriptor", "getOwnPropertyNames", "getPrototypeOf", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "hasOwnProperty", "indexOf", "is", "isExtensible", "isFrozen", "isPrototypeOf", "isSealed", "italics", "join", "lastIndexOf", "link", "localeCompare", "log", "map", "match", "max", "min", "now", "parse", "pop", "pow", "preventExtensions", "propertyIsEnumerable", "push", "random", "reduce", "reduceRight", "replace", "reverse", "round", "seal", "search", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "shift", "sin", "slice", "small", "some", "sort", "splice", "split", "sqrt", "strike", "stringify", "sub", "substr", "substring", "sup", "tan", "toDateString", "toExponential", "toFixed", "toGMTDateString", "toISODateString", "toJSON", "toLocaleDateString", "toLocaleLowerCase", "toLocaleString", "toLocaleTimeString", "toLocaleUpperCase", "toLowerCase", "toPrecision", "toString", "toTimeString", "toUTCString", "toUpperCase", "trim", "trimLeft", "trimRight", "unshift", "valueOf", "window"];
	var reserved = ["function", "var", "let", "const", "void", "native"];
	var constructs = ["if", "for", "while", "with", "else", "return", "break", "new", "in", "switch", "try", "catch", "case"];
	var lang = ["NaN", "true", "false", "undefined", "null"];
	var constant = ["arguments", "caller", "constructor", "keys", "prototype", "MAX_VALUE", "MIN_VALUE", "NEGATIVE_INFINITY", "POSITIVE_INFINITY", "multiline", "lastMatch", "lastParen", "leftContext", "length", "name", "rightContext", "input"];
	var regex = {
		"string": /(?:'[^'\\]*(?:\\.[^'\\]*)*')|(?:"[^"\\]*(?:\\.[^"\\]*)*")/g,
		"number": /[+-]?\b(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
		"variable": /(?:[a-z]+[a-z0-9]*)/g,
		"parameter": /(?:[a-z]+[a-z0-9]*)(?=\]|\,|\>)/ig,
		"bracket": /\{|\}|\(|\)|\[|\]/g,
		"focusSelector": /\/+[a-z]*[a-z0-1]*/ig,
		"function": /\b(?!function|if|else|for|while|with|try)(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,
		"escaped": /\\(?:0[0-3][0-7][0-7]|[0-3][0-7][0-7]|[0-7][0-7]|[0-9]|.)/g,
		"endLine": /(?:;|{(?![a-z]*\-)|}(?!~)|\[|\]|\(|\)|\,|\.|\<|\>)/ig
	};
	var regexList = [{
		regex: new RegExp(sh.getKeywords(nativeVar), 'gm'),
		css: "native"
	}, {
		regex: new RegExp(sh.getKeywords(reserved), 'gm'),
		css: "reserved"
	}, {
		regex: new RegExp(sh.getKeywords(constructs), 'gm'),
		css: "constructs"
	}, {
		regex: new RegExp(sh.getKeywords(lang), 'gm'),
		css: "language"
	}, {
		regex: new RegExp(sh.getKeywords(constant), 'gm'),
		css: "constant"
	}, {
		regex: regex.focusSelector,
		css: "constructs"
	}, {
		regex: regex.number,
		css: "number"
	}, {
		regex: regex.parameter,
		css: "constant"
	}, {
		regex: regex.variable,
		css: "function"
	}, {
		regex: regex.endLine,
		css: "reserved"
	},{
		regex: regex["function"],
		css: "function"
	}];
	sh.language = sh.language || {};
	sh.language["rts"] = {
		regex: regex,
		regexList: regexList
	};
}(highlightJavascript));