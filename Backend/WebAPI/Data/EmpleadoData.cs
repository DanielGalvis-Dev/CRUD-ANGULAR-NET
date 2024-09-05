using MiWebAPI.Models; // Importa el namespace que contiene el modelo Empleado.
using MySql.Data.MySqlClient; // Importa la biblioteca para trabajar con MySQL en C#.
using System.Data; // Importa los tipos de datos relacionados con bases de datos.

namespace MiWebAPI.Data
{
    public class EmpleadoData
    {
        public readonly string conexion; // Cadena de conexión para acceder a la base de datos.

        // Constructor que inicializa la cadena de conexión usando IConfiguration para obtener la cadena definida en appsettings.json.
        public EmpleadoData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSQL")!;
        }

        // Método para listar todos los empleados desde la base de datos.
        public async Task<List<Empleado>> Listar()
        {
            List<Empleado> lista = new(); // Inicializa una lista vacía de empleados.
            using (var con = new MySqlConnection(conexion)) // Establece la conexión con la base de datos.
            {
                await con.OpenAsync(); // Abre la conexión de manera asincrónica.
                MySqlCommand cmd = new("sp_readEmpleados", con); // Define un comando que ejecuta un procedimiento almacenado.
                cmd.CommandType = CommandType.StoredProcedure; // Especifica que se trata de un procedimiento almacenado.

                using (var reader = await cmd.ExecuteReaderAsync()) // Ejecuta el comando y obtiene un lector de datos.
                {
                    while (await reader.ReadAsync()) // Lee los datos fila por fila de manera asincrónica.
                    {
                        lista.Add(new Empleado
                        {
                            IdP = Convert.ToInt32(reader["id"]),
                            NombreP = reader["nombre"].ToString(),
                            ApellidoP = reader["apellido"].ToString(),
                            CorreoP = reader["correo"].ToString(),
                            SueldoP = Convert.ToInt32(reader["sueldo"]),
                            FechaContratoP = Convert.ToDateTime(reader["fechaContrato"]).ToString("dd/MM/yyyy"),
                        });
                    }
                }
            }
            return lista; // Devuelve la lista de empleados.
        }

        // Método para obtener un empleado específico por su ID.
        public async Task<Empleado> Obtener(int Id)
        {
            Empleado objeto = new Empleado(); // Inicializa un nuevo objeto Empleado.
            using (var con = new MySqlConnection(conexion)) // Establece la conexión con la base de datos.
            {
                await con.OpenAsync(); // Abre la conexión de manera asincrónica.
                MySqlCommand cmd = new("sp_getEmpleado", con); // Define un comando que ejecuta un procedimiento almacenado.
                cmd.Parameters.AddWithValue("p_Id", Id); // Agrega el parámetro ID al comando.
                cmd.CommandType = CommandType.StoredProcedure; // Especifica que se trata de un procedimiento almacenado.

                using (var reader = await cmd.ExecuteReaderAsync()) // Ejecuta el comando y obtiene un lector de datos.
                {
                    while (await reader.ReadAsync()) // Lee los datos si existen resultados.
                    {
                        objeto = new Empleado
                        {
                            IdP = Convert.ToInt32(reader["id"]),
                            NombreP = reader["nombre"].ToString(),
                            ApellidoP = reader["apellido"].ToString(),
                            CorreoP = reader["correo"].ToString(),
                            SueldoP = Convert.ToInt32(reader["sueldo"]),
                            FechaContratoP = Convert.ToDateTime(reader["fechaContrato"]).ToString("dd/MM/yyyy"),
                        };
                    }
                }
            }
            return objeto; // Devuelve el objeto Empleado encontrado.
        }

        // Método para crear un nuevo empleado en la base de datos.
        public async Task<bool> Crear(Empleado objeto)
        {
            bool respuesta = true; // Inicializa la variable de respuesta.

            using (var con = new MySqlConnection(conexion)) // Establece la conexión con la base de datos.
            {
                MySqlCommand cmd = new("sp_createEmpleado", con); // Define un comando que ejecuta un procedimiento almacenado.
                // Agrega los parámetros al comando con los valores del objeto Empleado.
                cmd.Parameters.AddWithValue("p_Nombre", objeto.NombreP);
                cmd.Parameters.AddWithValue("p_Apellido", objeto.ApellidoP);
                cmd.Parameters.AddWithValue("p_Correo", objeto.CorreoP);
                cmd.Parameters.AddWithValue("p_Sueldo", objeto.SueldoP);
                cmd.Parameters.AddWithValue("p_FechaContrato", objeto.FechaContratoP);
                cmd.CommandType = CommandType.StoredProcedure; // Especifica que se trata de un procedimiento almacenado.

                try
                {
                    await con.OpenAsync(); // Abre la conexión de manera asincrónica.
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false; // Ejecuta el comando y verifica si se afectaron filas.
                }
                catch
                {
                    respuesta = false; // Si ocurre una excepción, se devuelve false.
                }
            }
            return respuesta; // Devuelve la respuesta indicando si la operación fue exitosa.
        }

        // Método para editar un empleado existente en la base de datos.
        public async Task<bool> Editar(Empleado objeto)
        {
            bool respuesta = true; // Inicializa la variable de respuesta.

            using (var con = new MySqlConnection(conexion)) // Establece la conexión con la base de datos.
            {
                MySqlCommand cmd = new("sp_updateEmpleado", con); // Define un comando que ejecuta un procedimiento almacenado.
                // Agrega los parámetros al comando con los valores actualizados del objeto Empleado.
                cmd.Parameters.AddWithValue("p_Id", objeto.IdP);
                cmd.Parameters.AddWithValue("p_Nombre", objeto.NombreP);
                cmd.Parameters.AddWithValue("p_Apellido", objeto.ApellidoP);
                cmd.Parameters.AddWithValue("p_Correo", objeto.CorreoP);
                cmd.Parameters.AddWithValue("p_Sueldo", objeto.SueldoP);
                cmd.Parameters.AddWithValue("p_FechaContrato", objeto.FechaContratoP);
                cmd.CommandType = CommandType.StoredProcedure; // Especifica que se trata de un procedimiento almacenado.

                try
                {
                    await con.OpenAsync(); // Abre la conexión de manera asincrónica.
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false; // Ejecuta el comando y verifica si se afectaron filas.
                }
                catch
                {
                    respuesta = false; // Si ocurre una excepción, se devuelve false.
                }
            }
            return respuesta; // Devuelve la respuesta indicando si la operación fue exitosa.
        }

        // Método para eliminar un empleado de la base de datos.
        public async Task<bool> Eliminar(int Id)
        {
            bool respuesta = true; // Inicializa la variable de respuesta.

            using (var con = new MySqlConnection(conexion)) // Establece la conexión con la base de datos.
            {
                MySqlCommand cmd = new("sp_deleteEmpleado", con); // Define un comando que ejecuta un procedimiento almacenado.
                cmd.Parameters.AddWithValue("p_Id", Id); // Agrega el parámetro ID al comando.
                cmd.CommandType = CommandType.StoredProcedure; // Especifica que se trata de un procedimiento almacenado.
                
                try
                {
                    await con.OpenAsync(); // Abre la conexión de manera asincrónica.
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false; // Ejecuta el comando y verifica si se afectaron filas.
                }
                catch
                {
                    respuesta = false; // Si ocurre una excepción, se devuelve false.
                }
            }
            return respuesta; // Devuelve la respuesta indicando si la operación fue exitosa.
        }
    }
}
