function tipCalculater(total, porcenTip, Personas) {
  let propina;
  propina = (total*porcenTip)/Personas;

  //redondea a cifras decimales 
  propina = propina 
  return propina;

}

export default tipCalculater;