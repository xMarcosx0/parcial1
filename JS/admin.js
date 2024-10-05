const showOption = option => {
    document.getElementById('option1').style.display = 'none';
    document.getElementById('option2').style.display = 'none';
    document.getElementById('option3').style.display = 'none';

    if (option === 1) {
        document.getElementById('option1').style.display = 'block';
    } else if (option === 2) {
        document.getElementById('option2').style.display = 'block';
    } else if (option === 3) {
        document.getElementById('option3').style.display = 'block';
    }
};

const checkLogin = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'index.html';
    } else {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Bienvenid@, ${loggedInUser.username}`;
    }
};


checkLogin();
const formplantas = (event) => {
    event.preventDefault();
    let estado;
    let idPlanta = document.getElementById('id_planta').value.trim();
    let nombre = document.getElementById('nombre').value.trim();
    let categoria = document.getElementById('categoria').value;
    let semila = document.getElementById('semilla');
    let brote = document.getElementById('brote');
    let madura = document.getElementById('madura');
    let cuidados = document.getElementById('cuidados').value.trim();
    const cantidad = document.getElementById("cantidad").value.trim()

    if (semila.checked) {
        estado = semila.value;
    } else if (brote.checked) {
        estado = brote.value;
    } else if (madura.checked) {
        estado = madura.value;
    }
    if(!idPlanta || !nombre || !categoria || estado===null || !cuidados || !cantidad ){
        alert("Todos los campos deben ser completados")
    }else{
        let plantas={
            id_planta:idPlanta,
            nombre:nombre,
            categoria:categoria,
            estado:estado,  
            cuidados:cuidados,
            cantidad:cantidad

        }
        localStorage.setItem("plantas", JSON.stringify(plantas))
        alert("Datos enviados")
        formularioplanta.reset()
        let info_plantas = JSON.parse(localStorage.getItem("plantas"))
        let campodato = document.getElementById("datos")
        campodato.innerHTML = `
        <div>
            DATOS DEL FORMULARIO:
            Id Planta:${info_plantas.id_planta}<br>
            Nombre:${info_plantas.nombre}<br>
            Categoria:${info_plantas.categoria}<br>
            Cantidad:${info.cantidad}<br>
            Estado:${info_plantas.estado}<br>
            Cuidados:${info_plantas.cuidados}<br>
        <div/>`
    }

}
function cargarInventario() {
    fetch('../JSON/inventario.json')
        .then(respuesta => respuesta.json())
        .then(fechas => {
            const tabla = document.querySelector('#inventario tbody');
            tabla.innerHTML = ''; // Limpiar el contenedor de productos

            fechas.forEach(f => {
                const fila = document.createElement('tr');
                fila.className = '';
                fila.innerHTML = `
                    <td>${f.id}</td>
                    <td>${f.nombre}</td>
                    <td>${f.categoria}</td>
                    <td>${f.cantidadDisponible}</td>
                    <td>${f.stockMinimo}</td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.log('Hubo un error: ' + error.message));
}
cargarInventario()
const formactualizar=(event)=>{
    event.preventDefault()

    const cantidad = document.getElementById("nuevaCantidad").value.trim()
    const id_planta = document.getElementById("plantaID").value.trim()


    if (!cantidad || !id_planta)  {
        alert("Todos los campos deben ser completados ")
    }else{
        let update={
            id_planta:id_planta,
            cantidad: cantidad
            
        }
    localStorage.setItem("update",JSON.stringify(update))
    alert("Datos enviados")
    formularioActualizar.reset()
    let update_inv = JSON.parse(localStorage.getItem("update"))
    console.log(update)
    let campodato = document.getElementById("resultado")
    campodato.innerHTML = `
    <div>
        DATOS ACTUALIZADOS:
        <p>Planta ID: ${update_inv.id_planta}</p>
        <p>Cantidad: ${update_inv.cantidad}</p>
    <div/>`
    }


}
var formularioplanta=document.getElementById("formP")
var formularioActualizar=document.getElementById("actualizarInventarioForm")
formularioplanta.addEventListener("submit",formplantas)
formularioActualizar.addEventListener("submit",formactualizar)