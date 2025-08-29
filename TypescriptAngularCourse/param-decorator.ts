function registrarYModificarArgumentos(
  method: Function,
  context: ClassMethodDecoratorContext
) {
  return function (...args: any[]) {
    const modifiedArgs = args.map((arg) => {
      return typeof arg === "string" ? arg.toUpperCase() : arg;
    });

    console.log(
      `Method ${String(context.name)} called with modified args:`,
      modifiedArgs
    );
    return method.apply(this, modifiedArgs);
  };
}

class Saludo {
  @registrarYModificarArgumentos
  saludar(parametro: string) {
    console.log(`Hola ${parametro}`);
  }
}

const saludo = new Saludo();
saludo.saludar("juan");
