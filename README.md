Usage:
======

include the following resources inside the <head> tag.

<link href="highlightJavascript.css" rel="stylesheet" />
<script src="highlightJavascript.min.js"></script>

And just before the closing of the <body> tag.

<script>highlightJavascript.format();</script>

highlightJavascript includes javascript language highlighting built right in, but you can view the language file at language/javascript.js to build your own.

Currently the only option available is highlightJavascript.format("nolines"); which as the name implies, disables line numbering.