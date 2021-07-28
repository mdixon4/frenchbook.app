/** mermaid
 *  https://mermaidjs.github.io/
 *  (c) 2015 Knut Sveidqvist
 *  MIT license.
 */

/* lexical grammar */
%lex
%options flex
%x quoted
%x musicline
%x keyValue


%%

[^\n]+                     return 'ANYTHING';
\r?\n                      return 'NEWLINE';
<<EOF>>                    return 'EOF';
$                        return 'OTHEREOF';
// a+                          return 'AS';

// ^\w+\:                        { this.begin('keyValue'); }
// <keyValue>\r?\n               { this.popState(); }
// <keyValue>[^(\r?\n)]+         { return 'KEYVALUE'; }


// ["]                     this.begin("quoted");
// <quoted>["]             this.popState();
// <quoted>[^"]*           return "QUOTED";

// \s*(\>+\s*)?\|\|?\:?\(?\)?      { this.begin('musicline'); console.log('entering musicline'); return 'BARLINE' };
// <musicline>\r?\n                 this.popState();
// <musicline>["]                   this.begin('quoted');
// <musicline>[ \t]                 /* ignore spaces */
// <musicline>\)?\:?\|\|?\:?\(?\)?  return 'BARLINE';
// <musicline>\.[a-z][a-z-]*        return 'CLASS';
// <musicline>[\S]+                 return 'CHORD';


// <*>\\(coda|segno|fermata)         return 'SPECIALTOKEN';
// <*>\\.                            return 'ESCAPEDCHARACTER';
// <*>\.[a-z][a-z-]*                 return 'CLASS';
// <INITIAL,quoted>\\n               return 'NEWLINECHARACTER';


// // <INITIAL>[^\s|(\r?\n)]+                    return 'STRING';

// "\""                              return 'QUOTE';

// [ \t]                             /* IGNORE */;
// // \|                                return 'PIPE';
// // \:                                return 'COLON';
// // \(                                return 'OPENBRACKET';
// // \)                                return 'CLOSEBRACKET';

// \.[a-z]+(\-[a-z]+)?            return 'CLASS';
// \\\\                           return "BACKSLASH";
// // [A-G](#|b)?(\w\d/)*            return "CHORD";
// ^\w+\:.+$                       return "METADATUM";



// <<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%start start

%% /* language grammar */

start
  : song eof { return $$ }
  | song eols eof
  | eols eof
  | eof
  ;

song
  : songparts
  ;

songparts
  : songparts NEWLINE NEWLINE songpart
  | songpart
  ;

songpart
  : stanza
  | textblock
  | hr
  ;

hr
  : "h"
  ;

textblock
  : "t"
  ;

stanza
  : songlines
  ;

songlines
  : songlines NEWLINE songline
  | songline
  ;


songline
  : ANYTHING { $$ = '~~' + $1 + '~~' }
  ;

eols
  : multiNewline
  | NEWLINE { $$ = '@' }
  ;
  // eols NEWLINE { $$ = $1 + $2 }
  // | NEWLINE //{ return '[EOLb]'; }
  // ;

newlines
  : newlines NEWLINE
  | NEWLINE
  ;

multiNewline
  : multiNewline NEWLINE { $$ = $1 + '@'}
  | NEWLINE NEWLINE { $$ = '@@'}
  ;

eof
  : EOF
  | OTHEREOF
  ;

%%
