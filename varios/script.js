/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

libros = [];

const getlibrosUrl =
  "https://minticgrupo4.herokuapp.com/libros/consultarLibros";

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
      libros = JSON.parse(data);
      procesarLibros();
    })
    .catch((err) => {
      console.error("ERROR: ", err.message);
    });
}

function procesarLibros() {
  const divs = [];
  libros.forEach((libro) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Código Libro:${libro.cod_libro}</h3>
    <h3>Título Libro:${libro.tit_libro}</h3>
    <h3>Código Autor:${libro.cod_autor}</h3>
    <h3>Código Editorial:${libro.cod_editorial_id}</h3>
    <h3>Año:${libro.anio}</h3>
    <h3>Tema:${libro.tema}</h3>
    <h3>Cantidad PLU:${libro.cant_plu}</h3>
    <h3>Cantidad Disponible:${libro.can_disponible}</h3>
    <h3>Descripción Editorial:${libro.des_editorial}</h3>
    <h3>Descripción Autor:${libro.des_autor}</h3>
    `;
    divs.push(div);
  });
  document.getElementById("contenido").remove();
  const info = document.getElementById("main");
  divs.forEach((div) => info.appendChild(div));
}

document.addEventListener("DOMContentLoaded", getlibros);
