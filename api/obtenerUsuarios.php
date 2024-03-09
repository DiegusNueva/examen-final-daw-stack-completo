<?php

// Establecer encabezados CORS para permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Incluir archivo de conexión a la base de datos
require "conexion.php";

// Comentario de prueba
//$usuario = "cheko";

// Crear una consulta SQL para seleccionar todos los usuarios de la base de datos
$sql = "SELECT * FROM usuarios";

// Ejecutar la consulta SQL
$query = $mysqli->query($sql);

// Crear un arreglo para almacenar los datos de los usuarios
$datos = array();

// Recorrer los resultados y agregarlos al arreglo de datos
while ($resultado = $query->fetch_assoc()) {
    $datos[] = $resultado;
}

// Enviar los datos en formato JSON como respuesta al cliente
echo json_encode($datos);

// También puedes utilizar el siguiente comentario para estructurar los datos en un objeto JSON con una clave "usuarios":
// echo json_encode(array("usuarios" => $datos));
