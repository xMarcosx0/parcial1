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

const loginForm = document.getElementById('loginForm');

const fetchUsers = async () => {
    try {
        const response = await fetch('JSON/users.json');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error al cargar el archivo users.json:', error);
        return [];
    }
};

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = await fetchUsers();
    let userFound = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            userFound = users[i];
            break;
        }
    }

    if (userFound) {
        localStorage.setItem('loggedInUser', JSON.stringify(userFound));
        switch (userFound.role) {
            case 'admin':
                window.location.href = 'HTML/admin.html';
                break;
            case 'florista':
                window.location.href = 'HTML/flor.html';
                break;
            case 'cliente':
                window.location.href = 'HTML/client.html';
                break;
            default:
                alert('Rol no reconocido');
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
