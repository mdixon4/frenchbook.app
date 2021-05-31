/** mermaid
 *  https://mermaidjs.github.io/
 *  (c) 2015 Knut Sveidqvist
 *  MIT license.
 */

/* lexical grammar */
%lex
%x quoted
%x musicline


%%

["]                     this.begin("quoted");
<quoted>["]             this.popState();
<quoted>[^"]*           return "QUOTED";

\s*(\>+\s*)?\|\|?\:?\(?\)?      { this.begin('musicline'); console.log('entering musicline'); return 'BARLINE' };
<musicline>\r?\n                 this.popState();
<musicline>["]                   this.begin('quoted');
<musicline>[ \t]                 /* ignore spaces */
<musicline>\)?\:?\|\|?\:?\(?\)?  return 'BARLINE';
<musicline>\.[a-z][a-z-]*        return 'CLASS';
<musicline>[\S]+                 return 'CHORD';


<*>\\(coda|segno|fermata)         return 'SPECIALTOKEN';
<*>\\.                            return 'ESCAPEDCHARACTER';
<*>\.[a-z][a-z-]*                 return 'CLASS';
<INITIAL,quoted>\\n               return 'NEWLINECHARACTER';


<INITIAL>[^\s|(\r?\n)]+                    return 'STRING';


"\""                              return 'QUOTE';
\r?\n                             return 'NEWLINE';

[ \t]                             /* IGNORE */;
// \|                                return 'PIPE';
// \:                                return 'COLON';
// \(                                return 'OPENBRACKET';
// \)                                return 'CLOSEBRACKET';

\.[a-z]+(\-[a-z]+)?            return 'CLASS';
\\\\                           return "BACKSLASH";
// [A-G](#|b)?(\w\d/)*            return "CHORD";
^\w+\:.+$                       return "METADATUM";



<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%start start

%% /* language grammar */

start
  : stanza EOF
  | EOF
  ;

stanza
  : stanzatitle stanzamusic stanzaannotations
  | stanzatitle stanzamusic
  | stanzamusic stanzaannotations
  | stanzamusic
  ;

stanzatitle
  : stanzatitle titlebit
  | titlebit
  ;

titlebit
  : STRING | CLASS
  ;


musicline
  : musicline BARLINE
  | musicline BARLINE barcontent
  | BARLINE barcontent
  ;

barcontent
  : barcontent baritem
  | baritem
  ;

baritem
  : CHORD
  | CLASS
  | QUOTED
  ;


generalText
  : generalText generalTextToken
  | generalTextToken
  ;

generalTextToken
  : specialCharacter
  | PUNCTUATION | AMP | UNICODE_TEXT | NUM| ALPHA | COLON | COMMA | PLUS | EQUALS | MULT | DOT | BRKT | UNDERSCORE ;

specialCharacter
  : NEWLINECHARACTER
  | ESCAPEDCHARACTER
  ;

optionalspaces
  : spaces
  | ""
  ;

spaces
  : spaces SPACE
  | SPACE
  ;




%%
