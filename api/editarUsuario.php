<?php

// Establecer encabezados CORS para permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Incluir archivo de conexión a la base de datos
require "conexion.php";

// Obtener datos JSON de la solicitud HTTP
$json = file_get_contents("php://input");

// Decodificar datos JSON en un objeto PHP
$objEmpleado = json_decode($json);

// Crear una consulta SQL para actualizar un usuario en la base de datos
$sql = "UPDATE usuarios SET usuario='$objEmpleado->usuario', contrasena='$objEmpleado->contrasena', email='$objEmpleado->email' WHERE idUsuario='$objEmpleado->idUsuario'";

// Ejecutar la consulta SQL
$query = $mysqli->query($sql);

// Preparar una respuesta JSON
$jsonRespuesta = array('msg' => 'OK');

// Enviar la respuesta JSON al cliente
echo json_encode($jsonRespuesta);

