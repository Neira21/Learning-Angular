import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { Formmaterial } from './formmaterial/formmaterial';
import { Form } from './form/form';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


}
