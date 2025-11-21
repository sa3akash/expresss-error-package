import Layer from "express/lib/router/layer";
import Router from "express/lib/router";

const last = <T>(arr: T[] = []): T | undefined => arr[arr.length - 1];
const noop = Function.prototype as (...args: any[]) => void;

function copyFnProps<T extends Function>(oldFn: T, newFn: T): T {
  Object.keys(oldFn).forEach((key) => {
    (newFn as any)[key] = (oldFn as any)[key];
  });
  return newFn;
}

function wrap<T extends Function>(fn: T): T {
  const newFn = function newFn(this: any, ...args: any[]) {
    const ret = fn.apply(this, args);
    const next = (args.length === 5 ? args[2] : last(args)) || noop;
    if (ret && ret.catch) ret.catch((err: any) => next(err));
    return ret;
  };
  Object.defineProperty(newFn, "length", {
    value: fn.length,
    writable: false,
  });
  return copyFnProps(fn, newFn as unknown as T);
}

function patchRouterParam() {
  const originalParam = Router.prototype.constructor.param;
  Router.prototype.constructor.param = function param(
    name: string,
    fn: Function
  ) {
    fn = wrap(fn);
    return originalParam.call(this, name, fn);
  };
}

Object.defineProperty(Layer.prototype, "handle", {
  enumerable: true,
  get() {
    return (this as any).__handle;
  },
  set(fn: Function) {
    fn = wrap(fn);
    (this as any).__handle = fn;
  },
});

patchRouterParam();

export * from "./error";
export * from "./statusCodes";
