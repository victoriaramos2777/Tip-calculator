import tipCalculater from './modules/tipCalculator.js';
import totalFinal from './modules/totalFinal.js';

//constantes ed los elementos
const main = document.getElementById('main');
const form = document.getElementById('main-form');

//guardar valores en variables
const subtotal= document.getElementById('total-bill');
const porcenDiv = document.getElementById('form-btns');
const personas = document.getElementById('total-people');
//variable para almacena el valor porcentual seleccionado 
let porcenTip;

//evento para escuchar a que botom le estamos dando click
porcenDiv.addEventListener('click',(e)=>{
    porcenTip=e.target;

    //condicion para escuchar el custom
    if(e.target.id==='custom-tip'){

    }
});

//crear un evento de submit para la forma

form.addEventListener('submit',(e) => {
    //evitar la accion por defecto
    e.preventDefault();

    //crear objeto constante con los valores de la forma
    const formulario = {
        subtotalF:subtotal.value,
        porcenTipF:porcenTip.value,
        personasF:personas.value,
    }

    console.log(formulario);

    const {subtotalF,porcenTipF,personasF} = formulario;

    const tipFinal = tipCalculater
   ( subtotalF,porcenTipF,personasF);
    
   console.log(tipFinal);
   

   const totalF = totalFinal
   (subtotalF,personasF,tipFinal);

   console.log(totalF);

   

});




