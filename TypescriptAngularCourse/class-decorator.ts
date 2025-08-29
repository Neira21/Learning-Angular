// decorador: agregar funcionalidad estra a algo que no lo tiene

// Add a property to a class

function gentlemanApprove<T extends { new (...args: any[]): {} }>(
  constructor: T,
  _context: ClassDecoratorContext
): T {
  return class extends constructor {
    gentleman = "Yes";
  };
}

@gentlemanApprove
class MyClass {
  constructor() {}
}

const instance = new MyClass();
console.log((instance as any).gentleman); // "Yes"
