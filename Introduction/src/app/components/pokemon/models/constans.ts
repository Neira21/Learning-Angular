import { ipokemon } from './pokemon.interface';

//coloca la descripción de los pokemones en español

export const POKEMONS: ipokemon[] = [
  {
    nombre: 'Bulbasaur',
    imagen: 'assets/bulbasaur.png',
    descripcion:
      'Bulbasaur puede sobrevivir simplemente absorbiendo la luz del sol, y es por eso que siempre está buscando un lugar soleado. La planta en su espalda absorbe la energía solar y la convierte en nutrición.',
    tipos: ['Grass', 'Poison'],
  },
  {
    nombre: 'Charmander',
    imagen: 'assets/charmander.png',
    descripcion:
      'La llama en la punta de la cola de Charmander indica su estado de salud y emociones. Si está feliz y saludable, la llama arderá con un color azul claro.',
    tipos: ['Fire'],
  },
  {
    nombre: 'Squirtle',
    imagen: 'assets/squirtle.png',
    descripcion:
      'Squirtle es un Pokémon de tipo agua. Es pequeño y tiene una cola en forma de hélice. Su caparazón es de color marrón y su piel es azul.',
    tipos: ['Water'],
  },
  {
    nombre: 'Pikachu',
    imagen: 'assets/pikachu.png',
    descripcion:
      'Pikachu es un Pokémon de tipo eléctrico. Es amarillo con manchas marrones en la espalda. Tiene orejas puntiagudas y una cola en forma de rayo.',

    tipos: ['Electric'],
  },
  {
    nombre: 'Jigglypuff',
    imagen: 'assets/jigglypuff.png',
    descripcion:
      'Jigglypuff es un Pokémon de tipo normal/hada. Es redondo y rosado, con orejas pequeñas y ojos grandes. Tiene una voz dulce y canta para dormir a sus enemigos.',
    tipos: ['Normal', 'Fairy'],
  },
];
