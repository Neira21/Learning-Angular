import { Component, Input } from '@angular/core';
import { Character } from '@app/types/character';

@Component({
  selector: 'app-service-element',
  templateUrl: './serviceElement.html',
  styleUrls: ['./serviceElement.css'],
})
export class ServiceElement {
  @Input() character!: Character;
}
