/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

// const Url =
//   "https://minticgrupo4.herokuapp.com/personas/agregarCargo";
const Url = 'http://127.0.0.1:8000/personas/modificarCargo/';


function agruparData(event_) {
  event_.preventDefault(); //para evitar que el evento formulario se ejecute como es.

  const cod_cargo = document.registro.cod_cargo.value;
  const des_cargo = document.registro.des_cargo.value;
  const cod_estado = document.registro.cod_estado.value;
  const sw_empleado = document.registro.sw_empleado.value;
  

  //Objeto js
  const data = {
    
    des_cargo: des_cargo,
    cod_estado: cod_estado,
    sw_empleado: sw_empleado,
  };

  //convertir objeto js a json
  const dataSend = JSON.stringify(data);
  crearEntrada(dataSend, cod_cargo);
}

function crearEntrada(data, codCargo) {
  console.log(data);
  console.log("-----------------------------------------");
  console.log(codCargo);
  fetch(Url + codCargo ,{
    method: "PUT",
    headers: {
      "content-type": "text/json",
    },
    body: data,
  })
    .then((response) => {
      //console.log(response.status);
      //procesar si la promesa tiene codigo 200 y darle manejo con el else.
      if (response.ok) {
        alert("Datos modificados correctamente");
        return response.text();
      } else {
        alert("Error al modificar los datos");
        throw new Error(response.status);
      }
    })
    //si el codigo es 200 procesamos la promesa.
    .then((data) => {
      //se imprime el return del backend donde indica que el libro se ha creado satisfatoriamente.
      console.log(data);
    })
    .catch((err) => {
      console.error("ERROR: ", err.message);
    });
}

document.registro.addEventListener("submit", agruparData);
