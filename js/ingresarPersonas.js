/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

// const Url =
//   "https://minticgrupo4.herokuapp.com/personas/agregarCargo";
const Url = 'http://127.0.0.1:8000/personas/agregarPersona';


function agruparData(event_) {
  event_.preventDefault(); //para evitar que el evento formulario se ejecute como es.

  const tipo_documento = document.registro.tipo_documento.value;
  const num_documento = document.registro.num_documento.value;
  const nombres = document.registro.nombres.value;
  const apellidos = document.registro.apellidos.value;

  const cod_cargo_id = document.registro.cod_cargo_id.value;
  const direccion = document.registro.direccion.value;
  const tel_movil = document.registro.tel_movil.value;
  const des_municipio = document.registro.des_municipio.value;
  const email = document.registro.email.value;
  const fec_nacimiento = document.registro.fec_nacimiento.value;
  const fec_ingreso = document.registro.fec_ingreso.value;
  const cod_estado_per_id = document.registro.cod_estado_per_id.value;

  //Objeto js
  const data = {
    tipo_documento      : tipo_documento,
    num_documento       : num_documento,
    nombres             : nombres,
    apellidos           : apellidos,
    cod_cargo           : cod_cargo_id,
    direccion           : direccion,
    tel_movil           : tel_movil,
    des_municipio       : des_municipio,
    email               : email,
    fec_nacimiento      : fec_nacimiento,
    fec_ingreso         : fec_ingreso,
    cod_estado_per      : cod_estado_per_id,
  };
  console.log(data);
  //convertir objeto js a json
  const dataSend = JSON.stringify(data);
  console.log("-------------------- JSON ------------------------");
  console.log(dataSend);
  crearEntrada(dataSend);
}

function crearEntrada(data) {
  console.log(data);
  fetch(Url, {
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
        alert("Datos guardados correctamente");
        return response.text();
      } else {
        alert("Error al guardar los datos");
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
