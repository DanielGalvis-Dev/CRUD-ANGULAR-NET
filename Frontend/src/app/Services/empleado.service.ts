import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP
import { inject, Injectable } from '@angular/core'; // Importa 'inject' para inyectar dependencias y 'Injectable' para marcar la clase como un servicio
import { appsettings } from '../settings/appsettings'; // Importa la configuración de la API desde appsettings
import { Empleado } from '../Models/Empleado'; // Importa el modelo 'Empleado'
import { ResponseAPI } from '../Models/ResponseAPI'; // Importa el modelo 'ResponseAPI' para manejar respuestas de la API

@Injectable({
  providedIn: 'root', // El servicio será proporcionado a nivel raíz de la aplicación
})
export class EmpleadoService {
  private http = inject(HttpClient); // Inyecta el servicio HttpClient para realizar solicitudes HTTP
  private apiUrl: string = `${appsettings.apiUrl}Empleado`; // Define la URL base para los endpoints de empleados

  constructor() {}

  // Método para listar todos los empleados (GET request)
  listar() {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  // Método para obtener un empleado por su ID (GET request)
  obtener(id: number) {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo empleado (POST request)
  crear(objeto: Empleado) {
    return this.http.post<ResponseAPI>(this.apiUrl, objeto);
  }

  // Método para editar un empleado existente (PUT request)
  editar(objeto: Empleado) {
    return this.http.put<ResponseAPI>(this.apiUrl, objeto);
  }

  // Método para eliminar un empleado por su ID (DELETE request)
  eliminar(id: number) {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
