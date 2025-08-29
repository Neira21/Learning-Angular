function Component(config: { selector: string; template: string }) {
  return function (target: any) {
    target.prototype.selector = config.selector;
    target.prototype.template = config.template;
  };
}

@Component({
  selector: "my-component",
  template: `<h1>{{ titulo }}</h1>`,
})
class MyComponent {
  selector!: string;
  template!: string;

  titulo: string = "Soy un componente";
}
