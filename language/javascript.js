(function(sh) {
	var nativeVar = ["__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$_", "$input", "Array", "Boolean", "ChartoUTF8", "Date", "E", "Function", "JSON", "LN10", "LN2", "LOG10E", "LOG2E", "Math", "Number", "Object", "PI", "RegExp", "SQRT1_2", "SQRT2", "String", "UTC", "abs", "acos", "alert", "anchor", "apply", "asin", "atan", "atan2", "big", "bind", "blink", "bold", "call", "ceil", "charAt", "charCodeAt", "clear","concat", "cos", "create", "defineProperties", "defineProperty", "document", "every", "exec", "exp", "filter", "fixed", "floor", "fontcolor", "fontsize", "forEach", "freeze", "getDate", "getDay", "getFullYear", "getHours", "getItem","getMilliseconds", "getMinutes", "getMonth", "getOwnPropertyDescriptor", "getOwnPropertyNames", "getPrototypeOf", "getSeconds", "getTime", "getTimezoneOffset", "getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds", "getYear", "hasOwnProperty", "indexOf", "is", "isArray", "isExtensible", "isFrozen", "isPrototypeOf", "isSealed", "italics", "join", "lastIndexOf", "link", "localeCompare", "localStorage", "log", "map", "match", "max", "min", "now", "parse", "pop", "pow", "preventExtensions", "propertyIsEnumerable", "push", "random", "reduce", "reduceRight", "replace", "reverse", "round", "seal", "search", "setDate", "setFullYear", "setHours", "setItem","setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "shift", "sin", "slice", "small", "some", "sort", "splice", "split", "sqrt", "strike", "stringify", "sub", "substr", "substring", "sup", "tan", "test", "toDateString", "toExponential", "toFixed", "toGMTDateString", "toISODateString", "toJSON", "toLocaleDateString", "toLocaleLowerCase", "toLocaleString", "toLocaleTimeString", "toLocaleUpperCase", "toLowerCase", "toPrecision", "toString", "toTimeString", "toUTCString", "toUpperCase", "trim", "trimLeft", "trimRight", "unshift", "valueOf", "window"];
	var reserved = ["function", "var", "let", "const", "void", "native"];
	var constructs = ["if", "for", "while", "with", "else", "return", "break", "new", "in", "switch", "try", "catch", "case", "typeof"];
	var lang = ["NaN", "true", "false", "undefined", "null"];
	var constant = ["arguments", "caller", "constructor", "keys", "prototype", "MAX_VALUE", "MIN_VALUE", "NEGATIVE_INFINITY", "POSITIVE_INFINITY", "multiline", "lastMatch", "lastParen", "leftContext", "length", "name", "rightContext", "input"];
	var regex = {
		"singleComment": /\/\/.+?(?=\n|\r|$)/ig,
		"multiComment": /\/\*[\s\S]+?\*\//g,
		"string": /(?:'[^'\\]*(?:\\.[^'\\]*)*')|(?:"[^"\\]*(?:\\.[^"\\]*)*")/g,
		"number": /[+-]?\b(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,
		"math": /(\||\+|\=|\-|\/|\>|\<|\!|\?|\&|\%|\$|\*|\~)/g,
		"bracket": /\{|\}|\(|\)|\[|\]/g,
		"tag": /\<(?:\!|\/)?[a-z][a-z0-1\-]\s*(?:[^>]+)?\>/ig,
		"function": /\b(?!function|if|else|for|while|with|try|catch)(?:([a-z][a-z0-9]*)(?=\s*(?:\=|:)\s*function)|([a-z][a-z0-9]*)(?=\s*\([^\)]*\)\s*\{[^\}]*\}\;?))/ig,
		"escaped": /\\(?:0[0-3][0-7][0-7]|[0-3][0-7][0-7]|[0-7][0-7]|[0-9]|.)/g
	};
	var regexList = [{
		regex: regex["function"],
		css: "function"
	}, {
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
		regex: regex.tag,
		css: "constructs"
	}, {
		regex: regex.number,
		css: "number"
	}, {
		regex: regex.math,
		css: "constructs"
	}];
	sh.language = sh.language || {};
	sh.language["javascript"] = {
		regex: regex,
		regexList: regexList
	};
}(highlightJavascript));