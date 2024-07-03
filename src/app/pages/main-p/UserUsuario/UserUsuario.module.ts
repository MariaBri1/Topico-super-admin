import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserUsuarioPageRoutingModule } from './UserUsuario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserUsuarioPage } from './UserUsuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserUsuarioPageRoutingModule,
    SharedModule
  ],
  declarations: [UserUsuarioPage]
})
export class UserUsuarioPageModule {}
