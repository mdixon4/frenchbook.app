
//https://stackoverflow.com/a/60027277
//build regexes without worrying about
// - double-backslashing
// - adding whitespace for readability
// - adding in comments
let clean = (piece: string): string => (piece
  .replace(/((^|\n)(?:[^\/\\]|\/[^*\/]|\\.)*?)\s*\/\*(?:[^*]|\*[^\/])*(\*\/|)/g, '$1')
  .replace(/((^|\n)(?:[^\/\\]|\/[^\/]|\\.)*?)\s*\/\/[^\n]*/g, '$1')
  .replace(/\n\s*/g, '')
);
export const regex = (strings: TemplateStringsArray, ...interpolations: Array<string>) => (
  new RegExp(interpolations.reduce(
      (regex, insert, index) => (regex + insert + clean(strings.raw[index + 1])),
      clean(strings.raw[0])
  ))
);

// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
export function toBinary(string: string): string {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}
export function fromBinary(binary: string): string {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
export const toUrlHash = (utf8String: string): string => {
  return btoa(toBinary(utf8String))
}
export const fromUrlHash = (base64String: string): string => {
  return fromBinary(atob(base64String))
}

