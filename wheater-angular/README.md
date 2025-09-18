# Pokedex

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

# Example observables with RJSX nested (anidados)

```typescript

//Clima varios lugares
// En el servicio
import { Injectable, inject } from '@angular/core';

  private http = inject(HttpClient);

  getLocationWeather(location: string): Observable<any> {
    return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`);
  }

  getWeatherData(lat:number, lon: number): Observable<any> {
    return this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,apparent_temperature,relative_humidity_2m&forecast_days=1`);
  }


  // En el .ts

  getWeatherForMultipleLocations(location: string): void {
  this.getLocationWeather(location)
    .pipe(
      map(response => response.results), // 👈 Extraemos el array de ciudades
      switchMap((cities: any[]) =>
        from(cities).pipe(
          concatMap(city =>
            this.getWeatherData(city.latitude, city.longitude).pipe(
              map(weatherData => ({
                location: {
                  name: city.name,
                  country: city.country,
                  latitude: city.latitude,
                  longitude: city.longitude,
                  population: city.population || 'No disponible',
                  timezone: city.timezone || 'No disponible',
                  admin1: city.admin1 || '',
                  admin2: city.admin2 || '',
                  elevation: city.elevation || 'No disponible'
                },
                weather: weatherData
              }))
            )
          ),
          toArray() // 👈 Junta todos los resultados en un array
        )
      )
    )
    .subscribe(locationsWithWeather => {
      console.log('Todas las ubicaciones con su clima:', locationsWithWeather);
    });
}

```

```typescript
// Example pokemon
// Return a array of Pokémon with their details using RxJS operators
// map: recorre los datos del observable y devuelve un nuevo observable
// switchMap: cambia el observable a otro observable usando el resultado del observable anterior
// concatMap: aplana los observables anidados en un solo observable

getPokemonOther(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=20')
      .pipe(
        map(res => res.results),
        switchMap((pokemons: any[]) =>
          from(pokemons).pipe(
            concatMap((pokemon) => this.http.get(pokemon.url)),
            toArray() // 👈 importante: junta todos en un solo array, en orden
          )
        )
      )
      .subscribe((pokemonDetails) => {
        console.log('Detalles de los Pokémon en una lista:', pokemonDetails);
      });
  }


// añadiendo algun atributo extra a los pokemons

getPokemonWithFavorite(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=3')
    .pipe(
      map((response) =>
        response.results.map((pokemon: any) => ({
          ...pokemon,
          favorite: Math.random() > 0.5,
        }))
      ),
      switchMap((pokemonsWithFavorite: any[]) =>
        from(pokemonsWithFavorite).pipe(
          concatMap((pokemon) =>
            this.http.get(pokemon.url).pipe(
              map((detail) => ({
                ...detail,
                favorite: pokemon.favorite,
              }))
            )
          ),
          toArray() // junta todos los resultados en un array cuando terminen
        )
      )
    )
    .subscribe(pokemonDetails => {
      console.log('Pokémons con detalle + favorito:', pokemonDetails);
    });
  }



// Más óptimo, usando forkJoin para paralelizar las peticiones
getPokemonWithData() {
    return this.http
      .get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')
      .pipe(
        switchMap((response) => {
          const details = response.results.map((pokemon) =>
            this.http.get<PokemonData>(pokemon.url).pipe(
              map((detail) => ({
                id: detail.id,
                name: detail.name,
                types: detail.types,
                image: detail.sprites.front_default,
                height: detail.height,
                weight: detail.weight,
                abilities: detail.abilities,
                stats: detail.stats,
              }))
            )
          );
          return forkJoin(details);
        })
      );
  }



```
