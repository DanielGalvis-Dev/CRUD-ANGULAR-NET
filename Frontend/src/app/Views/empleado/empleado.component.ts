import { Component, inject, Input, input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../Models/Empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent implements OnInit {
  @Input('id') idP!: number;
  private empleadoServicio = inject(EmpleadoService);
  public formBuild = inject(FormBuilder);

  public formEmpleado: FormGroup = this.formBuild.group({
    nombre: [''],
    apellido: [''],
    correo: [''],
    sueldo: [0],
    fechaContrato: [''],
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.idP != 0) {
      this.empleadoServicio.obtener(this.idP).subscribe({
        next: (data) => {
          this.formEmpleado.patchValue({
            nombre: data.nombreP,
            apellido: data.apellidoP,
            correo: data.correoP,
            sueldo: data.sueldoP,
            fechaContrato: data.fechaContratoP,
          });
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  }

  guardar() {
    const objeto: Empleado = {
      idP: this.idP,
      nombreP: this.formEmpleado.value.nombre,
      apellidoP: this.formEmpleado.value.apellido,
      correoP: this.formEmpleado.value.correo,
      sueldoP: this.formEmpleado.value.sueldo,
      fechaContratoP: this.formEmpleado.value.fechaContrato,
    };

    if (this.idP == 0) {
      this.empleadoServicio.crear(objeto).subscribe({
        next: (data) => {
          console.log(data);
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al crear');
          }
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      this.empleadoServicio.editar(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al editar');
          }
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
