Usage:
======

include the following resources inside the <pre><head></pre> tag.

<code><link href="highlightJavascript.css" rel="stylesheet" />
<script src="highlightJavascript.min.js"></script></code>

And just before the closing of the <pre><body></pre> tag.

<code><script>highlightJavascript.format();</script></code>

highlightJavascript includes javascript language highlighting built right in, but you can view the language file at language/javascript.js to build your own.

Currently the only option available is <code>highlightJavascript.format("nolines");</code> which as the name implies, disables line numbering.