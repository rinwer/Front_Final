/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

const Url = "https://minticgrupo4.herokuapp.com/personas/eliminarCargo/";
//const Url = 'http://127.0.0.1:8000/personas/eliminarCargo/';

function agruparData(event_) {
  event_.preventDefault(); //para evitar que el evento formulario se ejecute como es.

  const cod_cargo = document.registro.cod_cargo.value;

  crearEntrada(cod_cargo);
}

function crearEntrada(codCargo) {
  console.log(codCargo);
  fetch(Url + codCargo, {
    method: "DELETE",
    headers: {
      "content-type": "text/json",
    },
  })
    .then((response) => {
      //console.log(response.status);
      //procesar si la promesa tiene codigo 200 y darle manejo con el else.
      if (response.ok) {
        alert("Datos eliminados correctamente");
        return response.text();
      } else {
        alert("Error al eliminar los datos");
        throw new Error(response.status);
      }
    })
    //si el codigo es 200 procesamos la promesa.
    .catch((err) => {
      console.error("ERROR: ", err.message);
    });
}

document.registro.addEventListener("submit", agruparData);
