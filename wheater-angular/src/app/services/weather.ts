import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private http = inject(HttpClient);

  getLocationWeather(location: string){
    return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`);
  }

  getWeatherData(lat:number, lon: number){
    return this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,apparent_temperature,relative_humidity_2m&forecast_days=1`);
  }

}
