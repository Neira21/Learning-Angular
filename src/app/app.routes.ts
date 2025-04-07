import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import {ContainerComponent} from './container/container.component';
import { TodostandaloneComponent } from './components/todostandalone/todostandalone.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ContainerModule } from './container/container.module';
import { FormangularComponent } from './components/formangular/formangular.component';

export const routes: Routes = [

  {path: '', component:ContainerComponent  },

  {path: 'todo', component: TodoComponent },

  {path: 'pokemon', component: PokemonComponent},

  {path: 'todostandalone', component: TodostandaloneComponent},

  {path: 'store', component: HomePageComponent},

  {path: 'form', component: FormangularComponent}
];
