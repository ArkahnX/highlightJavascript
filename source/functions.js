var typeOf = function(data) {
	if (typeof data === boolean) {
		return boolean;
	}
	if (typeof data === number) {
		if (isNaN(data)) {
			return nan;
		}
		return number;
	}
	if (typeof data === string) {
		if (isJSON(data)) {
			return json;
		}
		if (isDate(data)) {
			return date;
		}
		return string;
	}
	if (typeof data === object) {
		if (Array.isArray(data)) {
			return array;
		}
		if (data === null) {
			return "null";
		}
		if (isDate(data)) {
			return date;
		}
		if (data.exec && data.test && (data.ignoreCase || data.ignoreCase === false)) {
			return regex;
		}
		if (data.nodeName) {
			return node;
		}
		return object;
	}
	return typeof data;
};
var isDate = function(str) {
	if (typeof str !== "string") {
		return false;
	}

	// format: dd.mm.yyyy or dd/mm/yyyy or dd-mm-yyyy ... for Turkish
	var s = String(str).split(/[-\/., ]/);

	var dd = parseInt(s[0]);
	var mm = parseInt(s[1]);
	var yyyy = parseInt(s[2]);

	var dateStr = mm + '/' + dd + '/' + yyyy;

	// mm-dd-yyyy yyyy/mm/dd mm/dd/yyyy mmm dd, yyyy mm dd, yyyy ... for Date().parse(..)
	var dt = new Date(dateStr);

	if (dt.getDate() == dd && dt.getMonth() + 1 == mm && dt.getFullYear() == yyyy) {
		return true;
	} else {
		return false;
	}
};
var isJSON = function(string) {
	if (string.charAt(0) === "{" && string.charAt(string.length - 1) === "}") {
		if (JSON.stringify(string)) {
			return true;
		}
	}
	return false;
};
var sanitizeOptions = function(options, defaults) {
	var sanitaryOptions = {};
	for (var attr in defaults) {
		sanitaryOptions[attr] = $h(options[attr]).match(defaults[attr]);
	}
	highlightJavascript.error.show("setup");
	return sanitaryOptions;
};
var init = function() {

};
var parse = function() {

};