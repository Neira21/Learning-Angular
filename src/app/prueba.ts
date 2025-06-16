
interface Observable {
  attach(o: Observer): void;
  detach(o: Observer): void;
  notify(): void;
}

interface Observer{
  update(): void;

}



export function prueba () {


}
