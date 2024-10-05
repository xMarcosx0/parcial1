// Mostrar la tabla solo cuando se selecciona la opción
const showOption = option => {
    document.getElementById('option1').style.display = 'none';
    document.getElementById('option2').style.display = 'none';
    document.getElementById('option3').style.display = 'none';

    if (option === 1) {
        document.getElementById('option1').style.display = 'block';
    } else if (option === 2) {
        document.getElementById('option2').style.display = 'block';
        cargarPedidos(); // Cargar pedidos cuando se muestra la opción 2
    } else if (option === 3) {
        document.getElementById('option3').style.display = 'block';
        cargarEventos(); // Cargar eventos cuando se muestra la opción 3
    }
};

// Cargar información del JSON y mostrar en la tabla
const cargarEventos = () => {
    fetch('../JSON/eventos.json') // Ruta hacia el archivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const tabla = document.getElementById('eventosTabla').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
            data.forEach(evento => {
                const fila = tabla.insertRow();
                fila.innerHTML = `
                    <td>${evento.evento}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.ubicacion}</td>
                    <td>${evento.descripcion}</td>
                `;
            });
        })
        .catch(error => console.error('Error cargando el archivo JSON:', error));
};

// Obtener el formulario y agregar un event listener
document.getElementById('floralForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const color = document.getElementById('color').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    // Crear un objeto de arreglo floral
    const nuevoArreglo = {
        nombre,
        color,
        precio: parseFloat(precio),
        stock: parseInt(stock)
    };

    // Obtener los arreglos florales del LocalStorage (si ya existen)
    const arreglosFloral = JSON.parse(localStorage.getItem('arreglosFloral')) || [];

    // Agregar el nuevo arreglo floral a la lista
    arreglosFloral.push(nuevoArreglo);

    // Guardar la lista actualizada en el LocalStorage
    localStorage.setItem('arreglosFloral', JSON.stringify(arreglosFloral));

    // Limpiar el formulario
    e.target.reset();

    alert('Arreglo floral agregado correctamente!');
    cargarPedidos(); // Actualizar la bandeja de pedidos después de agregar
});

// Bandeja de pedidos hechos por el cliente
const cargarPedidos = () => {
    const arreglosFloral = JSON.parse(localStorage.getItem('arreglosFloral')) || [];
    const pedidosBandeja = document.getElementById('pedidosBandeja');
    
    pedidosBandeja.innerHTML = ''; // Limpiar la bandeja de pedidos antes de agregar

    arreglosFloral.forEach(arreglo => {
        const divPedido = document.createElement('div');
        divPedido.classList.add('pedido-item');
        divPedido.innerHTML = `
            <p><strong>Nombre:</strong> ${arreglo.nombre}</p>
            <p><strong>Color:</strong> ${arreglo.color}</p>
            <p><strong>Precio:</strong> $${arreglo.precio.toFixed(2)}</p>
            <p><strong>Cantidad:</strong> ${arreglo.stock}</p>
        `;
        pedidosBandeja.appendChild(divPedido);
    });
};

// Check login status
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
cargarPedidos(); // Cargar la bandeja de pedidos al inicio 
