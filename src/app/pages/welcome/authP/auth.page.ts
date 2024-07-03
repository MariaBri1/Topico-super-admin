import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseApp } from '@angular/fire/compat';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  firebaseSvc = inject(FirebaseService);
  utilsSvc= inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as user).then(res =>{
        console.log(res);
        this.getUserInfo(res.user.uid);
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message:"Usuario o Contraseña Incorrectos",
          duration: 2500,
          color:'dark',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }

  async getUserInfo(uid:string) {
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `administrador/${uid}`;

      this.firebaseSvc.getDocument(path).then((user:user) =>{
        if(user.role === 'administrador') { // Verificar si el usuario es admin
          this.utilsSvc.saveInLocalStorage('administrador',user)
          this.utilsSvc.routerLink('/main-p/UserUsuario');
          this.form.reset();

          this.utilsSvc.presentToast({
            message: `Te damos la Bienvenida ${user.name}`,
            duration: 1500,
            color:'dark',
            position: 'middle',
            icon: 'person-circle-outline'
          })
        } else {
          this.utilsSvc.presentToast({
            message: "Acceso denegado. Solo los administradores pueden acceder.",
            duration: 2500,
            color:'dark',
            position: 'middle',
            icon: 'alert-circle-outline'
          })
        }
      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: "no se pudo guardar la informacion , contacte con soporte tecnico",
          duration: 2500,
          color:'dark',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }
}
