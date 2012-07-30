const array = "array";
const string = "string";
const object = "object";
const number = "number";
const node = "node";
const boolean = "boolean";
const nan = "NaN";
const regex = "regex";
const date = "date";
const json = "json";
var document = window.document;
var defaultSetup = {
	"readFrom": {
		"name":"readFrom",
		"defaultValue":"",
		"properValues":[string,node]
	},
	"sendTo": {
		"name":"sendTo",
		"defaultValue":"",
		"properValues":[string,node,[string,node]]
	},
	"replaceOrigin": {
		"name":"replaceOrigin",
		"defaultValue":true,
		"properValues":[boolean]
	},
	"content": {
		"name":"content",
		"defaultValue":"",
		"properValues":[string]
	},
	"attribute": {
		"name":"attribute",
		"defaultValue":"value",
		"properValues":[string]
	},
};
highlightJavascript = function(options) {
	var read, write, content;
	var options = sanitizeOptions(options || {}, defaultSetup);
	if($h(options.readFrom).is(string)) {
		read = document.querySelector(options.readFrom);
		if(options.attribute) {
			read = read[attribute];
		}
	}
	return options;
};