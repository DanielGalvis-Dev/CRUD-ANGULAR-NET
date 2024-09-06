import { Component } from '@angular/core'; 
import { RouterOutlet } from '@angular/router'; // RouterOutlet permite que las rutas dinámicas se carguen en este componente

// Decorador @Component para definir el componente raíz de la aplicación
@Component({
  selector: 'app-root', // Nombre del componente que será utilizado en el HTML como <app-root></app-root>
  standalone: true, // Configura el componente como standalone, lo que significa que no depende de un módulo
  imports: [RouterOutlet], // Importa RouterOutlet para gestionar las rutas en este componente
  templateUrl: './app.component.html', // Define la ruta del archivo de plantilla HTML asociado a este componente
  styleUrls: ['./app.component.css'] // Define la ruta del archivo CSS que contiene los estilos específicos de este componente
})
export class AppComponent {
  // Variable de título, se utiliza en la plantilla HTML para mostrar el título de la aplicación
  title = 'MiApp'; 
}
