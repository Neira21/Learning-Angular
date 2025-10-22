import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Selector } from '../selector/selector';

@Component({
  selector: 'app-emoji-selector',
  imports: [MatFormFieldModule, MatInputModule, Selector],
  templateUrl: './emoji-selector.html',
  styleUrl: './emoji-selector.css',
})
export class EmojiSelector {}
