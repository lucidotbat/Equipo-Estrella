document.addEventListener("DOMContentLoaded", function() {
    let bienvenidoElement = document.getElementById("bienvenido");

    if(sessionStorage.length == 1){
        bienvenidoElement.innerHTML = '<h2>¡Bienvenid@ ' + sessionStorage.getItem('user') + '!</h2>';
    }
    let users = [];

    function loadUsuarios(callback) {
        const url = 'http://localhost:3000/api/usuarios';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function() {
            if (xhr.status == 200) {
                users = JSON.parse(xhr.responseText);
                callback(users); // Llamamos a la función de devolución de llamada con los datos cargados
            }
        };
    }
    function handleRegister(Usuario, Password, Correo){
        const xhr2 = new XMLHttpRequest();
        const url2 = 'http://localhost:3000/registrar';

        let data = JSON.stringify({
            usuario: Usuario,
            password: Password,
            correo: Correo
        });


        xhr2.open('POST', url2);
        xhr2.setRequestHeader('Content-Type', 'application/json');

        xhr2.onload = function() {
            if (xhr2.status >= 200 && xhr2.status < 300) {
                console.log('Request successful');
                const response = JSON.parse(xhr2.responseText);
                console.log('Response:', response);
                alert('Consulta realizada con éxito'); // Alerta al completar la consulta con éxito
            } else {
                console.error('Request failed:', xhr2.status);
            }
        };

        xhr2.onerror = function() {
            console.error('Request error');
        };

        xhr2.send(data);

    }
    function handleLoadedUsers(users) {
        console.log(users);

        // Agregar event listener al botón de registro
        const btnRegistrarse = document.getElementById("btnRegistrarse");
        btnRegistrarse.addEventListener("click", function(event) {
            event.preventDefault();

            // Recuperar los valores de los campos de nombre, correo y contraseña
            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const pass = document.getElementById("pass").value;

            // Crear un objeto con los datos del usuario
            const usuario = {
                nombre: nombre,
                correo: correo,
                pass: pass
            };

            let newU = false;
            for (let i = 0; i < users.length; i++) {
                console.log(usuario.nombre);
                console.log(users[i].usuario);
                if(users[i].correo == usuario.correo){
                    newU = true;
                    
                }

            }
            if(newU == false){
                handleRegister(nombre, pass, correo);
            }
            else{
                alert('Ya existe un usuario con este correo');
            }
            console.log(newU);
        



           
        });
    }


    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Evitamos que el formulario se envíe por defecto

        console.log("inside log in");
        // Recuperar los valores del usuario y la contraseña
        const user = document.getElementById("user").value;
        const pwd = document.getElementById("pwd").value;

        // Aquí puedes hacer lo que necesites con el usuario y la contraseña
        console.log("Usuario:", user);
        console.log("Contraseña:", pwd);

        let newU = false;
        let name;
        for (let i = 0; i < users.length; i++) {
            
            if(users[i].correo == user && users[i].password == pwd){
                console.log(users[i].correo);
                newU = true;
                name = users[i].usuario;
                console.log("HHUsuario:", name);
                
            }

        }
        if(newU == true){
            console.log("HUsuario:", name);
            console.log("Contraseña:", pwd);
            sessionStorage.clear();
            sessionStorage.setItem('user', name);
            bienvenidoElement.innerHTML = '<h2>¡Bienvenid@ ' + name + '!</h2>';
            alert('¡Inicio de sesión exitoso! Bienvenid@ ' + name);
          
            window.location.reload();
        }
        else{
            alert('Usario contraseña incorrectas');
        }

    });

    const logoutButton = document.getElementById('logoutButton');

    // Agregar el event listener al botón
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del botón
        
        // Limpiar la sesión y redirigir a la página de inicio
        sessionStorage.clear();
        window.location.href = "home"; // Cambia "home" por la URL de tu página de inicio
        alert('Ha salido de su cuenta');
        // Otras acciones que desees realizar al hacer clic en el botón de "Salir"
    });
    loadUsuarios(handleLoadedUsers);
});
