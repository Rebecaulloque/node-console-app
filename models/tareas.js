const Tarea = require("./tarea.js");

class Tareas {
  _listado = {}; //creé una propiedad (de la clase) llamada _listado

  //uso un getter para retornar un nuevo arreglo
  get listadoArray() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      //método de javascript (object) para extraer cada una de las llaves(key) que se encuentren
      const tarea = this._listado[key]; //en un objeto ( en este caso: _listado) (extraigo todas las llaves y esto crea un arreglo)
      listado.push(tarea);
    });
    return listado; //éste es el arreglo que retorna el getter
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArray.forEach((tarea, i) => {
      const index = `${i + 1 + "."}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${index} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completada = true) {
    console.log();
    let contador = 0;
    this.listadoArray.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      if (completada) {
        if (completadoEn) {
          contador += 1;
          console.log(
            ` ${(contador + ".").green} ${desc} :: ${completadoEn.green} `
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(` ${(contador + ".").green} ${desc} :: ${estado} `);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
