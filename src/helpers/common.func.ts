export function pullNumFormStr(str: string) {
  const res = str.match(/\d+\.\d+|\d+/g);

  if (!res || res.length < 1) {
    throw new Error('Invalid param');
  }

  return res[0];
}

export function wait<T>(delay: number, cb: () => T) {
  return new Promise<T>(resolve => setTimeout(() => resolve(cb()), delay));
}

export function compareObjectProperties(baseObj: any, targetObj: any): boolean {
  return Object.keys(baseObj).every(key => (
    key in targetObj && typeof targetObj[key] === typeof baseObj[key]
  ));
}

export function filterParams(
  params: { [key: string]: string },
): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
