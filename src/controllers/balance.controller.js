const balanceHelper = require('../helpers/balanceHelper');
const moment = require('moment');  

class BalanceController {
 
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
      rfc = 'NQU120510QZ7';
        
      if(tipoBalance == 'Diario'){
        const tomorrow = moment(fechaDesde).add(1, 'days').format('YYYY-MM-DD');
        fechaHasta = tomorrow;
      }//if


      if(rfc == 'NQU120510QZ7'){
        console.log("igual")
        const salesData = await balanceHelper.getInvoicesByUIID();
        const salesResult = balanceHelper.validationsNatgas(salesData);

        
        salesMXN = salesResult.acumuladoMXN.toFixed(2);
        salesLTS = salesResult.acumuladoLTS.toFixed(2);

        //Invoices
        salesInvoices = salesResult.allInvoices;
        //console.log(salesInvoices)
        
      }
      else
      {
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
      }


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

  /*static async balancePagination(req,res) {
    
    try {
      let { tipoBalance, fechaDesde, fechaHasta, rfc, tipoFacturas = 'Facturas de compra y venta', page = 1 } = req.body;
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

        const purchaseData = await balanceHelper.getInvoicePagination(rfc,fechaDesde,fechaHasta,'C',page);
        const salesData = await balanceHelper.getInvoicePagination(rfc,fechaDesde,fechaHasta,'V',page);

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
  }//balancePagination*/

  static async createBalanceJSON(req,res){

    try {
      let { invoices } = req.body;

      //const invoices = await balanceHelper.getInvoicesByUIID(); 
      const validatedInvoices = balanceHelper.validationsNatgas(invoices);
      const filename = balanceHelper.createJsonNatgasStation('PRZ', validatedInvoices);
      const response = filename != '' ? true : false;

      return res.status(200).json({ success: response, filename });

    } catch( error ) {
      console.log(error)
      return res.status(200).json({ success: false, url: ''});
    }
  }
 
}

module.exports = BalanceController