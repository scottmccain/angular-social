var sanitizer = require('sanitizer');

//wrapper for the html sanitizer
function wrapSanitizer(userInputString) {
	//Note:
	//sanitizer.sanitize('your dirty string'); // Strips unsafe tags and attributes from html.
	//sanitizer.escape('your dirty string'); // Escapes HTML special characters in attribute values as HTML entities
	return sanitizer.escape(sanitizer.sanitize(userInputString));
}

exports.sanitize = wrapSanitizer;