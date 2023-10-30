/**
 * @autor Alvaro Fonseca Hernandez
 * @GitHub https://github.com/AF0ns3ca/AlvaroFonsecaHernandez-Ex2.git
 */

//Este codigo no es eficiente del todo, se hacen muchos innersHTML insertando inputs que podrían mejorarse en un solo input en estado HIDDEN que se mostrase cuando se llamase la funcion  pero por falta de tiempo se quedará asi

//Se cargan primero elementos visuales
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

  //Funcion que muestra el saldo al inicio en la pantalla
  const mostrarSaldo = () => {
    screen.innerHTML = `
    <span>Bienvenido</span>
    <span>Saldo</span>
    <span class="data">$${saldo.toFixed(2)}</span>`;
  };

  //Funcion que muestra el saldo cuando lo hayamos actualizado
  const actualizarSaldo = () => {
    screen.innerHTML = `
    <span>Saldo Actual</span>
    <span class="data">$${saldo.toFixed(2)}</span>`;
  };

  //Funcion para login realizada con prompts y while. Controla numero de intentos. Se podria hacer como el resto en inputs y con recursividad pero se ha decidido asi para demostrar el conocimiento de prompt y while
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

  //Funcion realizada con inputs y salida por la pantalla del cajero para depositar dinero, en este caso usamos recursividad para que si hay un error el usuario pulsando un boton que aparece en pantalla pueda realizar un nuevo intento
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
          screen.innerHTML = `
                  <span>Ha ocurrido un error. Introduzca una cantidad a retirar valida.</span>
                  <button id="btn-try">Intentar de Nuevo</button>
                  `;
            document.getElementById("btn-try").addEventListener("click", () => {
              depositarDinero();
            });
        }
      });
  };

  //Funcion realizada con inputs y salida por la pantalla del cajero para retirar dinero, en este caso usamos recursividad para que si hay un error el usuario pulsando un boton que aparece en pantalla pueda realizar un nuevo intento
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
        if (retiro <= saldo && !isNaN(retiro) && retiro > 0) {
          saldo -= retiro;
          console.log(saldo);
          actualizarSaldo();
        } else {
          //En este caso de momento no se implementa while que pida todo el rato, si da este mensaje hay que apretar de nuevo el boton
          screen.innerHTML = `
                  <span>Ha ocurrido un error. Introduzca una cantidad a retirar valida.</span>
                  <button id="btn-try">Intentar de Nuevo</button>
                  `;
            document.getElementById("btn-try").addEventListener("click", () => {
              retirarDinero();
            });
        }
      });
  };

  //Funcion realizada con inputs y salida por la pantalla del cajero para transferir dinero, en este caso usamos recursividad para que si hay un error el usuario pulsando un boton que aparece en pantalla pueda realizar un nuevo intento
  const transferirDinero = () => {
    let monto;
    screen.innerHTML = `
        <span>Introduzca la cantidad a transferir</span>
        <input type="number" id="saldoTransf">
        <button id="btn-transferir">Continuar</button>
    `;
    document.getElementById("btn-transferir").addEventListener("click", () => {
      monto = parseFloat(document.getElementById("saldoTransf").value);
      screen.innerHTML = `
        <span>Introduzca la cuenta a la que transferira el dinero</span>
        <input type="text" id="cuentaTransf">
        <button id="btn-save-transferir">Continuar</button>
    `;
      document
        .getElementById("btn-save-transferir")
        .addEventListener("click", () => {
          let cuenta = document.getElementById("cuentaTransf").value;
          console.log(cuenta);
          if (checkIBAN(cuenta) /* cuenta !== ""*/) {
            saldo -= monto;
            screen.innerHTML = `
        <span>Transferencia realizada con exito</span>
        <span>Cantidad transferida: $${monto}</span>
        <span>Cuenta destino: ${cuenta}</span>
        <span>Saldo: $${saldo}</span>
    `;
          } else {
            screen.innerHTML = `
                  <span>Ha ocurrido un error inesperado. Intentelo otra vez.</span>
                  <button id="btn-try">Intentar de Nuevo</button>
                  `;
            document.getElementById("btn-try").addEventListener("click", () => {
              transferirDinero();
            });
          }
        });
    });
  };

  //Funcion realizada con inputs y salida por la pantalla del cajero para cambiar la contraseña, en este caso usamos recursividad para que si hay un error el usuario pulsando un boton que aparece en pantalla pueda realizar un nuevo intento
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
          console.log("Pin: " + PASS);
          PASS = document.getElementById("nuevoPin").value;
          console.log("Nuevo pin: " + PASS);
          screen.innerHTML = `
                  <span>Pin cambiado correctamente</span>
              `;
        });
      } else {
        screen.innerHTML = `
                  <span>Ha ocurrido un error inesperado. Intentelo otra vez.</span>
                  <button id="btn-try">Intentar de Nuevo</button>
                  `;
        document.getElementById("btn-try").addEventListener("click", () => {
          cambiarPass();
        });
      }
    });
  };

  //Funcion que al pulsar el boton salir nos lleva a una pagina de despedida
  const salir = () => {
    window.location.href = "templates/salida.html";
  };

  //Expresion regular que obliga a meter una cuenta con ES seguido de 20 digitos del 0 al 9
  const checkIBAN = (iban) => {
    let regular = /[ES]{2}[0-9]{20}$/;
    return regular.test(iban);
  };

  //Llamada a las funciones
  login();
  btnDeposito.addEventListener("click", depositarDinero);
  btnRetiro.addEventListener("click", retirarDinero);
  btnTransferir.addEventListener("click", transferirDinero);
  btnCambiar.addEventListener("click", cambiarPass);
  btnSalir.addEventListener("click", salir);
});
