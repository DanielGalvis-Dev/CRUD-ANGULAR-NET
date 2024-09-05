import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  private empleadoServicio = inject(EmpleadoService);
  public listarEmpleados: Empleado[] = [];
  public displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'correo',
    'sueldo',
    'fechaContrato',
    'accion',
  ];

  obtenerEmpleados() {
    this.empleadoServicio.listar().subscribe({
      next: (data) => {
        console.log(data);
        if (data.length > 0) {
          this.listarEmpleados = data;
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  constructor(private router: Router) {
    this.obtenerEmpleados();
  }

  crear() {
    this.router.navigate(['/empleado', 0]);
  }

  editar(objeto: Empleado) {
    console.log(objeto.idP);
    this.router.navigate(['/empleado', objeto.idP]);
  }

  eliminar(objeto: Empleado) {
    if (
      confirm(`Desea eliminar al empleado ${objeto.nombreP} ${objeto.apellidoP}`)
    ) {
      this.empleadoServicio.eliminar(objeto.idP).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados();
          } else {
            alert(
              `El empleado ${objeto.nombreP} ${objeto.apellidoP} no se ha podido eliminar`
            );
          }
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    } else {
    }
  }
}
