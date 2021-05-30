/** mermaid
 *  https://mermaidjs.github.io/
 *  (c) 2015 Knut Sveidqvist
 *  MIT license.
 */

/* lexical grammar */
%lex
%x quoted


%%
// ["]                     this.begin("quoted");
// <string>["]             this.popState();
// <string>[^"]*           return "QUOTED";

\s*\)?\:?\|\|?\:?\(?\)?\s*     return 'BARLINE';
\.[a-z]+(\-[a-z]+)?            return 'CLASS';
\\\\                           return "BACKSLASH";
// [A-G](#|b)?(\w\d/)*            return "CHORD";
^\w+\:.+$                       return "METADATUM";

[a-zA-Z]+                      return 'ALPHA';
[0-9]+                         return 'NUM';

"&"                   return 'AMP';
";"                   return 'SEMI';
","                   return 'COMMA';
"*"                   return 'MULT';
\-                    return 'HYPHEN';
"."                   return 'DOT';
[\_]                  return 'UNDERSCORE';
\+                    return 'PLUS';
\%                    return 'PCT';
"="                   return 'EQUALS';
"<"                   return 'LT';
">"                   return 'GT';
"\\"                  return 'BACKSLASH';
"\""                  return 'QUOTE';

<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%start start

%% /* language grammar */

start
  : musicline EOF
  | EOF
  ;

musicline
  : musicline BARLINE barcontent
  | BARLINE barcontent
  ;

barcontent
  : barcontent baritem
  | baritem
  ;

baritem
  : generalText
  ;

generalText
  : generalText generalTextToken
  | generalTextToken
  ;

generalTextToken
  : PUNCTUATION | AMP | UNICODE_TEXT | NUM| ALPHA | COLON | COMMA | PLUS | EQUALS | MULT | DOT | BRKT | UNDERSCORE ;



%%
