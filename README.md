Usage:
======

include the following resources inside the <code>&lt;head&gt;</code> tag.

<pre>&lt;link href="highlightJavascript.css" rel="stylesheet" /&gt;
&lt;script src="highlightJavascript.min.js"&gt;&lt;/script&gt;</pre>

And just before the closing of the <code>&lt;body></code> tag.

<code>&lt;script&gt;highlightJavascript.format();&lt;/script&gt;</code>

highlightJavascript includes javascript language highlighting built right in, but you can view the language file at language/javascript.js to build your own.

Currently the only option available is <code>highlightJavascript.format("nolines");</code> which as the name implies, disables line numbering.