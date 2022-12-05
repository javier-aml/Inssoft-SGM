const helpers = {};

helpers.avance = (qty,ptd) => {
    if (qty != 0) {
        
        var porcenaje = (ptd / qty)*100;
        return porcenaje;
    }else{
        return 0
    }
}

helpers.fechaFormat = (fecha) =>{

    
    
    return fecha
}
helpers.modalPDFTask = (modal) =>{

    if (modal == '9.7.1-Verificación de Procedencia y Calidad de Hidrocarburos de Embarque Recibido') {
        return '#PDFCreator'
    } else {
        return '#Validar'
    }

}
helpers.modalPDFTaskButton = (modal) =>{

    if (modal == '9.7.1-Verificación de Procedencia y Calidad de Hidrocarburos de Embarque Recibido') {
        return 'btnImprimirPDF'
    } else {
        return 'btnImprimir'
    }

}

helpers.numberSeparation = (number)=>{
    const nNumber = parseFloat(number).toLocaleString('en');
    console.log(nNumber);
    return nNumber;

}

helpers.porcentajeLts = (number, max)=>{
    const nNumber = (parseFloat(number) / max) * 100

    return nNumber.toFixed(2);

}
helpers.FechaHoy = () =>{
    return acomodarFecha(DateNow())
}
helpers.FechaMes = () =>{
    return acomodarFechaMes(DateNowMes())
}
function acomodarFecha(date) {
    const split = date.split("-");
    const fecha = `${split[2]}-${split[1]}-${split[0]}`;
    return fecha;
  }
  function DateNow() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let fecha = "";
    if (month < 10) {
      fecha = `${day}-0${month}-${year}`
    } else {
      fecha = `${day}-${month}-${year}`
    }
    return fecha
  }
  function acomodarFechaMes(date) {
    const split = date.split("-");
    const fecha = `${split[1]}-${split[0]}`;
    return fecha;
  }
  function DateNowMes() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let fecha = "";
    if (month < 10) {
      fecha = `0${month}-${year}`
    } else {
      fecha = `${month}-${year}`
    }
    return fecha
  }
module.exports = helpers;


