set jar=C:\jsdoc-toolkit\jsrun.jar
set appRun=C:\jsdoc-toolkit\app\run.js
set template=C:\jsdoc-toolkit\templates\codeview
set output=C:\Users\ArkahnX\Documents\GitHub\highlightJavascript\docs\
set file=C:\Users\ArkahnX\Documents\GitHub\highlightJavascript\source\
java -jar %jar% %appRun% %file% -t=%template% -d=%output% -a -p -r=4 -n
