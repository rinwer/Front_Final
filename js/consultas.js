/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

libros = [];
let bottomBuscar = document.getElementById("bottomBuscarLibro");

const getlibrosUrl =
  "https://minticgrupo4.herokuapp.com/libros/consultarLibros";

function clickBuscarLibro() {
  getlibros();
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
      console.error("ERROR: ", err.message);
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

bottomBuscar.addEventListener("click", clickBuscarLibro);
