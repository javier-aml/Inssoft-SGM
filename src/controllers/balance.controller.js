const balanceHelper = require('../helpers/balanceHelper');
const moment = require('moment');  

class BalanceController {
 
  static async balance(req,res) {

    try {
      let { tipoBalance, fechaDesde, fechaHasta, rfc } = req.body;
      
      if(tipoBalance == 'Diario'){
        const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
        fechaHasta = tomorrow;
      }

      const invoicesCompra = await balanceHelper.getInvoices(rfc,fechaDesde,fechaHasta,'C');
      const invoicesVenta = await balanceHelper.getInvoices(rfc,fechaDesde,fechaHasta,'V');

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

}

module.exports = BalanceController