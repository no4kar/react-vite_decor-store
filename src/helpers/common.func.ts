export function pullNumFormStr(str: string) {
  const res = str.match(/\d+\.\d+|\d+/g);

  if (!res || res.length < 1) {
    throw new Error('Invalid param');
  }

  return res[0];
}
