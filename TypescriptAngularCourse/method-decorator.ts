type methodDecoratorStructure = (
  method: Function,
  context: ClassMethodDecoratorContext
) => PropertyDescriptor | void;

function logMethod(method: Function, context: ClassMethodDecoratorContext) {
  return function (...args: any[]) {
    console.log(`Method ${String(context.name)} called with args:`, args);
    const result = method.apply(this, args);
    console.log(`Method ${String(context.name)} returned:`, result);
    return result;
  };
}

class Calculadora {
  @logMethod
  sum(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculadora();
calc.sum(2, 3);
// Method sum called with args: [2, 3]
// Method sum returned: 5
