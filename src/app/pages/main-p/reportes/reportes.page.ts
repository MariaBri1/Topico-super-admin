import { Component, OnInit, inject } from '@angular/core';
import { orderBy,where} from 'firebase/firestore';
import { Cita } from 'src/app/models/cita.model';
import { collectionGroup, getFirestore, query, onSnapshot } from 'firebase/firestore';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  
  //cerrar sesion
singOut(){
  this.firebaseSvc.sigOut();
}
  citas: Cita[] = [];
  citasDentista: Cita[] = [];
  citasOculista: Cita[] = [];
  citasFisioterapia: Cita[] = [];
  
  loading: boolean = false;

  citaEstado(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'Cita Concluida' : 'Cita Pendiente';
  }
  citaEstadoColor(cita): string {
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const now = new Date();
    return fechaCita < now ? 'danger' : 'success';
  }
  ngOnInit() {
  }
  user(): user {
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getProducts();
  }
   doRefresh(event) {
    setTimeout(() => {
      this.getProducts
      event.target.complete();
    }, 1000);
   }
  //====Obtener citas de hoy=============
  getCitasHoy(){
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // establece la hora a medianoche para la comparación
  
    return this.citas.filter(cita => {
      let fechaCita = new Date(cita.fecha);
      fechaCita.setHours(0, 0, 0, 0); // establece la hora a medianoche para la comparación
  
      return fechaCita.getTime() === hoy.getTime();
    });
  }
  //====Obtener las citas=============
  
  getProducts() {
    this.loading = true;
    
    // Utilizamos una consulta de grupo de colecciones para obtener todas las citas
    let citasQuery = query(
      collectionGroup(getFirestore(), 'cita'),
      orderBy('fecha', 'desc')
    );
    
    let citasDentistaQuery = query(
      collectionGroup(getFirestore(), 'cita_dentista'),
      orderBy('fecha', 'desc')
    );
  
    let citasFisioterapiaQuery = query(
      collectionGroup(getFirestore(), 'cita_fisioterapia'),
      orderBy('fecha', 'desc')
    );
  
    let citasOculistaQuery = query(
      collectionGroup(getFirestore(), 'cita_oculista'),
      orderBy('fecha', 'desc')
    );
    
    let sub = onSnapshot(citasQuery, (querySnapshot) => {
      let citas = [];
      querySnapshot.forEach((doc) => {
          citas.push(doc.data());
      });
      console.log(citas);
      this.citas = citas;
      this.loading = false;
    }, (error) => {
      console.error(error);
      this.loading = false;
    });
  
    let subDentista = onSnapshot(citasDentistaQuery, (querySnapshot) => {
      let citasDentista = [];
      querySnapshot.forEach((doc) => {
          citasDentista.push(doc.data());
      });
      console.log(citasDentista);
      this.citasDentista = citasDentista;
      this.loading = false;
    }, (error) => {
      console.error(error);
      this.loading = false;
    });
  
    let subFisioterapia = onSnapshot(citasFisioterapiaQuery, (querySnapshot) => {
      let citasFisioterapia = [];
      querySnapshot.forEach((doc) => {
          citasFisioterapia.push(doc.data());
      });
      console.log(citasFisioterapia);
      this.citasFisioterapia = citasFisioterapia;
      this.loading = false;
    }, (error) => {
      console.error(error);
      this.loading = false;
    });
  
    let subOculista = onSnapshot(citasOculistaQuery, (querySnapshot) => {
      let citasOculista = [];
      querySnapshot.forEach((doc) => {
          citasOculista.push(doc.data());
      });
      console.log(citasOculista);
      this.citasOculista = citasOculista;
      this.loading = false;
    }, (error) => {
      console.error(error);
      this.loading = false;
    });
  }
  
  

  
}
