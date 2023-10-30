/**
 * @autor Alvaro Fonseca Hernandez
 * @GitHub https://github.com/AF0ns3ca/AlvaroFonsecaHernandez-Ex2.git
 */

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("display");
  const btnDeposito = document.getElementById("btn-deposito");
  const btnRetiro = document.getElementById("btn-retiro");
  const btnTransferir = document.getElementById("btn-transferir");
  const btnCambiar = document.getElementById("btn-cambiar");
  const btnSalir = document.getElementById("btn-salir");

  let PASS = "1234";
  let saldo = 1000;
  let intentosRestantes = 3;

  const pin = () => {
    screen.innerHTML = `
    <span>Introduzca pin</span>
    <input type="text" id="pin">
`;
  };

  const mostrarSaldo = () => {
    screen.innerHTML = `
    <span>Bienvenido</span>
    <span class="data">$${saldo.toFixed(2)}</span>`;
  };
  const actualizarSaldo = () => {
    screen.innerHTML = `
    <span>Saldo Actual</span>
    <span class="data">$${saldo.toFixed(2)}</span>`;
  };

  const login = () => {
    let pin = prompt(
      `Introduzca pin. Intentos restantes: ${intentosRestantes}`
    );
    while (pin !== PASS && intentosRestantes > 1) {
      intentosRestantes--;
      console.log(`Pin incorrecto. Intentos restantes: ${intentosRestantes}`);
      pin = prompt(`Pin incorrecto. Intentos restantes: ${intentosRestantes}`);
    }
    if (pin == PASS) {
      console.log("Bienvenido");
      mostrarSaldo();
    } else {
      window.location.href = "templates/cajeroBloqueado.html";
    }
  };

  const depositarDinero = () => {
    screen.innerHTML = `
        <span>Introduzca la cantidad a depositar</span>
        <input type="number" id="saldoDep">
        <button id="btn-save-deposito">Depositar</button>
    `;
    document
      .getElementById("btn-save-deposito")
      .addEventListener("click", () => {
        let deposito = parseFloat(document.getElementById("saldoDep").value);
        if (!isNaN(deposito) && deposito > 0) {
          console.log(deposito);
          saldo += deposito;
          console.log(saldo);
          actualizarSaldo();
        } else {
          //En este caso de momento no se implementa while que pida todo el rato, si da este mensaje hay que apretar de nuevo el boton
          screen.innerHTML = `Error en la operación.`;
        }
      });
  };
  const retirarDinero = () => {
    screen.innerHTML = `
        <span>Introduzca la cantidad a retirar</span>
        <input type="number" id="saldoRet">
        <button id="btn-save-retirada">Retirar</button>
    `;
    document
      .getElementById("btn-save-retirada")
      .addEventListener("click", () => {
        let retiro = parseFloat(document.getElementById("saldoRet").value);
        if (retiro < saldo && !isNaN(retiro) && retiro > 0) {
          saldo -= retiro;
          console.log(saldo);
          actualizarSaldo();
        } else {
          //En este caso de momento no se implementa while que pida todo el rato, si da este mensaje hay que apretar de nuevo el boton
          screen.innerHTML = `Error en la operación.`;
        }
      });
  };
  const transferirDinero = () => {
  };

  const cambiarPass = () => {
    let intentos = 3;
    console.log("btn working");
    screen.innerHTML = `
        <span>Introduzca su pin actual</span>
        <input type="text" id="pin">
        <button id="btn-continue">Continuar</button>
    `;

    document.getElementById("btn-continue").addEventListener("click", () => {
      if (PASS === document.getElementById("pin").value) {
        screen.innerHTML = `
              <span>Introduzca nuevo pin</span>
              <input type="text" id="nuevoPin">
              <button id="btn-save">Guardar Cambios</button>
          `;
        document.getElementById("btn-save").addEventListener("click", () => {
          console.log(PASS);
          PASS = document.getElementById("nuevoPin").value;
          console.log("Nuevo pin: " + PASS);
          screen.innerHTML = `
                  <span>Pin cambiado correctamente</span>
              `;
        });
      } else {
        screen.innerHTML = `
                  <span>Ha ocurrido un error inesperado. Intentelo otra vez.</span>
              `;
      }
    });
  };

  //Funcion que al pulsar el boton salir nos lleva a una pagina de despedida
  const salir = () => {
    window.location.href = "templates/salida.html";
  };

// const estructuraValidaIBAN = (cuentaValidar)  {
  //   return /^ES\d{22}$/g.test(cuentaValidar);
  // }
  

  login();
  btnDeposito.addEventListener("click", depositarDinero);
  btnRetiro.addEventListener("click", retirarDinero);
  //btnTransferir.addEventListener("click", transferirDinero);*/
  btnCambiar.addEventListener("click", cambiarPass);
  btnSalir.addEventListener("click", salir);
});
