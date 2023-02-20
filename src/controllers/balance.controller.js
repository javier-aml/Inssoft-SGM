const balanceHelper = require('../helpers/balanceHelper');
const moment = require('moment');  

class BalanceController {
 
  static async fiscalbalance(req,res) {

    try {
      let { tipoBalance, fechaDesde, fechaHasta, rfc } = req.body;
      
      if(tipoBalance == 'Diario'){
        const tomorrow = moment(fechaDesde).add(1, 'days').format('YYYY-MM-DD');
        fechaHasta = tomorrow;
      }

      const invoicesCompra = await balanceHelper.getInvoices('GEM161104H39',fechaDesde,fechaHasta,'C');
      const invoicesVenta = await balanceHelper.getInvoices('GEM161104H39',fechaDesde,fechaHasta,'V');

      const diferenciaMXN = (invoicesCompra.acumuladoMXN - invoicesVenta.acumuladoMXN).toFixed(2)
      const diferenciaLTS = (invoicesCompra.acumuladoLTS - invoicesVenta.acumuladoLTS).toFixed(2)

      const data = {
        invoices: [...invoicesCompra.allInvoices, ...invoicesVenta.allInvoices],
        acumuladoMXNCompra: invoicesCompra.acumuladoMXN.toFixed(2),
        acumuladoLTSCompra: invoicesCompra.acumuladoLTS,
        acumuladoMXNVenta: invoicesVenta.acumuladoMXN.toFixed(2),
        acumuladoLTSVenta: invoicesVenta.acumuladoLTS,
        diferenciaMXN,
        diferenciaLTS
      }

      return res.status(200).json({ success: true, data});

    } catch ( error ) {

      return res.status(200).json({ success: false});

    }
  }//balance

  static async balance(req,res){

    try {
      let { tipoBalance, fechaDesde, fechaHasta, rfc, tipoFacturas = 'Facturas de compra y venta' } = req.body;
      let purchaseInvoices = [];
      let salesInvoices = [];
      let diferenciaMXN = 0;
      let diferenciaLTS = 0;
      let purchaseMXN = 0;
      let purchaseLTS = 0;
      let salesMXN = 0;
      let salesLTS = 0;
        
      if(tipoBalance == 'Diario'){
        const tomorrow = moment(fechaDesde).add(1, 'days').format('YYYY-MM-DD');
        fechaHasta = tomorrow;
      }//if


      if(tipoFacturas == 'Facturas de compra y venta'){

        const purchaseData = await balanceHelper.getInvoice(rfc,fechaDesde,fechaHasta,'C');
        const salesData = await balanceHelper.getInvoice(rfc,fechaDesde,fechaHasta,'V');

        //Validations
        const purchaseResult = balanceHelper.validationsGlencore(purchaseData, 'C');
        const salesResult= balanceHelper.validationsGlencore(salesData, 'V');
      
        //Values MXN and LTS
        purchaseMXN = purchaseResult.acumuladoMXN.toFixed(2);
        purchaseLTS = purchaseResult.acumuladoLTS.toFixed(2);
        salesMXN = salesResult.acumuladoMXN.toFixed(2);
        salesLTS = salesResult.acumuladoLTS.toFixed(2);

        //Invoices
        purchaseInvoices = purchaseResult.allInvoices;
        salesInvoices = salesResult.allInvoices;
      }
      else if(tipoFacturas == 'Solo facturas de compra'){

        const purchaseData = await balanceHelper.getInvoice(rfc,fechaDesde,fechaHasta,'C');
        const purchaseResult = balanceHelper.validationsGlencore(purchaseData, 'C');

        purchaseMXN = purchaseResult.acumuladoMXN.toFixed(2);
        purchaseLTS = purchaseResult.acumuladoLTS.toFixed(2);

        purchaseInvoices = purchaseResult.allInvoices;

      } else {

        const salesData = await balanceHelper.getInvoice(rfc,fechaDesde,fechaHasta,'V');
        const salesResult= balanceHelper.validationsGlencore(salesData, 'V');

        salesMXN = salesResult.acumuladoMXN.toFixed(2);
        salesLTS = salesResult.acumuladoLTS.toFixed(2);

        salesInvoices = salesResult.allInvoices;
       
      }//if

      //Calculate difference
      diferenciaMXN = (purchaseMXN - salesMXN).toFixed(2)
      diferenciaLTS = (purchaseLTS - salesLTS).toFixed(2)

      //Final result
      const data = {
        invoices: [...purchaseInvoices, ...salesInvoices],
        acumuladoMXNCompra: purchaseMXN,
        acumuladoLTSCompra: purchaseLTS,
        acumuladoMXNVenta: salesMXN,
        acumuladoLTSVenta: salesLTS,
        diferenciaMXN,
        diferenciaLTS
      }
      
      return res.status(200).json({ success: true, data });

    } catch( error ){
      console.log(error)
      return res.status(200).json({ success: false});

    }//catch

  }//balance
}

module.exports = BalanceController