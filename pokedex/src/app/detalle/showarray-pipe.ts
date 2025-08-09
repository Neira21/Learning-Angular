import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showarray',

})
export class ShowarrayPipe implements PipeTransform {

  transform(moveName: string, moves: any[], currentIndex: number): string {
    // Capitalizar el nombre del move


    // Si no es el último, agregar coma
    if (currentIndex < moves.length - 1) {
      return moveName + ', ';
    }

    // si es el ultimo agregar punto
    if (currentIndex === moves.length - 1) {
      return moveName + '.';
    }

    return moveName;
  }


  // transform(moves: any[]): string {
  //   console.log('Moves in ShowarrayPipe:', moves);
  //   if (!moves || moves.length === 0) {
  //     return 'No moves available';
  //   }
  //   const moveNames = moves.map(move => move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1));
  //   const result = moveNames.join(', ');

  //   console.log('Transformed moves:', result);
  //   return result;
  // }

}
