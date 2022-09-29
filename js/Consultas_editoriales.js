/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

editoriales = [];
let bottomBuscar = document.getElementById("bottomBuscarEditorial");

const geteditorialUrl =
  "https://minticgrupo4.herokuapp.com/libros/consultar_editoriales";

function clickBuscarEditorial() {
  geteditoriales();
}
function geteditoriales() {
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
      editoriales = JSON.parse(data);
      procesareditoriales();
    })
    .catch((err) => {
      console.error("ERROR: ", err.message);
    });
}

function procesareditoriales() {
  const tabla = document.createElement("table");
  const hileraHeader = document.createElement("tr");

  for (let k in editoriales[0]) {
    const celdaHeder = document.createElement("td");
    const textoHeaders = document.createTextNode(k);
    celdaHeder.appendChild(textoHeaders);
    hileraHeader.appendChild(celdaHeder);
  }
  tabla.appendChild(hileraHeader);
  for (let i = 0; i < libros.length; i++) {
    const hilera = document.createElement("tr");
    for (let j in editoriales[i]) {
      const celda = document.createElement("td");
      const textoCelda = document.createTextNode(editoriales[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tabla.appendChild(hilera);
  }
  document.getElementById("contenido").remove();
  const info = document.getElementById("main");
  info.appendChild(tabla);
}

bottomBuscar.addEventListener("click", clickBuscarEditorial);
