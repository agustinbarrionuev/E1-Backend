import inquirer from 'inquirer';
import moment from 'moment';

// Array para almacenar los gastos
const gastos = [];

// Función para agregar un nuevo gasto
function agregarGasto() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Introduce la descripción del gasto:'
    },
    {
      type: 'number',
      name: 'monto',
      message: 'Introduce el monto del gasto:'
    },
    {
      type: 'input',
      name: 'fecha',
      message: 'Introduce la fecha del gasto (formato: DD/MM/YYYY):'
    },
    {
      type: 'input',
      name: 'categoria',
      message: 'Introduce la categoría del gasto:'
    }
  ]).then(respuestas => {
    // Validamos que la fecha sea correcta
    const fechaValida = moment(respuestas.fecha, 'DD/MM/YYYY', true).isValid();
    if (!fechaValida) {
      console.log('La fecha introducida no es válida. Por favor, inténtalo de nuevo.\n');
      agregarGasto();
      return;
    }

    // Guardamos el nuevo gasto en el array
    gastos.push(respuestas);
    console.log('Gasto agregado correctamente.\n');
    // Volvemos al menú principal
    menuPrincipal();
  });
}

// Función para mostrar la lista de gastos
function verGastos() {
  if (gastos.length === 0) {
    console.log('No hay gastos registrados.\n');
  } else {
    console.log('Lista de gastos:');
    gastos.forEach(gasto => {
      console.log(`- Descripción: ${gasto.descripcion}, Monto: ${gasto.monto}, Fecha: ${gasto.fecha}, Categoría: ${gasto.categoria}`);
    });
    console.log();
  }
  // Volvemos al menú principal
  menuPrincipal();
}

// Función para mostrar el total de gastos acumulados
function verTotalGastos() {
  if (gastos.length === 0) {
    console.log('No hay gastos registrados.\n');
  } else {
    const total = gastos.reduce((acumulado, gasto) => acumulado + gasto.monto, 0);
    console.log(`Total de gastos acumulados: ${total}\n`);
  }
  // Volvemos al menú principal
  menuPrincipal();
}

// Función para mostrar el total de gastos por periodo de tiempo (mes o semana)
function verTotalGastosPorPeriodo() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'periodo',
      message: '¿Deseas ver el total de gastos por mes o por semana?',
      choices: [
        { name: 'Por mes', value: 'mes' },
        { name: 'Por semana', value: 'semana' }
      ]
    },
    {
      type: 'input',
      name: 'fecha',
      message: 'Introduce la fecha para el periodo de tiempo (formato: DD/MM/YYYY):'
    }
  ]).then(respuesta => {
    // Validamos que la fecha sea correcta
    const fechaValida = moment(respuesta.fecha, 'DD/MM/YYYY', true).isValid();
    if (!fechaValida) {
      console.log('La fecha introducida no es válida. Por favor, inténtalo de nuevo.\n');
    }})};
    // Función para mostrar el menú principal
function menuPrincipal() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
          { name: 'Agregar un nuevo gasto', value: 'agregar' },
          { name: 'Ver lista de gastos', value: 'ver' },
          { name: 'Ver total de gastos acumulados', value: 'total' },
          { name: 'Ver total de gastos por periodo de tiempo', value: 'periodo' },
          { name: 'Salir', value: 'salir' }
        ]
      }
    ]).then(respuesta => {
      switch (respuesta.opcion) {
        case 'agregar':
          agregarGasto();
          break;
        case 'ver':
          verGastos();
          break;
        case 'total':
          verTotalGastos();
          break;
        case 'periodo':
          verTotalGastosPorPeriodo();
          break;
        case 'salir':
          console.log('¡Hasta pronto!');
          break;
        default:
          console.log('Opción no válida.');
          menuPrincipal();
          break;
      }
    });
  }
  
  // Llamamos a la función del menú principal para empezar
  menuPrincipal();
  