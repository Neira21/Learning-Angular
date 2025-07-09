import { Component, EventEmitter, Output } from '@angular/core';
import { ipokemon } from '../models/pokemon.interface';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-pokemonmodal',
  standalone: true,
  imports: [FormsModule, MatSelectModule],
  templateUrl: './pokemonmodal.component.html',
  styleUrl: './pokemonmodal.component.css'
})
export class PokemonmodalComponent {
  @Output() modalToggle = new EventEmitter<void>();

  @Output() agregarPokemonHijo = new EventEmitter();

  tiposArray: string[] = ['Normal', 'Fuego', 'Agua', 'Planta', 'Electrico', 'Hielo', 'Lucha', 'Veneno', 'Tierra', 'Volador', 'Psiquico', 'Bicho', 'Roca', 'Fantasma', 'Dragon', 'Siniestro', 'Acero', 'Hada'];

  tiposSeleccionados: string[] = [];

  nuevoItem:ipokemon={
    nombre:'',
    imagen:'',
    descripcion:'',
    tipos:[],
  }



  onButtonClick(): void {
    this.modalToggle.emit();
  }

  agregar() {
    if (this.nuevoItem.nombre.trim() && this.nuevoItem.descripcion.trim()) {
      console.log('Agregando item', this.nuevoItem);
      const itemCompleto = {
        ...this.nuevoItem,
        tipos: ["Normal"], // Tipo por defecto
        imagen: 'assets/defecto.webp'
      };

      this.agregarPokemonHijo.emit(itemCompleto); // Envía el objeto al padre
      this.resetFormulario();
    }
  }

  resetFormulario() {
    this.nuevoItem = { nombre: '', descripcion: '', imagen: '', tipos: []};
  }

  validarSeleccion(event: Event): void {
    console.log('Evento:', event);

  const selectElement = event.target as HTMLSelectElement;
  const opcionesSeleccionadas = Array.from(selectElement.selectedOptions).map(option => option.value);

  if (opcionesSeleccionadas.length > 2) {
    opcionesSeleccionadas.pop(); // Elimina la última selección para mantener solo 2
  }

  this.tiposSeleccionados = opcionesSeleccionadas;

  // 🔹 Imprimir en consola los tipos seleccionados
  console.log('Tipos seleccionados:', this.tiposSeleccionados);
  }

}
