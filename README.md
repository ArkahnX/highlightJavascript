Usage:
======

include the following resources inside the <code>&lt;head&gt;</code> tag.

<code>&lt;link href="highlightJavascript.css" rel="stylesheet" /&gt;
&lt;script src="highlightJavascript.min.js"&gt;&lt;/script&gt;</code>

And just before the closing of the <code>&lt;body&gt;</code> tag.

<code>&lt;script&gt;highlightJavascript.format();&lt;/script&gt;</code>

highlight code with <code>&lt;pre&gt;&lt;code class="js"&gt;&lt;script&gt;...&lt;/script&gt;&lt;/code&gt;&lt;/pre&gt;</code> or <code>&lt;pre&gt;&lt;code class="js"&gt;&lt;!--...--&gt;&lt;/code&gt;&lt;/pre&gt;</code>

highlightJavascript includes javascript language highlighting built right in, but you can view the language file at language/javascript.js to build your own.

Currently the only option available is <code>highlightJavascript.format("nolines");</code> which as the name implies, disables line numbering.



Special RegExp values:
======================

highlightJavascript looks for certain RegExp when parsing code such as comments, strings and regexp, as these need a higher priority than other regex.

Unless otherwise specified, the following will resort to javascript syntax when not otherwise defined.

"escaped" is used to detect escaped characters in strings and regular expressions. (optional, will not style if undefined) JavaScript example: <code>/\\(?:0[0-3][0-7][0-7]|[0-3][0-7][0-7]|[0-7][0-7]|[0-9]|.)/g</code>

"string" is used to detect single and multiline strings. defaults to: <code>/(?:'[^'\\]*(?:\\.[^'\\]*)*')|(?:"[^"\\]*(?:\\.[^"\\]*)*")/g</code>

"singleComment" is used to detect single line comments. Called before regex. defaults to: <code>/\/\/.+?(?=\n|\r|$)/ig</code>

"multiComment" is used to detect multiline comments. Called after regex. defaults to: <code>/\/\*[\s\S]+?\*\//g</code>

RegExp is run in two parts. The first detects regex without a string, the second detects the remaining regex. This prevents some interesting errors like <code>/^\s+|\s+$/g, '').replace(/\s+/g</code> being styled.

"regex1" defaults to: <code>/\/(?![\*])(?:[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,\<\.\>\/\?a-z0-9])+\/[gim]*(?=\,|\;|\]|\)|\}|\n|\r|\n\r|$)(?![a-z0-9\040])/gi</code>

"regex2" defaults to: <code>/\/(?![\*])(?:\040*[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,\<\.\>\/\?a-z0-9])+\/[gim]*(?=\,|\;|\]|\)|\}|\n|\r|\n\r)(?![a-z0-9\040])/gi</code>

"link" is used to detect html links: <code>&lt;a href="" &gt;link&lt;/a&gt;</code>. defaults to: <code>/\&lt;a\b href\=\"[htpfs]+\:\/\/[^"]+\"[^&gt;]*\&gt;(?:.*?)\&lt;\/a\&gt;/g</code>

"url" is used to convert url's to html links. defaults to: <code>/(?:http|ftp|https):\/\/[\w\-_]+(?:\.[\w\-_]+)+(?:[\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/g</code>

All other syntax is defined from highest to lowest priority in a language file and will run after links, comments, regex, strings, and escaped characters.

Known Limitations:
==================

1. in rare instances the space character in a regular expression, or two regular expressions on the same line will cause parsing issues.

2. Compressed code does not format well, as regular expression parsing works best when there are line breaks often. Another syntax highlighter may suit your needs better if you plan on displaying compressed code.