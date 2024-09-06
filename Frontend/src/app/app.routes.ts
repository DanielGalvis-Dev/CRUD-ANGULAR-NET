import { Routes } from '@angular/router'; 
import { InicioComponent } from './Views/inicio/inicio.component'; 
import { EmpleadoComponent } from './Views/empleado/empleado.component'; 

// Definición de las rutas de la aplicación
export const routes: Routes = [
  // Ruta raíz: Cuando no se especifica ningún camino, se carga el componente InicioComponent
  { path: '', component: InicioComponent },
  
  // Ruta 'inicio': Redirige al componente InicioComponent
  { path: 'inicio', component: InicioComponent },
  
  // Ruta 'empleado/:id': Redirige al componente EmpleadoComponent, pasando un parámetro dinámico 'id'
  { path: 'empleado/:id', component: EmpleadoComponent },
];
