<?php
    
// Crear una instancia de conexión a la base de datos MySQL con las credenciales proporcionadas
$mysqli = new mysqli("localhost", "root", "", "practicas");

// Comprobar si la conexión a la base de datos fue exitosa
if ($mysqli->connect_errno) {
    // Si la conexión falla, mostrar un mensaje de error y detener el script
    die("Fallo la conexión");
} else {
    // Si la conexión es exitosa, puedes realizar operaciones en la base de datos.
    // Puedes habilitar el siguiente comentario si deseas ver un mensaje de éxito en la conexión.
    //echo "Conexión exitosa";
}
