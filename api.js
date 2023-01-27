let container = document.querySelector(".tbody-content");

const getUsers = (url = "https://reqres.in/api/users?delay=3") => {
    let fechaCaducidad = localStorage.getItem("fechaCaducidad");
    bordeSpiner(); //Spinner
    if (Object.is(null, fechaCaducidad) || new Date().getTime() > fechaCaducidad) {
        console.log("Fetch");  
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                localStorage.setItem("users", JSON.stringify(users.data));
                localStorage.setItem("fechaCaducidad", (new Date().getTime()) + 60_000);
                insertUsers(users.data);
            })
            .catch((error) => console.log(error));
    } else {
        insertUsers(JSON.parse(localStorage.getItem("users")));
        console.log("Datos locales");
    }
};

//Impresión de "Datos Usuarios"
function insertUsers(users) {      
    container.innerHTML = "";
    localStorage.setItem("users", JSON.stringify(users));
    for (let user of users) {
        const dom = document.createElement("tr");
        dom.classList.add("table-group-divider");
        dom.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td><img src="${user.avatar}" class="rounded-circle" width="80" alt="Foto de perfil"></td>
            `
        container.appendChild(dom);
    }
}

function bordeSpiner(){
    container.innerHTML = `
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`
}
















/* const getUsers = () => {
    const url = `https://reqres.in/api/users?delay=0`;

    let fechaVieja = localStorage.getItem("date");
    if (Object.is(fechaVieja, null) || (new Date().getTime() - fechaVieja > 60_000)) {
        console.log("fetch");

        fetch(url)
            .then((response) => response.json())
            .then((users) => {
                localStorage.setItem("date", new Date().getTime());
                localStorage.setItem("users", JSON.stringify(users.data));
                showData(users.data);
            })
            .catch((error) => console.log(error));
    }
    else {
        console.log("localStorage");
        showData(JSON.parse(localStorage.getItem("users")));
    }
};

showData = (users) => {
    let readUsers = "";
    for (let user of users) {
        readUsers += `<tr>
                        <th>${user.id}</th>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                        <td><img src="${user.avatar}"></td>
                    </tr>`;
    }
    document.getElementById("leerUsuarios").innerHTML = readUsers;
};
 */


