/*function hizoClick() {
  alert("Sending information");
}

let bottom = document.getElementById("bottom");
let text = document.getElementById("modificarText");

bottom.addEventListener("click", hizoClick);
*/

// const Url =
//   "https://minticgrupo4.herokuapp.com/personas/agregarCargo";
const Url_Id_Usuario = 'http://127.0.0.1:8000/personas/existeUsuario';
const Url = 'http://127.0.0.1:8000/personas/agregarPersona';


function agruparData(event_) {
  event_.preventDefault(); //para evitar que el evento formulario se ejecute como es.

  const cod_persona_id = consultarId;
  const login = document.registro.email.value;
  const clave = document.registro.clave.value;
  const fec_cambio = document.registro.apellidos.value;

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
    cod_cargo_id        : cod_cargo_id,
    direccion           : direccion,
    tel_movil           : tel_movil,
    des_municipio       : des_municipio,
    email               : email,
    fec_nacimiento      : fec_nacimiento,
    fec_ingreso         : fec_ingreso,
    cod_estado_per_id   : cod_estado_per_id,
  };

  //convertir objeto js a json
  const dataSend = JSON.stringify(data);
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

function consultarId(){
    const TipoDocumento = document.registro.tipo_documento.value;
    const NumDocumento = document.registro.num_documento.value;

    fetch(Url_Id_Usuario + TipoDocumento + NumDocumento)
        .then((response) => {
        console.log(response.ok);
        if (response.ok || response.status == 400) {
            console.log("---------------------------")
            console.log("Se LOGRO")
            return response.text();
        } else {
            throw new Error(response.status);
        }
        })
        //recibimos un json en data
        .then((data) => {
            if (data.includes("No existe persona")) {
                funcionError(data);
            }
            //convertir objeto del back en objecto json.
            personas = JSON.parse(data);
            console.log("Llamando a procesar");
            console.log(personas);
            // procesar();
        })
        .catch((err) => {
        console.log("Catch: " + err.message);
        });
}

function procesar() {
    document.getElementById("main").innerHTML = "";
    const tabla = document.createElement("table");
    const hileraHeader = document.createElement("tr");
  
    for (let k in personas[0]) {
      const celdaHeder = document.createElement("td");
      const textoHeaders = document.createTextNode(k);
      celdaHeder.appendChild(textoHeaders);
      hileraHeader.appendChild(celdaHeder);
    }
    tabla.appendChild(hileraHeader);
    for (let i = 0; i < personas.length; i++) {
      const hilera = document.createElement("tr");
      for (let j in personas[i]) {
        const celda = document.createElement("td");
        const textoCelda = document.createTextNode(personas[i][j]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
      tabla.appendChild(hilera);
    }
    // if (document.getElementById("contenido") != null) {
    //   document.getElementById("contenido").remove();
    // }
    if (personas.length == 0) {
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
document.registro.addEventListener("submit", consultarId);