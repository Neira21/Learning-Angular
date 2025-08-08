export interface PokeList{
  count: number;
  next: string;
  previous: string;
  results: PokeListResult[];
}


export interface PokeListResult {
  name: string;
  url: string;
}


export interface Pokemon{
  types: { type: { name: string }; }[];
  sprites: {front_default: string};
}
