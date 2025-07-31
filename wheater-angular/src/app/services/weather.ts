import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concat, concatMap, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private http = inject(HttpClient);

  getLocationWeather(location: string): Observable<any> {
    return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`);
  }

  getWeatherData(lat:number, lon: number): Observable<any> {
    return this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,apparent_temperature,relative_humidity_2m&forecast_days=1`);
  }

  // concatMap para encadenar peticiones
  // Espera a que la primera petición se complete antes de iniciar la segunda
  // Esto es útil para evitar problemas de concurrencia y asegurar que los datos se obtienen en el orden correcto
  // En este caso, primero obtenemos las coordenadas y luego el clima usando esas coordenadas
  getWeatherForLocation(location: string): Observable<any> {
    return this.getLocationWeather(location).pipe(
      concatMap((coordinates: any) => {
        const firstResult = coordinates.results[0];
        const lat = coordinates.results[0].latitude;
        const lon = coordinates.results[0].longitude;
        return this.getWeatherData(lat, lon).pipe(
          map((weatherData: any) => ({
            // 🌍 Datos de la ubicación (primera petición)
            location: {
              name: firstResult.name,
              country: firstResult.country,
              latitude: firstResult.latitude,
              longitude: firstResult.longitude,
              population: firstResult.population || 'No disponible',
              timezone: firstResult.timezone || 'No disponible',
              admin1: firstResult.admin1 || '', // Estado/Provincia
              admin2: firstResult.admin2 || '', // Condado/Municipio
              elevation: firstResult.elevation || 'No disponible'
            },
            // 🌤️ Datos del clima (segunda petición)
            weather: weatherData
          }))
        );
      })
    );
  }

}
