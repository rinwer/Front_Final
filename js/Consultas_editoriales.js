/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

editoriales = [];
let bottomBuscar = document.getElementById("bottomBuscarEditorial");

const getEditorialUrl =
  "https://minticgrupo4.herokuapp.com/libros/consultarEditorial/";
//let getEditorialUrl = "http://127.0.0.1:8000/libros/consultarEditorial/";

function clickBuscarEditorial() {
  console.log("cuando se hace click");
  getEditorial();
}

function getEditorial() {
  //Capturar la url
  //const url = new URL(window.location.href);
  //const id = url.searchParams.get("cod_libro");
  console.log("Antes de capturar el value");
  const editorial = document.formCOnsulta.des_editorial.value;
  console.log("Editorial value: " + editorial);
  fetch(getEditorialUrl + editorial)
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
      editoriales = JSON.parse(data);
      procesarEditorial();
    })
    .catch((err) => {
      console.log("Catch: " + err.message);
    });
}
function procesarEditorial() {
  document.getElementById("main").innerHTML = "";
  const tabla = document.createElement("table");
  const hileraHeader = document.createElement("tr");

  for (let k in editoriales[0]) {
    const celdaHeder = document.createElement("td");
    const textoHeaders = document.createTextNode(k);
    celdaHeder.appendChild(textoHeaders);
    hileraHeader.appendChild(celdaHeder);
  }
  tabla.appendChild(hileraHeader);
  for (let i = 0; i < editoriales.length; i++) {
    const hilera = document.createElement("tr");
    for (let j in editoriales[i]) {
      const celda = document.createElement("td");
      const textoCelda = document.createTextNode(editoriales[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tabla.appendChild(hilera);
  }
  if (document.getElementById("contenido") != null) {
    document.getElementById("contenido").remove();
  }
  if (editoriales.length == 0) {
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

bottomBuscar.addEventListener("click", clickBuscarEditorial);
