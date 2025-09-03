import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterService } from '@app/services/character.service';
import { CharacterExample } from '@app/types/character';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.html',
  styleUrl: './character.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Character {
  characterService = inject(CharacterService);
  characters: Signal<CharacterExample[] | undefined> = computed(() =>
    this.characterService.getFormattedCharacters()
  );
}
