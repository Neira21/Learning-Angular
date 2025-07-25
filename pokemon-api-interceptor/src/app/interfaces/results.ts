export interface ipokemon {
  name: string;
  url: string;
}

export interface iresponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ipokemon[];
}
