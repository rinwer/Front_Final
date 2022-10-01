/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

//const crearlibroUrl = "https://minticgrupo4.herokuapp.com/libros/agregarEditorial";
const crearlibroUrl = "http://127.0.0.1:8000//libros/agregarEditorial";

function agruparData(event_) {
  event_.preventDefault(); //para evitar que el evento formulario se ejecute como es.
  const cod_editorial = document.registro.cod_editorial.value;
  const des_editorial = document.registro.des_editorial.value;

  //Objeto js
  const data = {
    cod_editorial: cod_editorial,
    des_editorial: des_editorial,
  };

  //convertir objeto js a json
  const dataSend = JSON.stringify(data);
  crearlibro(dataSend);
}

function crearlibro(data) {
  console.log(data);
  fetch(crearlibroUrl, {
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
      console.log(data);
      alert("Registro ok");
    })
    .catch((err) => {
      console.error("ERROR: ", err.message);
    });
}

document.registro.addEventListener("submit", agruparData);
