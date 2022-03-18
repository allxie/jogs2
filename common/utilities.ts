import P from "@root/components/P";

declare const window: any;

const hasOwn = {}.hasOwnProperty;

export function isFibonacci(num: number):boolean {
  let fib1 = 1;
  let fib2 = 1;
  while(fib2 < num) {
    const tempFib = fib2;
    fib2 = fib1 + fib2;
    fib1 = tempFib;
  }

  return fib2 === num
}

export function classNames(...args: any[]): string {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}
