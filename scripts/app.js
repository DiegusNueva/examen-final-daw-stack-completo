// Definición de las URL de los EndPoints de la API REST
const urlObtenerUsuarios = 'http://127.0.0.1:5500/api/obtenerUsuarios.php'
const urlAgregarUsuario = 'http://127.0.0.1:5500/api/agregarUsuario.php'
const urlEditarUsuario = 'http://127.0.0.1:5500/api/editarUsuario.php'
const urlBorrarUsuario = 'http://127.0.0.1:5500/api/borrarUsuario.php'

// Declaración de una lista de empleados vacía
let listaEmpleados = []

// Objeto empleado que se utiliza para almacenar información de empleados
const objEmpleado = {
    idUsuario: '',
    usuario: '',
    contrasena: '',
    email: ''
}

// Variable para rastrear si se está editando un empleado
let editando = false

// Obtener referencias a elementos HTML del formulario y agregar un evento para validar el formulario
const formulario = document.querySelector('#formulario')
const usuarioInput = document.querySelector('#usuario')
const contrasenaInput = document.querySelector('#contrasena')
const emailInput = document.querySelector('#email')
formulario.addEventListener('submit', validarFormulario)

// Función para validar el formulario cuando se envía
function validarFormulario(e) {
    e.preventDefault() // Evita que el formulario se envíe automáticamente al presionar el botón.

    // Primera validación: Comprobar si los campos obligatorios están vacíos
    if([usuarioInput.value, contrasenaInput.value, emailInput.value].includes('')) {
        alert('Todos los campos son obligatorios')
        return
    }

    if(editando) {
        editarEmpleado()
        editando = false
    } else {
        // Asignar valores del formulario al objeto empleado
        objEmpleado.idUsuario = Date.now()
        objEmpleado.usuario = usuarioInput.value
        objEmpleado.contrasena = contrasenaInput.value
        objEmpleado.email = emailInput.value

        agregarEmpleado()
    }
}

// Función asíncrona para obtener la lista de empleados
async function obtenerEmpleados() {
    listaEmpleados = await fetch(urlObtenerUsuarios)
        .then(respuesta => respuesta.json())
        .then(datos => datos)
        .catch(error => console.log(error))

    mostrarEmpleados()
}

// Llamar a la función obtenerEmpleados para cargar la lista de empleados al cargar la página
obtenerEmpleados()

// Función para mostrar la lista de empleados en la interfaz
function mostrarEmpleados() {
    const divEmpleados = document.querySelector('.div-empleados')

    listaEmpleados.forEach(empleado => {
        const {idUsuario, usuario, contrasena, email} = empleado

        const parrafo = document.createElement('p')
        parrafo.textContent = `${idUsuario} - ${usuario} - ${contrasena} - ${email}`
        parrafo.dataset.id = idUsuario

        const editarBoton = document.createElement('button')
        editarBoton.onclick = () => cargarEmpleado(empleado)
        editarBoton.textContent = 'Editar'
        editarBoton.classList.add('btn', 'btn-editar')
        parrafo.append(editarBoton)

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(idUsuario);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr')

        divEmpleados.appendChild(parrafo)
        divEmpleados.appendChild(hr)
    })
}

// Función asíncrona para agregar un empleado
async function agregarEmpleado() {
    const res = await fetch(urlAgregarUsuario, {
        method: 'POST',
        body: JSON.stringify(objEmpleado)
    })
    .then(respuesta => respuesta.json())
    .then(data => data)
    .catch(error => alert(error))

    if(res.msg === 'OK') {
        alert('Se registró exitosamente')
        limpiarHTML()
        obtenerEmpleados()
        formulario.reset()
        limpiarObjeto()
    }
}

// Función asíncrona para editar un empleado
async function editarEmpleado() {
    objEmpleado.usuario = usuarioInput.value
    objEmpleado.contrasena = contrasenaInput.value
    objEmpleado.email = emailInput.value

    const res = await fetch(urlEditarUsuario, {
        method: 'POST',
        body: JSON.stringify(objEmpleado)
    })
    .then(respuesta => respuesta.json())
    .then(data => data)
    .catch(error => alert(error))

    if(res.msg === 'OK')  {
        alert('Se actualizó correctamente')

        limpiarHTML()
        obtenerEmpleados()
        formulario.reset()
        limpiarObjeto()
    }

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false
}

// Función asíncrona para eliminar un empleado
async function eliminarEmpleado(id) {
    const res = await fetch(urlBorrarUsuario, {
        method: 'POST',
        body: JSON.stringify({'idUsuario': id})
    })
    .then(respuesta => respuesta.json())
    .then(data => data)
    .catch(error => alert(error))
	
    if(res.msg === 'OK') {
        alert('Se borró exitosamente')

        limpiarHTML()
        obtenerEmpleados()
        limpiarObjeto()
    }
}

// Función para cargar los datos de un empleado en el formulario para su edición
function cargarEmpleado(empleado) {
    const {idUsuario, usuario, contrasena, email} = empleado

    usuarioInput.value = usuario
    contrasenaInput.value = contrasena
    emailInput.value = email

    objEmpleado.idUsuario = idUsuario

    formulario.querySelector('button[type="submit"').textContent = 'Actualizar'
    editando = true
}

// Función para limpiar el contenido HTML de la lista de empleados
function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild)
    }
}

// Función para limpiar el objeto empleado
function limpiarObjeto() {
    objEmpleado.idUsuario = ''
    objEmpleado.usuario = ''
    objEmpleado.contrasena = ''
    objEmpleado.email = ''
}