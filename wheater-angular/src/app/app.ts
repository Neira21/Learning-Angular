import { Component, inject, OnInit, signal } from '@angular/core';
import { Weather } from './services/weather';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    'ngSkipHydration': 'true'
  }

})
export class App implements OnInit { // 👈 Implementar OnInit

  weatherService = inject(Weather);

  title = signal('Weather App');

  location = signal('Lima'); // ✅ Cambiar a signal

  coordinates = signal({
    lat: 0,
    lon: 0
  });

  weatherData = signal<any>(null);
  isLoading = signal(false);

  getLocationWeather() {
    this.isLoading.set(true);
    this.weatherData.set(null); // ✅ Limpiar datos anteriores

    this.weatherService.getLocationWeather(this.location()).subscribe({
      next: (data) => {
        if (data.results && data.results.length > 0) {
          this.coordinates.set({
            lat: data.results[0].latitude,
            lon: data.results[0].longitude
          });
          this.getWeatherData(this.coordinates().lat, this.coordinates().lon);
        } else {
          console.warn('⚠️ No se encontraron resultados para:', this.location());
          this.isLoading.set(false);
        }
      },
      error: (error) => {
        console.error('❌ Error obteniendo ubicación:', error);
        this.isLoading.set(false);
      }
    });
  }


  getWeatherData(lat: number, lon: number) {
    this.weatherService.getWeatherData(lat, lon).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.getLocationWeather();
  }
}
