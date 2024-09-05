using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiWebAPI.Data;
using MiWebAPI.Models;

namespace MiWebAPI.Controllers
{
    // Define la ruta base para este controlador como "api/Empleado".
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly EmpleadoData _empleadoData; // Campo privado para acceder a la lógica de datos.

        // Constructor que inyecta una instancia de EmpleadoData.
        public EmpleadoController(EmpleadoData empleadoData)
        {
            _empleadoData = empleadoData;
        }

        // Acción HTTP GET para listar todos los empleados.
        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            List<Empleado> Lista = await _empleadoData.Listar(); // Llama al método Listar de EmpleadoData.
            return StatusCode(StatusCodes.Status200OK, Lista); // Devuelve un status 200 OK con la lista de empleados.
        }

        // Acción HTTP GET para obtener un empleado específico por su ID.
        [HttpGet("{Id}")]
        public async Task<IActionResult> Obtener(int Id)
        {
            Empleado objeto = await _empleadoData.Obtener(Id); // Llama al método Obtener de EmpleadoData con el ID proporcionado.
            return StatusCode(StatusCodes.Status200OK, objeto); // Devuelve un status 200 OK con el empleado encontrado.
        }

        // Acción HTTP POST para crear un nuevo empleado.
        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Empleado objeto)
        {
            bool respuesta = await _empleadoData.Crear(objeto); // Llama al método Crear de EmpleadoData con el objeto Empleado proporcionado.
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta }); // Devuelve un status 200 OK con un objeto que indica si la creación fue exitosa.
        }

        // Acción HTTP PUT para editar un empleado existente.
        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Empleado objeto)
        {
            bool respuesta = await _empleadoData.Editar(objeto); // Llama al método Editar de EmpleadoData con el objeto Empleado actualizado.
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta }); // Devuelve un status 200 OK con un objeto que indica si la edición fue exitosa.
        }

        // Acción HTTP DELETE para eliminar un empleado por su ID.
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Eliminar(int Id)
        {
            bool respuesta = await _empleadoData.Eliminar(Id); // Llama al método Eliminar de EmpleadoData con el ID proporcionado.
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta }); // Devuelve un status 200 OK con un objeto que indica si la eliminación fue exitosa.
        }
    }
}
