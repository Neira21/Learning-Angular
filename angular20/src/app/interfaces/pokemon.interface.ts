// Interfaz para la respuesta de la lista de Pokémon
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}

// Interfaz para Pokémon básico (en la lista)
export interface PokemonBasic {
  name: string;
  url: string;
}

// Interfaz para el detalle completo de un Pokémon
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

// Interfaz para los sprites (imágenes)
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

// Interfaz para los tipos
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Interfaz para las habilidades
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// Interfaz para las estadísticas
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
