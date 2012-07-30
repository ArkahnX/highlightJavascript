highlightJavascript.error = (function() {
	var prepend = "highlightJavascript: ";
	var unread = [];
	var read = [];
	return {
		"add": function(msg) {
			unread.push(msg);
		},
		"show": function(phase) {
			if (unread.length < 1) {
				return console.log(prepend + "No Errors.")
			} else {
				var phase = " for " + phase + " phase" || "";
				console.log(prepend + unread.length + " errors collected" + phase + ". Displaying:")
				unread.forEach(function(item, index) {
					read.push(item);
					unread = unread.splice(0, index);
					console.error(prepend + item);
				});
				unread = [];
			}
		}
	};
}());