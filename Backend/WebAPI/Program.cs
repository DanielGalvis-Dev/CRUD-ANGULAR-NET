using MiWebAPI.Data; // Importa el namespace que contiene la clase EmpleadoData
using MiWebAPI.Controllers; // Importa el namespace que contiene los controladores de la API
using Microsoft.Extensions.Options; // Importa el namespace para manejar opciones de configuración

var builder = WebApplication.CreateBuilder(args); // Inicializa el constructor de la aplicación web

// Añade servicios al contenedor de dependencias.
builder.Services.AddControllers(); // Agrega el servicio de controladores para manejar solicitudes HTTP

// Aprende más sobre cómo configurar Swagger/OpenAPI en https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer(); // Habilita la exploración de endpoints para Swagger
builder.Services.AddSwaggerGen(); // Configura Swagger para generar la documentación de la API

builder.Services.AddSingleton<EmpleadoData>(); // Registra la clase EmpleadoData como un servicio singleton (una sola instancia)

builder.Services.AddCors(options => // Configura el servicio CORS (Cross-Origin Resource Sharing)
{
    options.AddPolicy("NuevaPolitica", app => {
        app.AllowAnyOrigin() // Permite solicitudes de cualquier origen
           .AllowAnyHeader() // Permite cualquier encabezado en las solicitudes
           .AllowAnyMethod(); // Permite cualquier método HTTP (GET, POST, PUT, DELETE, etc.)
    });
});

var app = builder.Build(); // Construye la aplicación web con la configuración especificada

// Configura el pipeline de manejo de solicitudes HTTP.
if (app.Environment.IsDevelopment()) // Si la aplicación está en el entorno de desarrollo
{
    app.UseSwagger(); // Habilita Swagger para generar la documentación de la API
    app.UseSwaggerUI(); // Habilita la interfaz de usuario de Swagger para visualizar la documentación
}

app.UseCors("NuevaPolitica"); // Aplica la política CORS configurada
app.UseAuthorization(); // Habilita la autorización en la aplicación

app.MapControllers(); // Mapea los controladores para que manejen las solicitudes HTTP entrantes

app.Run(); // Ejecuta la aplicación
