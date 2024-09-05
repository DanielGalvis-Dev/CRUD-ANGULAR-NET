using MiWebAPI.Data; // Importa el namespace que contiene la clase EmpleadoData
using MiWebAPI.Controllers; // Importa el namespace que contiene los controladores de la API
using Microsoft.Extensions.Options; // Importa el namespace para manejar opciones de configuraci�n

var builder = WebApplication.CreateBuilder(args); // Inicializa el constructor de la aplicaci�n web

// A�ade servicios al contenedor de dependencias.
builder.Services.AddControllers(); // Agrega el servicio de controladores para manejar solicitudes HTTP

// Aprende m�s sobre c�mo configurar Swagger/OpenAPI en https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer(); // Habilita la exploraci�n de endpoints para Swagger
builder.Services.AddSwaggerGen(); // Configura Swagger para generar la documentaci�n de la API

builder.Services.AddSingleton<EmpleadoData>(); // Registra la clase EmpleadoData como un servicio singleton (una sola instancia)

builder.Services.AddCors(options => // Configura el servicio CORS (Cross-Origin Resource Sharing)
{
    options.AddPolicy("NuevaPolitica", app => {
        app.AllowAnyOrigin() // Permite solicitudes de cualquier origen
           .AllowAnyHeader() // Permite cualquier encabezado en las solicitudes
           .AllowAnyMethod(); // Permite cualquier m�todo HTTP (GET, POST, PUT, DELETE, etc.)
    });
});

var app = builder.Build(); // Construye la aplicaci�n web con la configuraci�n especificada

// Configura el pipeline de manejo de solicitudes HTTP.
if (app.Environment.IsDevelopment()) // Si la aplicaci�n est� en el entorno de desarrollo
{
    app.UseSwagger(); // Habilita Swagger para generar la documentaci�n de la API
    app.UseSwaggerUI(); // Habilita la interfaz de usuario de Swagger para visualizar la documentaci�n
}

app.UseCors("NuevaPolitica"); // Aplica la pol�tica CORS configurada
app.UseAuthorization(); // Habilita la autorizaci�n en la aplicaci�n

app.MapControllers(); // Mapea los controladores para que manejen las solicitudes HTTP entrantes

app.Run(); // Ejecuta la aplicaci�n
