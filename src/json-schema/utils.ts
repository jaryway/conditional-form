const isType =
  <T>(type: string | string[]) =>
  (obj: unknown): obj is T =>
    getType(obj) === `[object ${type}]`;
export const getType = (obj: any) => Object.prototype.toString.call(obj);
export const isFn = (val: any): val is Function => typeof val === 'function';
export const isArr = Array.isArray;
export const isPlainObj = isType<object>('Object');
export const isStr = isType<string>('String');
export const isBool = isType<boolean>('Boolean');
export const isNum = isType<number>('Number');
export const isMap = (val: any): val is Map<any, any> => val && val instanceof Map;
export const isValid = (val: any) => val !== undefined && val !== null
