/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

const crearPluUrl = "https://minticgrupo4.herokuapp.com/libros/agregarLibroPlu";
//const crearPluUrl = "http://127.0.0.1:8000//libros/agregarLibroPlu";

function agruparData(event_) {
  event_.preventDefault(); //para evitar que el evento formulario se ejecute como es.
  const cod_libro = document.registro.cod_libro.value;
  const plu = document.registro.plu.value;
  const cant_disponible_plu = document.registro.cant_disponible_plu.value;

  //Objeto js
  const data = {
    cod_libro: cod_libro,
    plu: plu,
    cant_disponible_plu: cant_disponible_plu,
  };

  //convertir objeto js a json
  const dataSend = JSON.stringify(data);
  crearPlu(dataSend);
}

function crearPlu(data) {
  console.log(data);
  fetch(crearPluUrl, {
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
  document.getElementById("cod_libro").value = "";
  document.getElementById("plu").value = "";
  document.getElementById("cant_disponible_plu").value = "";
}
document.registro.addEventListener("submit", agruparData);
