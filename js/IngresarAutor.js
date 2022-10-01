/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

const crearAutorUrl = "https://minticgrupo4.herokuapp.com/libros/agregarAutor";
//const crearAutorUrl = "http://127.0.0.1:8000//libros/agregarAutor";

function agruparData(event_) {
  event_.preventDefault(); //para evitar que el evento formulario se ejecute como es.
  const cod_autor = document.registro.cod_autor.value;
  const des_autor = document.registro.des_autor.value;

  //Objeto js
  const data = {
    cod_autor: cod_autor,
    des_autor: des_autor,
  };

  //convertir objeto js a json
  const dataSend = JSON.stringify(data);
  crearAutor(dataSend);
}

function crearAutor(data) {
  console.log(data);
  fetch(crearAutorUrl, {
    method: "POST",
    headers: {
      "content-type": "text/json",
    },
    body: data,
  })
    .then((response) => {
      //console.log(response.status);
      //procesar si la promesa tiene codigo 200 y darle manejo con el else.
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(response.status);
      }
    })
    //si el codigo es 200 procesamos la promesa.
    .then((data) => {
      //se imprime el return del backend donde indica que el libro se ha creado satisfatoriamente.
      clearCampos();
    })
    .catch((err) => {
      console.error("ERROR: ", err.message);
    });
}

function clearCampos() {
  alert("Registro ok");
  document.getElementById("cod_autor").value = "";
  document.getElementById("des_autor").value = "";
}

document.registro.addEventListener("submit", agruparData);
