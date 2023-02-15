// const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require("uuid");

//clases encargadas de trabajar la lógica de mi negocio
//para manejar tarea de forma independiente

class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

//el constructor es lo que se va a ejecutar cuando creemos una nueva instancia de nuestra tarea
//this hace referencia a la instancia de la clase que se está usando

module.exports = Tarea;
