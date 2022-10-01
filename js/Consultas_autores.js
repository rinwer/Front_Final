/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

autores = [];
let bottomBuscar = document.getElementById("bottomBuscarAutor");

const getlibroUrl = "https://minticgrupo4.herokuapp.com/libros/consultarAutor/";
//let getAutorUrl = "http://127.0.0.1:8000/libros/consultarAutor/";

function clickBuscarAutor() {
  getAutor();
}

function getAutor() {
  //Capturar la url
  //const url = new URL(window.location.href);
  //const id = url.searchParams.get("cod_libro");
  const autor = document.formCOnsulta.des_autor.value;
  console.log(autor);
  fetch(getAutorUrl + autor)
    .then((response) => {
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
      autores = JSON.parse(data);
      procesarAutores();
    })
    .catch((err) => {
      console.log("Catch: " + err.message);
    });
}
function procesarAutores() {
  console.log(autores.length);
  document.getElementById("main").innerHTML = "";
  const tabla = document.createElement("table");
  const hileraHeader = document.createElement("tr");

  for (let k in autores[0]) {
    const celdaHeder = document.createElement("td");
    const textoHeaders = document.createTextNode(k);
    celdaHeder.appendChild(textoHeaders);
    hileraHeader.appendChild(celdaHeder);
  }
  tabla.appendChild(hileraHeader);
  for (let i = 0; i < autores.length; i++) {
    const hilera = document.createElement("tr");
    for (let j in autores[i]) {
      const celda = document.createElement("td");
      const textoCelda = document.createTextNode(autores[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tabla.appendChild(hilera);
  }
  if (document.getElementById("contenido") != null) {
    document.getElementById("contenido").remove();
  }
  if (autores.length == 0) {
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

bottomBuscar.addEventListener("click", clickBuscarAutor);
