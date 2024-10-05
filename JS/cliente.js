(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'index.html';
    } else {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Bienvenid@, ${loggedInUser.username}`;
    }
})();

const showOption = option => {
    document.getElementById('option1').style.display = 'none';
    document.getElementById('option2').style.display = 'none';
    document.getElementById('option3').style.display = 'none';
    document.getElementById(`option${option}`).style.display = 'block';
};

// Función para cargar las plantas desde el archivo JSON
document.addEventListener('DOMContentLoaded', () => {
    fetch('../JSON/plants.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#plantsTable tbody');
            tableBody.innerHTML = '';
            data.forEach(plant => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${plant.nombre}</td>
                    <td>${plant.color}</td>
                    <td>$${plant.precio.toFixed(2)}</td>
                `;
                tableBody.appendChild(row);
            });
        });
});

// Función para cargar los arreglos florales desde LocalStorage
const mostrarArreglos = () => {
    const contenedorProductos = document.getElementById('productos');
    const arreglosFloral = JSON.parse(localStorage.getItem('arreglosFloral')) || [];

    contenedorProductos.innerHTML = '';

    arreglosFloral.forEach(arreglo => {
        const productoHTML = `
            <div class="arreglo-item">
                <h3>${arreglo.nombre}</h3>
                <p>Color: ${arreglo.color}</p>
                <p>Precio: $${arreglo.precio.toFixed(2)}</p>
                <p>Disponibles: ${arreglo.stock}</p>
                <button onclick="comprarArreglo('${arreglo.nombre}')">Comprar</button>
            </div>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });
};

// Función para comprar un arreglo floral
const comprarArreglo = (nombreArreglo) => {
    let arreglosFloral = JSON.parse(localStorage.getItem('arreglosFloral')) || [];

    const arreglo = arreglosFloral.find(a => a.nombre === nombreArreglo);
    if (arreglo && arreglo.stock > 0) {
        arreglo.stock -= 1;

        localStorage.setItem('arreglosFloral', JSON.stringify(arreglosFloral));

        alert(`Has comprado el arreglo floral: ${nombreArreglo}`);
    } else {
        alert('Este arreglo floral está agotado.');
    }

    mostrarArreglos(); // Cambia a mostrarArreglos en vez de cargarArreglosFlorales
};

// Llama a mostrarArreglos después de cargar la página
document.addEventListener('DOMContentLoaded', mostrarArreglos);

// Formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const category = document.getElementById("category").value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !category || !contactMethod || !message) {
        alert("Todos los campos deben ser completados");
        return;
    }

    const datos = {
        nombre: name,
        correo: email,
        telefono: phone,
        categoria: category,
        contacto: contactMethod,
        mensaje: message,
    };

    localStorage.setItem("info", JSON.stringify(datos));
    alert("Datos enviados");

    const info = JSON.parse(localStorage.getItem("info"));
    document.getElementById("datos").innerHTML = `
        <div>
            DATOS DEL FORMULARIO:<br>
            Nombre: ${info.nombre}<br>
            Correo: ${info.correo}<br>
            Teléfono: ${info.telefono}<br>
            Tipo de consulta: ${info.categoria}<br>
            Método de contacto: ${info.contacto}<br>
            Mensaje: ${info.mensaje}<br>
        </div>
    `;
});
