import { Component, inject, OnInit, signal } from '@angular/core';
import { Weather } from './services/weather';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, startWith, finalize } from 'rxjs';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet
    CommonModule,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  weatherService = inject(Weather);

  title = signal('🌤️ Aplicación del Clima');
  location = signal('Lima');
  isLoading = signal(false);

  // ✅ Observable para el template
  weatherData$!: Observable<any>;

  ngOnInit(): void {
    // ✅ Cargar datos iniciales
    this.loadWeatherData();
  }

  loadWeatherData(): void {
    this.isLoading.set(true);
    this.weatherData$ = this.weatherService.getWeatherForLocation(this.location()).pipe(
      finalize(() => this.isLoading.set(false))
    )
  }


  // ✅ Método para el async pipe en el template



}
