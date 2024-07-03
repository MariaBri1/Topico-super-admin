import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDoctorPage } from './UserDoctor.page';
import { UserDoctorPageRoutingModule } from './UserDoctor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDoctorPageRoutingModule,
    SharedModule
  ],
  declarations: [UserDoctorPage]
})
export class UserDoctorPageModule {}
