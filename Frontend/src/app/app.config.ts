import { ApplicationConfig, importProvidersFrom } from '@angular/core'; 
import { provideRouter, withComponentInputBinding } from '@angular/router'; 

import { routes } from './app.routes'; // Importa las rutas definidas en el archivo app.routes.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { HttpClientModule } from '@angular/common/http'; // Módulo HTTP para manejar peticiones HTTP

// Configuración principal de la aplicación Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor de enrutamiento: establece las rutas de la aplicación y permite el enlace de datos entre componentes
    provideRouter(routes, withComponentInputBinding()),

    // Proveedor de animaciones asíncronas: optimiza el manejo de animaciones en la aplicación
    provideAnimationsAsync(),

    // Proveedor de módulos externos: importa el módulo HttpClient para manejar solicitudes HTTP en toda la aplicación
    importProvidersFrom(HttpClientModule),
  ],
};
