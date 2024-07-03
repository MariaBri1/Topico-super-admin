import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDoctorPage } from '../UserDoctor/UserDoctor.page';

const routes: Routes = [
  {
    path: '',
    component: UserDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDoctorPageRoutingModule {}
