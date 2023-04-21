function obtenerdatos() {
  let reserva = {
    cantidadPersonas: document.getElementById("personas").value,
    cantidadNoches: document.getElementById("noches").value,
  };

  console.log(`Cantidad de personas es ${reserva.cantidadPersonas}`);
  console.log(`Cantidad de noches es ${reserva.cantidadNoches}`);
  localStorage.setItem("reserva", JSON.stringify(reserva));

  let reservados = JSON.parse(localStorage.getItem("reserva"));

  let cantNoches = document.querySelector("#cantNoc");
  let cantidadPersonas = document.querySelector("#cantPers");

  let infoNoches = document.createElement("span");
  let infoPersonas = document.createElement("span");

  cantNoches.textContent = reservados.cantidadNoches;
  infoPersonas.textContent = reservados.cantidadPersonas;

  cantNoches.appendChild(infoNoches);
  cantidadPersonas.appendChild(infoPersonas)
}
