import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserUsuarioPage } from '../UserUsuario/UserUsuario.page';

const routes: Routes = [
  {
    path: '',
    component: UserUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserUsuarioPageRoutingModule {}
