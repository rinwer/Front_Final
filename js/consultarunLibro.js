/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

libros = [];
let bottomBuscar = document.getElementById("bottomBuscarLibro");

const getlibroUrl =
  "https://minticgrupo4.herokuapp.com/libros/consultarLibroNombre/";
//let getlibroUrl = "http://127.0.0.1:8000/libros/consultarLibroNombre/";

function clickBuscarLibro() {
  getlibro();
}

function getlibro() {
  //Capturar la url
  //const url = new URL(window.location.href);
  //const id = url.searchParams.get("cod_libro");
  const titLibro = document.formCOnsulta.nombreLibro.value;

  fetch(getlibroUrl + titLibro)
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
      libros = JSON.parse(data);
      procesarLibros();
    })
    .catch((err) => {
      console.log("Catch: " + err.message);
    });
}
function procesarLibros() {
  console.log(libros);
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
  if (libros.length == 0) {
    document.getElementById("main").innerHTML = `
    <h2>No existe coincidencia. Intente buscar de nuevo</h2>
    `;
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
