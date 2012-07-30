var $h = (function() {
	var helper = function(data) {
		return new helper.fn.init(data);
	};
	helper.fn = helper.prototype = {
		init: function(data) {
			this.value = data;
			return this;
		},
		is: function(type) {
			if (typeOf(this.value) === type) {
				return true;
			}
			return false;
		},
		inArray: function(array) {
			return array.indexOf(this.value) > -1;
		},
		equals: function(object1, object2) {
			var attr, data;
			for (attr in object1) {
				if (typeof(object2[attr]) === 'undefined') {
					return false;
				}
			}

			for (attr in object1) {
				if (object1[attr]) {
					data = typeof(object1[attr]);
					if (data === object) {
						if (!$h(object1[attr]).equals(object2[attr])) {
							return false;
						}
					} else if (data === "function") {
						if (typeof(object2[attr]) === 'undefined' || (attr !== 'equals' && object1[attr].toString() !== object2[attr].toString())) {
							return false;
						}
					} else {
						if (object1[attr] !== object2[attr]) {
							return false;
						}
					}
				} else {
					if (object2[attr]) {
						return false;
					}
				}
			}

			for (attr in object2) {
				if (typeof(object1[attr]) === 'undefined') {
					return false;
				}
			}

			return true;
		},
		matches: function(list) {
			var value = this.value;
			var found = false;
			list.forEach(function(type, index) {
				if ($h(value).is(array)) {
					if ($h(type).is(array)) {
						type.forEach(function(type, index) {
							console.log(typeOf(value[0]), type, $h(value[0]).is(type))
							if ($h(value[0]).is(type)) {
								found = true;
							}
						});
					}
				} else if ($h(value).is(type)) {
					found = true;
				}
			});
			return found;
		},
		match: function(defaults) {
			var errorShort = function(value, proper, name) {
				var list = proper.properValues || proper;
				name = name || proper.name;
				highlightJavascript.error.add("-ERROR- value "+JSON.stringify(value)+" (" + typeOf(value) + "), is not an acceptable value for property "+name+". Must be one of: "+JSON.stringify(list));
			};
			if (this.value === undefined) {
				return defaults.defaultValue;
			}
			var value = this.value;
			if ($h(value).is(array)) {
				var properList = defaults.properValues[defaults.properValues.length - 1];
				if ($h(properList).is(array)) {
					var finalList = [];
					var found = false;
					value.forEach(function(thisValue) {
						var internalFound = false;
						properList.forEach(function(type) {
							if ($h(thisValue).is(type)) {
								found = internalFound = true;
								finalList.push(thisValue);
							}
						});
						if (!internalFound) {
							errorShort(thisValue,properList,defaults.name);
						}
					});
					if (found) {
						return finalList;
					}
				}
			} else {
				if ($h(typeOf(value)).inArray(defaults.properValues)) {
					return value;
				}
			}
			errorShort(value,defaults);
			return defaults.defaultValue;
		}
	};
	helper.fn.init.prototype = helper.fn;
	return helper;
})();