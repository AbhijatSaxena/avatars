export function encodeUnicode(value: string) {
  // @see https://www.base64encoder.io/javascript/
  let utf8Bytes = encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode(parseInt(`0x${p1}`));
  });

  return btoa(utf8Bytes);
}
