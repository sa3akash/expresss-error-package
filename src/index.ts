import Layer from "express/lib/router/layer";
import Router from "express/lib/router";

/**
 * Gets the last element of an array.
 * @template T
 * @param {T[]} [arr=[]] - The array to get the last element from
 * @returns {T | undefined} The last element of the array or undefined if array is empty
 * @private
 */
const last = <T>(arr: T[] = []): T | undefined => arr[arr.length - 1];

/**
 * No-op function used as fallback for error handling.
 * @type {Function}
 * @private
 */
const noop = Function.prototype as (...args: any[]) => void;

/**
 * Copies properties from one function to another.
 * Used to preserve function properties when wrapping functions.
 * 
 * @template T
 * @param {T} oldFn - The original function
 * @param {T} newFn - The new function to copy properties to
 * @returns {T} The new function with copied properties
 * @private
 */
function copyFnProps<T extends Function>(oldFn: T, newFn: T): T {
  Object.keys(oldFn).forEach((key) => {
    (newFn as any)[key] = (oldFn as any)[key];
  });
  return newFn;
}

/**
 * Wraps an Express route handler to catch promise rejections and async errors.
 * If the handler returns a promise, any rejections are passed to Express's next() error handler.
 * This enables proper error handling in async route handlers.
 * 
 * @template T
 * @param {T} fn - The route handler function to wrap
 * @returns {T} A wrapped version of the function that catches promise rejections
 * 
 * @example
 * // Automatically catches errors in async handlers
 * app.get('/user/:id', wrap(async (req, res, next) => {
 *   const user = await User.findById(req.params.id);
 *   res.json(user);
 * }));
 * @private
 */
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

/**
 * Patches Express Router.param to automatically wrap param handlers.
 * This ensures async param handlers properly catch errors.
 * 
 * @private
 */
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

/**
 * Patches Express Layer.prototype to wrap route handlers with error catching.
 * This enables async/await route handlers to properly propagate errors to the error handler middleware.
 * When a route handler is set, it's automatically wrapped to catch promise rejections.
 */
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

/**
 * Initialize error handling patches for Express.
 * This patches the Express Router to wrap async handlers and properly catch errors.
 */
patchRouterParam();

export * from "./error";
export * from "./statusCodes";
