import { Component, OnInit, inject } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { getFirestore, query, onSnapshot, collection, where, doc, getDoc, updateDoc } from 'firebase/firestore'; // Agrega 'doc', 'getDoc' y 'updateDoc' a los imports
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-UserUsuario',
  templateUrl: './UserUsuario.page.html',
  styleUrls: ['./UserUsuario.page.scss'],
})
export class UserUsuarioPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  users: user[] = [];
  loading: boolean = false;

  ngOnInit() {}

  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getUsers();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getUsers();
      event.target.complete();
    }, 1000);
  }

  async getUsers() {
    this.loading = true;

    // Utilizamos una consulta para obtener solo los usuarios con el rol de administrador
    let usersQuery = query(collection(getFirestore(), 'user'), where('role', '==', 'student'));

    let sub = onSnapshot(usersQuery, async (querySnapshot) => {
      let user = [];
      querySnapshot.forEach(async (doc) => {
        user.push(doc.data());
      });
      console.log(user);
      this.users = user;
      this.loading = false;
      // No es necesario desuscribirse de onSnapshot
    }, (error) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }

  async updateUserAccountStatus(userId: string, newStatus: string) {
    const userRef = doc(collection(getFirestore(), 'user'), userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      userData['estadocuenta'] = newStatus; // Cambia 'active' al estado deseado

      // Actualiza los datos del usuario en Firestore
      await updateDoc(userRef, userData);
    } else {
      console.error('El usuario no existe');
    }
  }
}
