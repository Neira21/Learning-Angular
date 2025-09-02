import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-component',
  standalone: true,
  template: `<div>hola</div>`,
})
export class ErrorComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Simulated error');
  }
}
