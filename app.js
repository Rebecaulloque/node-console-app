require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo.js");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer.js");
const Tareas = require("./models/tareas.js");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear tarea/opt
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      case "2":
        //listar tarea/opt
        tareas.listadoCompleto();
        break;

      case "3":
        //listar tarea/opt completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case "4":
        //listar tarea/opt pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5":
        //completado | pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArray);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        //borrar tarea
        const id = await listadoTareasBorrar(tareas.listadoArray);
        if (id !== "0") {
          //preguntar si está seguro de borrar
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        break;

      case "0":
        //salir
        break;
    }

    guardarDB(tareas.listadoArray);

    await pausa();
  } while (opt !== "0");

  //    pausa();
};

main();
