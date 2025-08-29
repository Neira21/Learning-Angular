function mayus(_target: any, context: ClassAccessorDecoratorContext) {
  return {
    get(this: any) {
      return this[`_${String(context.name)}`].toUpperCase();
    },
    set(this: any, value: string) {
      this[`_${String(context.name)}`] = value.toUpperCase();
    },
  };
}

class Person {
  @mayus
  accessor name: string;
  constructor(name: string) {
    this.name = name;
  }
}
