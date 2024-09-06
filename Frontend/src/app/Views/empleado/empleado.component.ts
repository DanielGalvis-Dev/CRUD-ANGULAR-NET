import { Component, inject, Input, OnInit } from '@angular/core'; 
import { MatFormFieldModule } from '@angular/material/form-field'; // Módulo para campos de formulario de Angular Material
import { MatInputModule } from '@angular/material/input'; // Módulo para entradas de texto de Angular Material
import { MatButtonModule } from '@angular/material/button'; // Módulo para botones de Angular Material
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Módulos para manejar formularios reactivos
import { EmpleadoService } from '../../Services/empleado.service'; // Servicio que maneja operaciones relacionadas con empleados
import { Router } from '@angular/router'; // Módulo para manejar la navegación en la aplicación
import { Empleado } from '../../Models/Empleado'; // Modelo que representa un empleado

// Decorador @Component para definir el componente
@Component({
  selector: 'app-empleado', // Nombre del componente que se utilizará en el HTML como <app-empleado></app-empleado>
  standalone: true, // Indica que este componente es independiente y no requiere un módulo
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, // Importación de los módulos necesarios
  ],
  templateUrl: './empleado.component.html', // Ruta del archivo de la plantilla HTML asociada a este componente
  styleUrl: './empleado.component.css', // Ruta del archivo CSS para los estilos específicos de este componente
})
export class EmpleadoComponent implements OnInit {
  @Input('id') idP!: number; // Decorador @Input para recibir el ID del empleado desde el componente padre
  private empleadoServicio = inject(EmpleadoService); // Inyección del servicio EmpleadoService para manejar las operaciones con empleados
  public formBuild = inject(FormBuilder); // Inyección del servicio FormBuilder para construir formularios reactivos

  // Definición del formulario reactivo para los datos del empleado
  public formEmpleado: FormGroup = this.formBuild.group({
    nombre: [''],
    apellido: [''],
    correo: [''],
    sueldo: [0],
    fechaContrato: [''],
  });

  // Constructor que inyecta el router para la navegación
  constructor(private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    if (this.idP != 0) {
      // Si el ID es diferente de 0, obtenemos los datos del empleado para edición
      this.empleadoServicio.obtener(this.idP).subscribe({
        next: (data) => {
          // Asigna los datos recibidos al formulario
          this.formEmpleado.patchValue({
            nombre: data.nombreP,
            apellido: data.apellidoP,
            correo: data.correoP,
            sueldo: data.sueldoP,
            fechaContrato: data.fechaContratoP,
          });
        },
        error(err) {
          console.log(err.message); // Manejo de errores en la solicitud
        },
      });
    }
  }

  // Método para guardar o editar un empleado
  guardar() {
    // Se crea un objeto Empleado a partir de los valores del formulario
    const objeto: Empleado = {
      idP: this.idP,
      nombreP: this.formEmpleado.value.nombre,
      apellidoP: this.formEmpleado.value.apellido,
      correoP: this.formEmpleado.value.correo,
      sueldoP: this.formEmpleado.value.sueldo,
      fechaContratoP: this.formEmpleado.value.fechaContrato,
    };

    if (this.idP == 0) {
      // Si el ID es 0, se está creando un nuevo empleado
      this.empleadoServicio.crear(objeto).subscribe({
        next: (data) => {
          console.log(data); // Muestra la respuesta en la consola para depuración
          if (data.isSuccess) {
            this.router.navigate(['/']); // Redirige a la página principal si la creación es exitosa
          } else {
            alert('Error al crear'); // Muestra un mensaje de error si la creación falla
          }
        },
        error(err) {
          console.log(err.message); // Manejo de errores en la solicitud
        },
      });
    } else {
      // Si el ID no es 0, se está editando un empleado existente
      this.empleadoServicio.editar(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']); // Redirige a la página principal si la edición es exitosa
          } else {
            alert('Error al editar'); // Muestra un mensaje de error si la edición falla
          }
        },
        error(err) {
          console.log(err.message); // Manejo de errores en la solicitud
        },
      });
    }
  }

  // Método para volver a la página principal sin realizar cambios
  volver() {
    this.router.navigate(['/']);
  }
}
