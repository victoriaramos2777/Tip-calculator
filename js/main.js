import tipCalculater from "./modules/tipCalculator.js";
import totalFinal from "./modules/totalFinal.js";
import updateTip from "./modules/updateTip.js";
import updateTotal from "./modules/updateTip.js";
//constantes ed los elementos html

const main = document.getElementById("main");
const form = document.getElementById("main-form");
const tipResult = document.getElementById("result-tip");
const totalResult = document.getElementById("result-total");

//custom box
const customTip = document.getElementById("custom-tip");
//guardar valores en variables
const subtotal = document.getElementById("total-bill");
const porcenDiv = document.getElementById("form-btns");
const personas = document.getElementById("total-people");
//metodo para seleccionar todos los btns
const btns = document.querySelectorAll(".form__btns__button");
const resetBtn = document.getElementById("reset-btn");

// Elemento para almacenar texto del invalid
const invalid1 = document.getElementById("not-valid1");
const invalid2 = document.getElementById("not-valid2");
const invalid3 = document.getElementById("not-valid3");
//variable para almacena el valor porcentual seleccionado
let porcenTip;
let checKCustom;
let checkBtn = false;

//evento para escuchar a que botom le estamos dando click

porcenDiv.addEventListener("click", (e) => {
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }

  if (e.target.classList.contains("form__btns__button")) {
    checkBtn = true;
  }

  porcenTip = e.target;
  porcenTip.classList.add("active");

  //condicion para escuchar el custom
  if (e.target.id === "custom-tip") {
    porcenTip = e.target;

    checKCustom = true;

    porcenTip.classList.remove("active");
  }
});

//crear un evento de submit para la forma

form.addEventListener("submit", (e) => {
  //evitar la accion por defecto
  e.preventDefault();

  if (validateClick(checkBtn)) {
    //Si le dieron click a custom, entonces dividamos su valor entre 10

    if (checKCustom) {
      porcenTip.value = porcenTip.value / 100;
    }
    //crear objeto constante con los valores de la forma
    const formulario = {
      subtotalF: subtotal.value,
      porcenTipF: porcenTip.value,
      personasF: personas.value,
    };

    const { subtotalF, porcenTipF, personasF } = formulario;

    if (validateAll(subtotalF, personasF)) {
      updateDOM(subtotalF, porcenTipF, personasF);
      subtotal.parentElement.classList.add("valid");
      personas.parentElement.classList.add("valid");

      removeBorder(subtotal, "valid");
      removeBorder(personas, "valid");
    }
  }
});

// Funcion para actualizar el DOM
function updateDOM(subTotalF, porcenTipF, personasF) {
  const tipFinal = tipCalculater(subTotalF, porcenTipF, personasF);

  const totalF = totalFinal(subTotalF, personasF, tipFinal);
  //llamar funciones que actualizan el DOM

  updateTip(tipFinal.toFixed(2), tipResult);

  updateTotal(totalF.toFixed(2), totalResult);
}

// Funcion para quitar los mensajes en un periodo de tiempo
function removeText(element) {
  setTimeout(() => {
    element.innerText = "";
  }, 4000);
}

function removeBorder(element, classOfElement) {
  setTimeout(() => {
    element.parentElement.classList.remove(classOfElement);
  }, 4000);
}

// btn para reiniciar la tip calculator
resetBtn.addEventListener("click", (e) => {
  subtotal.value = "";
  customTip.value = "";
  personas.value = "";

  // Quitar validos
  subtotal.parentElement.classList.remove("valid");
  personas.parentElement.classList.remove("valid");

  // Quitar invalidos
  personas.parentElement.classList.remove("invalid");
  subtotal.parentElement.classList.remove("invalid");

  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }

  tipResult.innerText = "$0.00";
  totalResult.innerText = "$0.00";
});

// Validacion de Forma

function notZero(input) {
  let check = true;

  if (input <= 0) {
    check = false;
  }

  return check;
}

function validateAll(subTotalF, personasF) {
  let check = true;

  // Validar que no sean ceros
  if (!notZero(parseFloat(subTotalF))) {
    check = false;

    subtotal.parentElement.classList.add("invalid");

    invalid1.innerText = "No puede ser cero o menor que cero";

    removeText(invalid1);
    removeBorder(subtotal, "invalid");
  }

  if (!notZero(parseFloat(personasF))) {
    check = false;

    personas.parentElement.classList.add("invalid");
    invalid2.innerText = "No puede ser cero o menor que cero";

    removeText(invalid2);
    removeBorder(personas, "invalid");
  }

  return check;
}

function validateClick(checkBtn) {
  let check = true;

  if (!checkBtn) {
    check = false;

    invalid3.innerText = "Tienes que darle click al menos a un boton";

    removeText(invalid3);
  }

  return check;
}
