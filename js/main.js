import tipCalculater from './modules/tipCalculator.js';
import totalFinal from './modules/totalFinal.js';
import updateTip from './modules/updateTip.js';
import updateTotal from './modules/updateTip.js';
//constantes ed los elementos html

const main = document.getElementById('main');
const form = document.getElementById('main-form');
const tipResult = document.getElementById('result-tip');
const totalResult = document.getElementById('result-total');

//custom box
const customTip = document.getElementById('custom-tip');
//guardar valores en variables
const subtotal= document.getElementById('total-bill');
const porcenDiv = document.getElementById('form-btns');
const personas = document.getElementById('total-people');
//metodo para seleccionar todos los btns
const btns = document.querySelectorAll('.form__btns__button');
const resetBtn = document.getElementById('reset-btn');

// Elemento para almacenar texto del invalid
const invalid1 = document.getElementById('not-valid1');
const invalid2 = document.getElementById('not-valid2');
const invalid3 = document.getElementById('not-valid3');
//variable para almacena el valor porcentual seleccionado 
let porcenTip;
let checKCustom;
let checkBtn = false;

//evento para escuchar a que botom le estamos dando click

porcenDiv.addEventListener('click',(e)=>{
    for(let i =0; i < btns.length; i++){
        btns[i].classList.remove('active');
    }

    if  (e.target.classList.contains('.form__btns__button')){
        checkBtn = true;
    }
    porcenTip = e.target;
    porcenTip.classList.add('active');

   

//condicion para escuchar el custom

    if(e.target.id==='custom-tip'){
     porcenTip = e.target;

       checKCustom = true;

        porcenTip.classList.remove('active');
    }
});

//crear un evento de submit para la forma

form.addEventListener('submit',(e) => {
    //evitar la accion por defecto
    e.preventDefault();

    if(check)
    porcenTip.value = porcenTip.va/100;

    //crear objeto constante con los valores de la forma
    const formulario = {
        subtotalF: subtotal.value,
        porcenTipF: porcenTip.value,
        personasF: personas.value,
        
    }

    console.log(formulario);

    const {subtotalF,porcenTipF,personasF} = formulario;

    const tipFinal = tipCalculater
   ( subtotalF,porcenTipF,personasF);
    
   console.log(tipFinal);
   

   const totalF = totalFinal
   (subtotalF,personasF,tipFinal);

   console.log(totalF);

   
   //llamar funciones que actualizan el DOM
  
  updateTip(tipFinal.toFixed(2), tipResult);
  
  
  updateTotal(totalF.toFixed(2),totalResult);
  

});
// btn para reiniciar la tip calculator
resetBtn.addEventListener('click',(e) => {
 subtotal.value ='';
 customTip.value= '';
 personas.value = '';
 for(let i =0; i < btns.length; i++){
    btns[i].classList.remove('active');
}
tipResult.innerText = '$0.00';
totalResult.innerText = '$0.00';
});








