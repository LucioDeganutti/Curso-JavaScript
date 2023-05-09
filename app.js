$(document).ready(function () {
  let JSONData = {};
  // Llamada a una API para generar datos actuales de la ciudad local.
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=-31.6333&lon=-60.7&lang=es&units=metric&appid=5d3313dc8ebcb179260e0ca84e18498b"
  )
    .then((res) => res.json())
    .then((json) => (JSONData = json))
    .then(() => {
      let temperatura = document.getElementById("temperatura");
      let ciudad = document.getElementById("ciudad");
      temperatura.textContent = `${JSONData.main.temp}º`;
      ciudad.textContent = JSONData.name;
    });
});
let reservasDia = [];
function obtenerdatos() {
  let reserva = {
    cantidadPersonas: document.getElementById("personas").value,
    cantidadNoches: document.getElementById("noches").value,
    nombreReserva: document.getElementById("nombre").value,
  };

  if (
    reserva.cantidadPersonas < 1 ||
    reserva.cantidadNoches < 1 ||
    reserva.nombreReserva.length < 2
  ) {
    Swal.fire({
      title: "Ups! Ocurrio un error!",
      text: `- Asegurese de haber ingresado su nombre correctamente.
        - No puede ingresar una cantidad de noches menor a 1.
        - No puede ingresar una cantidad de personas menor a 1.`,
      icon: "error",
      denyButtonText: "Ok! Entendido",
    });
  } else {
    let reservaValida = () => {
      // Datos de la reserva individual.
      localStorage.setItem("reserva", JSON.stringify(reserva));

      let reservados = JSON.parse(localStorage.getItem("reserva"));

      Swal.fire({
        title: "¡Excelente!",
        text: `${reserva.nombreReserva} su reserva de ${reservados.cantidadNoches} noches para ${reservados.cantidadPersonas} personas fue correctamente procesada.`,
        icon: "success",
        confirmButtonText: "Ok! Entendido",
        confirmButtonColor: "#92b55f",
      });

      // Reservas de cada dia.
      let agregarReserva = reservasDia.push(reserva);
      localStorage.setItem("reservasDiarias", JSON.stringify(reservasDia));

      // Section para informar el costo de la operacion al usuario.
      let articleCreado = document.createElement("article");
      articleCreado.textContent = `${
        reservados.nombreReserva
      } usted debe abonar $${
        reservados.cantidadNoches * 4500
      } por el total de ${reservados.cantidadNoches} noches.`;
      sectionAbono = document.getElementById("valor-reserva");
      sectionAbono.appendChild(articleCreado);
    };

    // Promise para simular la consulta a un servidor de la empresa.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(reservaValida());
      }, 1500);
    });
  }
}
