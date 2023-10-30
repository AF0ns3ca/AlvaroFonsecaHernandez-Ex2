/**
 * @autor Alvaro Fonseca Hernandez
 * @GitHub https://github.com/AF0ns3ca/AlvaroFonsecaHernandez-Ex2.git
 */

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("display");
  const PASS = "1234";
  let saldo = 1000;
  let intentosRestantes = 3;

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

  const mostrarSaldo = () => {
    screen.innerHTML = `
    <span>Bienvenido</span>
    <span class="data">$${saldo.toFixed(2)}</span>`;
  };
  const depositarDinero = () => {};
  const retirarDinero = () => {};
  const transferirDinero = () => {};
  const cambiarPass = () => {};

  login();
});
