/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

libro = [];
let bottomBuscar = document.getElementById("bottomBuscarLibro");

//const getlibroUrl = "https://minticgrupo4.herokuapp.com/libros/consultarLibro/";
//const getlibrosUrl = "https://minticgrupo4.herokuapp.com/libros/consultarLibro/";
let getlibroUrl;
let getlibrosUrl;

function clickBuscarLibro() {
  const id = document.formCOnsulta.nombreLibro.value;
  console.log(id);
  if (id > 0) {
    getlibroUrl = "http://127.0.0.1:8000/libros/consultarLibro/";
    getlibro();
  } else {
    getlibrosUrl = "http://127.0.0.1:8000/libros/consultarLibros";
    getlibros();
  }
}

function getlibro() {
  //Capturar la url y
  //const url = new URL(window.location.href);
  //const id = url.searchParams.get("cod_libro");
  const idLibro = document.formCOnsulta.nombreLibro.value;

  fetch(getlibroUrl + idLibro)
    .then((response) => {
      console.log(response.ok);
      if (response.ok || response.status == 400) {
        return response.text();
      } else {
        throw new Error(response.status);
      }
    })
    //recibimos un json en data
    .then((data) => {
      if (data.includes("No existe libro")) {
        funcionError(data);
      }
      //convertir objeto del back en objecto json.
      libro = JSON.parse(data);
      procesarLibro(libro);
    })
    .catch((err) => {
      console.log("Catch: " + err.message);
    });
}

function procesarLibro(dataLibro) {
  //cargar vació al contenedor.
  document.getElementById("main").innerHTML = "";
  const tabla = document.createElement("table");
  const hileraHeader = document.createElement("tr");
  const hilera = document.createElement("tr");

  //Para varios libros.
  if (dataLibro.length > 0) {
    //para un solo libro.
  } else {
    for (let k in dataLibro) {
      const celdaHeder = document.createElement("td");
      const textoHeaders = document.createTextNode(k);
      celdaHeder.appendChild(textoHeaders);
      hileraHeader.appendChild(celdaHeder);
    }
    tabla.appendChild(hileraHeader);

    for (let k in dataLibro) {
      const celda = document.createElement("td");
      const textoCelda = document.createTextNode(dataLibro[k]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tabla.appendChild(hilera);
  }
  if (document.getElementById("contenido") != null) {
    document.getElementById("contenido").remove();
  }
  const info = document.getElementById("main");
  info.appendChild(tabla);
}

function getlibros() {
  fetch(getlibrosUrl)
    .then((response) => {
      console.log(response.status);
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      //convertir objeto del back en objecto json.
      libros = JSON.parse(data);
      procesarLibros();
    })
    .catch((err) => {
      console.error("ERROR: ", err);
    });
}

function procesarLibros() {
  document.getElementById("main").innerHTML = "";
  const tabla = document.createElement("table");
  const hileraHeader = document.createElement("tr");

  for (let k in libros[0]) {
    const celdaHeder = document.createElement("td");
    const textoHeaders = document.createTextNode(k);
    celdaHeder.appendChild(textoHeaders);
    hileraHeader.appendChild(celdaHeder);
  }
  tabla.appendChild(hileraHeader);
  for (let i = 0; i < libros.length; i++) {
    const hilera = document.createElement("tr");
    for (let j in libros[i]) {
      const celda = document.createElement("td");
      const textoCelda = document.createTextNode(libros[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tabla.appendChild(hilera);
  }
  if (document.getElementById("contenido") != null) {
    document.getElementById("contenido").remove();
  }
  const info = document.getElementById("main");
  info.appendChild(tabla);
}

function funcionError(err) {
  if (err) {
    document.getElementById("main").innerHTML = `
    <h2>${err}</h2>
    `;
  }
}

bottomBuscar.addEventListener("click", clickBuscarLibro);
