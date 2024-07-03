import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPPage } from './main-p.page';

const routes: Routes = [
  {
    path: '',
    component: MainPPage,
    children: [

  {
    path: 'UserUsuario',loadChildren: () => import('./UserUsuario/UserUsuario.module').then( m => m.UserUsuarioPageModule)
  },
  {
    path: 'UserDoctor',loadChildren: () => import('./UserDoctor/UserDoctor.module').then( m => m.UserDoctorPageModule)
  },
  {
    path: 'reportes',loadChildren: () => import('./reportes/reportes.module').then( m => m.ReportesPageModule)
  },


  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPPageRoutingModule {}
