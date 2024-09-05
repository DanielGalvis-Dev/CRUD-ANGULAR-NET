namespace MiWebAPI.Models
{
    public class Empleado
    {
        public int IdP { get; set; } // Identificador único del empleado (primary key en la base de datos).
        public string? NombreP { get; set; } // Nombre del empleado. Es nullable, por lo que puede no tener valor.
        public string? ApellidoP { get; set; } // Apellido del empleado. También nullable.
        public string? CorreoP { get; set; } // Dirección de correo electrónico del empleado. Nullable.
        public int SueldoP { get; set; } // Sueldo del empleado expresado en una cantidad entera.
        public string? FechaContratoP { get; set; } // Fecha en la que se contrató al empleado. Se almacena como cadena y es nullable.

    }
}
