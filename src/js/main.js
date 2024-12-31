window.addEventListener("load", () => {
  showServers();
  showSubscriptions();
  //Añadir funcionalidad al botón de descubrir
  document.getElementById("discovery").addEventListener("click", () => {
    showServers();
  });

  //Añadir evento para cuando se cree un servidor
  document.querySelector(".create-server > form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //TODO (Hacer petición para crear un nuevo servidor)
    var request = new XMLHttpRequest();
    request.addEventListener("load", (e) => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //Datos de la respuesta en formato JSON
          const item = JSON.parse(request.responseText);
          //Añadir el nuevo servidor al DOM
          const servers = document.querySelector(".servers > .list");
          const server = document.createElement("div");
          server.classList.add("server");
          server.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <span>${item.channels.length}</span>
      `;
          server.addEventListener("click", () => {
            showChannels(item);
          });
          servers.children[1].after(server);
          //Cerrar el modal
          document.querySelector('[data-toggle="dismiss-modal"][data-target="#add-server-modal"]').click();
        } else {
          //Error al procesar la petición
          console.log(request.responseText);
        }
      }
    });
    request.open("POST", `http://www.example.org/servers/create`);
    request.send(data);
  });

  //Añadir evento para cuando se cree un canal
  document.querySelector(".create-channel > form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //TODO (Hacer petición para crear un nuevo canal)
    var request = new XMLHttpRequest();
    request.addEventListener("load", (e) => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //Datos de la respuesta en formato JSON
          const item = JSON.parse(request.responseText);
          //Añadir el nuevo canal al DOM
          const channels = document.querySelector(".channels > .list");
          const channel = document.createElement("div");
          channel.classList.add("channel");
          channel.innerHTML = `
        <img src="${item.last.user.avatar}" alt="${item.last.user.name}" />
        <div>
          <h5>#${item.name}</h5>
          <p>${item.last.user.name}: ${item.last.content}</p>
        </div>
      `;
          channel.addEventListener("click", () => {
            showMessages(item);
          });
          channels.append(channel);
          //Cerrar el modal
          document.querySelector('[data-toggle="dismiss-modal"][data-target="#add-channel-modal"]').click();
        } else {
          //Error al procesar la petición
          console.log(request.responseText);
        }
      }
    });
    request.open("POST", `http://www.example.org/channels/create`);
    request.send(data);
  });

  //Añadir evento para cuando se actualice el perfil
  document.querySelector(".update-profile > form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //TODO (Hacer petición para actualizar el perfil)
    var request = new XMLHttpRequest();
    request.addEventListener("load", (e) => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //Datos de la respuesta en formato JSON
          const data = JSON.parse(request.responseText);

          //Cerrar el modal
          document.querySelector('[data-toggle="dismiss-modal"][data-target="#update-profile-modal"]').click();
        } else {
          //Error al procesar la petición
          console.log(request.responseText);
        }
      }
    });
    request.open("POST", `http://www.example.org/profile/update`);
    request.send(data);
  });

  //Añadir evento para cuando se cambie la contraseña
  document.querySelector(".update-password > form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //TODO (Hacer petición para actualizar la contraseña del perfil)
    var request = new XMLHttpRequest();
    request.addEventListener("load", (e) => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //Datos de la respuesta en formato JSON
          const data = JSON.parse(request.responseText);

          //Cerrar el modal
          document.querySelector('[data-toggle="dismiss-modal"][data-target="#update-password-modal"]').click();
        } else {
          //Error al procesar la petición
          console.log(request.responseText);
        }
      }
    });
    request.open("POST", `http://www.example.org/profile/password/update`);
    request.send(data);
  });

  //Añadir evento para cuando se envíe un nuevo mensaje
  document.querySelector("#send-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //TODO (Hacer petición para enviar el nuevo mensaje)
    var request = new XMLHttpRequest();
    request.addEventListener("load", (e) => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          //Datos de la respuesta en formato JSON
          const item = JSON.parse(request.responseText);
          //Añadir el mensaje al DOM
          const messages = document.querySelector(".messages > .list");
          const message = document.createElement("div");
          message.classList.add("message");
          message.innerHTML = `
      <img src="${item.user.avatar}" alt="${item.user.name}" />
      <div>
        <small>${item.created} <br /><button class="btn-danger btn-sm">Eliminar</button></small>
        <h5>${item.user.name}</h5>
        <p>${item.content}</p>
      </div>
      `;
          messages.append(message);
        } else {
          //Error al procesar la petición
          console.log(request.responseText);
        }
      }
    });
    request.open("POST", `http://www.example.org/message/send`);
    request.send(data);
  });
});

function showSubscriptions() {
  const servers = document.querySelector(".servers > .list");
  //Listar y agregar al DOM los servidores a los que está suscrito el usuario
  //TODO (Hacer petición para obtener los mensajes del canal seleccionado)
  /*const request = new XMLHttpRequest();
  request.addEventListener("load", (e) => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        //Datos de la respuesta en formato JSON
        const data = JSON.parse(request.responseText);
        //TODO (Aquí iría el código de abajo del ciclo for)
      }
    }
  });
  request.open("GET", `http://www.example.org/servers/subscriber/userId`);
  request.send();*/

  const data = SERVERS;
  for (const item of data) {
    const server = document.createElement("div");
    server.classList.add("server");
    server.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <span>${item.channels.length}</span>
    `;
    server.addEventListener("click", () => {
      showChannels(item);
    });
    servers.children[1].after(server);
  }
}

function showServers() {
  const servers = document.querySelector(".messages > .list");
  servers.innerHTML = "<h3 style='color:#fff;margin-top:1rem'>Descubre asombrosos servidores de diferentes temáticas</h3>";
  //Listar y agregar al DOM todos los servidores
  //TODO (Hacer petición para obtener los mensajes del canal seleccionado)
  /*const request = new XMLHttpRequest();
  request.addEventListener("load", (e) => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        //Datos de la respuesta en formato JSON
        const data = JSON.parse(request.responseText);
        //TODO (Aquí iría el código de abajo del ciclo for)
      }
    }
  });
  request.open("GET", `http://www.example.org/servers`);
  request.send();*/

  const data = SERVERS;
  for (const item of data) {
    const server = document.createElement("div");
    // server.classList.add("server-lg");
    server.style.display = "inline-flex";
    server.innerHTML = `
    <div class="server-lg">
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <small>Creado el ${item.created}</small>
        <h4>${item.name}</h4>
        <p>${item.description}</p>
      </div>
      <div>
        <button class="btn-success">Suscribirse</button>
      </div>
    </div>
    `;
    server.querySelector("button").addEventListener("click", () => {
      subscribe(item);
    });
    servers.append(server);
  }
}

function showChannels(data) {
  const channels = document.querySelector(".channels > .list");
  channels.innerHTML = "";
  for (const item of data.channels) {
    const channel = document.createElement("div");
    channel.classList.add("channel");
    channel.innerHTML = `
    <img src="${item.last.user.avatar}" alt="${item.last.user.name}" />
    <div>
      <h5>#${item.name}</h5>
      <p>${item.last.user.name}: ${item.last.content}</p>
    </div>
    `;
    channel.addEventListener("click", () => {
      showMessages(item);
    });
    channels.append(channel);
  }
}

function showMessages(channel) {
  const messages = document.querySelector(".messages > .list");
  messages.innerHTML = "";
  //TODO (Hacer petición para obtener los mensajes del canal seleccionado)
  /*const request = new XMLHttpRequest();
  request.addEventListener("load", (e) => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        //Datos de la respuesta en formato JSON
        const data = JSON.parse(request.responseText);
        //TODO (Aquí iría el código de abajo del ciclo for)
      }
    }
  });
  request.open("GET", `http://www.example.org/channel/${channel.id}/messages`);
  request.send();*/

  const data = MESSAGES;
  for (const item of data) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerHTML = `
    <img src="${item.user.avatar}" alt="${item.user.name}" />
    <div>
      <small>${item.created} <br /><button class="btn-danger btn-sm">Eliminar</button></small>
      <h5>${item.user.name}</h5>
      <p>${item.content}</p>
    </div>
    `;
    messages.append(message);
  }
}
