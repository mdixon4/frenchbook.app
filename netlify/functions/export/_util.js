
// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
export function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}
export function fromBinary(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
export const toUrlHash = (utf8String) => {
  return btoa(toBinary(utf8String))
}
export const fromUrlHash = (base64String) => {
  return fromBinary(atob(base64String))
}

