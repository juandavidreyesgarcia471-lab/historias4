
let productos = [];


const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const btnApi = document.getElementById("btnApi");



// CARGAR LOCAL STORAGE
window.addEventListener("DOMContentLoaded", () => {

    const datosGuardados =
    localStorage.getItem("productos");

    if(datosGuardados){

        productos =
        JSON.parse(datosGuardados);

        renderizarProductos();

    }

});


// AGREGAR PRODUCTO
formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre =
    nombreInput.value.trim();

    const precio =
    precioInput.value.trim();


    // VALIDACIONES
    if(nombre === "" || precio === ""){

        mensaje.textContent =
        "Todos los campos son obligatorios";

        mensaje.style.color = "red";

        return;

    }


    // CREAR OBJETO
    const producto = {

        id: Date.now(),

        nombre: nombre,

        precio: precio

    };


    // AGREGAR AL ARREGLO
    productos.push(producto);


    // GUARDAR LOCAL STORAGE
    guardarLocalStorage();


    // MOSTRAR EN EL DOM
    renderizarProductos();


    // LIMPIAR INPUTS
    nombreInput.value = "";
    precioInput.value = "";


    // MENSAJE
    mensaje.textContent =
    "Producto agregado correctamente";
    mensaje.style.color = "green";


    // ENVIAR A API
    agregarProductoAPI(producto);

});



// RENDERIZAR PRODUCTOS
function renderizarProductos(){

    lista.innerHTML = "";

    productos.forEach((producto) => {

        const li =
        document.createElement("li");


        li.textContent =
        `${producto.nombre} - $${producto.precio}`;


        // BOTON ELIMINAR

        const btnEliminar =
        document.createElement("button");

        btnEliminar.textContent =
        "Eliminar";


        btnEliminar.addEventListener("click", () => {

            eliminarProducto(producto.id);

        });


        li.appendChild(btnEliminar);

        lista.appendChild(li);

    });

}




// ELIMINAR PRODUCTO
function eliminarProducto(id){

    productos = productos.filter((producto) => {

        return producto.id !== id;

    });

    guardarLocalStorage();

    renderizarProductos();

    eliminarProductoAPI(id);

}




// LOCAL STORAGE
function guardarLocalStorage(){

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}



// API
const URL =
"http://localhost:3000/productos";




// GET
async function obtenerProductosAPI(){

    try{

        const respuesta =
        await fetch(URL);

        const datos =
        await respuesta.json();

        console.log("GET:", datos);

    }catch(error){

        console.log(
            "Error GET:",
            error
        );

    }

}




// POST
async function agregarProductoAPI(producto){

    try{

        const respuesta =
        await fetch(URL, {

            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify(producto)

        });

        const datos =
        await respuesta.json();

        console.log("POST:", datos);

    }catch(error){

        console.log(
            "Error POST:",
            error
        );

    }

}



// DELETE
async function eliminarProductoAPI(id){

    try{

        await fetch(`${URL}/${id}`, {

            method: "DELETE"

        });

        console.log(
            "Producto eliminado de API"
        );

    }catch(error){

        console.log(
            "Error DELETE:",
            error
        );

    }

}



// BOTON API
btnApi.addEventListener("click", () => {

    obtenerProductosAPI();

});


