export function formatSearch(se: string) {
  se = decodeURIComponent(se);
  se = se.substr(1);
  let arr = se.split('&'),
    obj: Record<string, string> = {},
    newarr = [];
  arr.forEach(function (v, i) {
    newarr = v.split('=');
    if (typeof obj[newarr[0]] === 'undefined') {
      obj[newarr[0]] = newarr[1];
    }
  });
  return obj;
}
