import { Component, inject } from '@angular/core'; 
import { MatCardModule } from '@angular/material/card'; // Módulo de tarjetas de Angular Material
import { MatTableModule } from '@angular/material/table'; // Módulo de tablas de Angular Material
import { MatIconModule } from '@angular/material/icon'; // Módulo de íconos de Angular Material
import { MatButtonModule } from '@angular/material/button'; // Módulo de botones de Angular Material
import { EmpleadoService } from '../../Services/empleado.service'; // Servicio para manejar las operaciones con empleados
import { Empleado } from '../../Models/Empleado'; // Modelo de datos de empleado
import { Router } from '@angular/router'; // Módulo para la navegación en la aplicación

// Decorador @Component que define el componente de la página de inicio
@Component({
  selector: 'app-inicio', // Selector que se usará para invocar este componente en HTML
  standalone: true, // Configura el componente como standalone, sin necesidad de un módulo
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule], // Importación de módulos de Angular Material
  templateUrl: './inicio.component.html', // Ruta de la plantilla HTML asociada a este componente
  styleUrls: ['./inicio.component.css'], // Ruta del archivo de estilos CSS específico para este componente
})
export class InicioComponent {
  // Inyección del servicio EmpleadoService para manejar las operaciones con empleados
  private empleadoServicio = inject(EmpleadoService);

  // Array público que contiene la lista de empleados a mostrar en la tabla
  public listarEmpleados: Empleado[] = [];

  // Array que define las columnas a mostrar en la tabla de empleados
  public displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'correo',
    'sueldo',
    'fechaContrato',
    'accion', // Columna para las acciones (editar, eliminar)
  ];

  // Método para obtener la lista de empleados a través del servicio EmpleadoService
  obtenerEmpleados() {
    this.empleadoServicio.listar().subscribe({
      next: (data) => {
        console.log(data); // Muestra los datos en la consola para depuración
        if (data.length > 0) {
          this.listarEmpleados = data; // Asigna los datos recibidos al array listarEmpleados
        }
      },
      error: (err) => {
        console.log(err.message); // Manejo de errores en la solicitud
      },
    });
  }

  // Constructor que inyecta el router y llama al método obtenerEmpleados al inicializar el componente
  constructor(private router: Router) {
    this.obtenerEmpleados();
  }

  // Método para navegar a la página de creación de un nuevo empleado (id = 0)
  crear() {
    this.router.navigate(['/empleado', 0]);
  }

  // Método para editar un empleado existente, pasando su id a la ruta
  editar(objeto: Empleado) {
    console.log(objeto.idP); // Muestra el id del empleado en la consola
    this.router.navigate(['/empleado', objeto.idP]); // Navega a la página de edición con el id del empleado
  }

  // Método para eliminar un empleado, confirmando antes de proceder
  eliminar(objeto: Empleado) {
    if (confirm(`Desea eliminar al empleado ${objeto.nombreP} ${objeto.apellidoP}`)) {
      // Si se confirma la eliminación, llama al servicio para eliminar al empleado
      this.empleadoServicio.eliminar(objeto.idP).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados(); // Actualiza la lista de empleados si la eliminación fue exitosa
          } else {
            alert(`El empleado ${objeto.nombreP} ${objeto.apellidoP} no se ha podido eliminar`);
          }
        },
        error: (err) => {
          console.log(err.message); // Manejo de errores en la solicitud
        },
      });
    }
  }
}
