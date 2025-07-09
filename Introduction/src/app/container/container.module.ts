import { NgModule } from '@angular/core';
import { ContainerComponent } from './container.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NotificacionModule } from '../notificacion/notificacion.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ContainerComponent, MenuComponent, HeaderComponent],
  imports: [NotificacionModule, FormsModule, CommonModule],
  exports: [ContainerComponent]
})
export class ContainerModule { }
