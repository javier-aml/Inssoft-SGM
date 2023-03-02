import { GetterTree, ActionTree, MutationTree } from 'vuex'
interface Invoice {
    cantidad?: Number,
    claveSAT?: String,
    claveUnidad?: String,
    descripcion?: String,
    descuento?: Number,
    descuentoConcepto?: Number,
    domicilioFiscalReceptor?: String,
    emisor?: String,
    estatus?: String,
    exchangeRate?: String,
    fechaCompleta?: String,
    fechaEmision?: String,
    fechaNuevaAplicacion?: String,
    folio?: String,
    horaNuevaAplicacion?: String,
    importeConcepto?: Number,
    importeImpuesto?: Number,
    impuesto?: Number,
    inBalance?: Boolean,
    justificacionCambio?: String,
    moneda?: String,
    noIdentificacion?: String,
    receptor?: String,
    regimenFiscal?: String,
    regimenFiscalReceptor?: String,
    rfcEmisor?: String,
    rfcReceptor?: String,
    serie?: String,
    subtotal?: Number,
    tipoComprobante?: String,
    tipoFactura?: String,
    total?: Number,
    totalMXN?: String,
    unidad?: String,
    usoCFDI?: String,
    uuid?: String,
    valorUnitario?: Number,
    versionCFDI?: Number
}

let invoices: Array<Invoice>
let newData: {
    fechaNuevaAplicacion: String,
    horaNuevaAplicacion: String,
    justificacionCambio: String,
    inBalance: Boolean
}
let uuid: String
let updateInvoice: Invoice

export const state = () => ({
  headersExcel: {
    EstadoSAT: 'estatus',
    UUID: 'uuid',
    Serie: 'serie',
    Folio: 'folio',
    Fecha: 'fechaCompleta',
    NombreEmisor: 'emisor',
    RfcEmisor: 'rfcEmisor',
    NombreReceptor: 'receptor',
    RfcReceptor: 'rfcReceptor',
    ClaveProdServ: 'claveSAT',
    NoIdentificacion: 'noIdentificacion',
    Descripcion: 'descripcion',
    Unidad: 'claveUnidad',
    ClaveUnidad: 'unidad',
    Cantidad: 'cantidad',
    PrecioUnitario: 'valorUnitario',
    Importe: 'importeConcepto',
    Descuento: 'descuento',
    TipoCambio: 'exchangeRate',
    Moneda: 'moneda',
    Version: 'versionCFDI',
    TipoCFDI: 'tipoComprobante'
  } as Object,
  invoiceProp: {} as any,
  invoice: {} as Invoice,
  updateInvoice: {} as Object,
  currentPage: 1 as number,
  invoices: [] as Array<Object>,
  perPage: 10 as number,
  modalDetailId: 'modalDetailBilling' as String
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  SET_INVOICE_SELECTED: (state, invoiceSelected: Object) => (
    state.invoice = invoiceSelected
  ),
  SET_PROPS_INVOICE: (state, data: Object) => (
    state.invoiceProp = data
  ),
  SET_INVOICES: (state, data: Array<Object>) => (
    state.invoices = data
  ),
  UPDATE_CURRENT_PAGE: (state, page: number) => (
    state.currentPage = page
  ),
  UPDATE_PER_PAGE: (state, perPage:number) => (
    state.perPage = perPage
  ),
  EDIT_INVOICE: (state, item) => {
    invoices = state.invoices
    newData = state.invoiceProp
    uuid = item.uuid
    updateInvoice = invoices.find(obj => obj.uuid === uuid) as Object
    updateInvoice.fechaNuevaAplicacion = !newData.fechaNuevaAplicacion ? '' : newData.fechaNuevaAplicacion
    updateInvoice.horaNuevaAplicacion = !newData.horaNuevaAplicacion ? '' : newData.horaNuevaAplicacion
    updateInvoice.justificacionCambio = !newData.justificacionCambio ? '' : newData.justificacionCambio
    updateInvoice.inBalance = !newData.inBalance ? true : newData.inBalance
  }
}

export const actions: ActionTree<RootState, RootState> = {
  fetchTableData ({ commit }, { page, perPage }) {
    const start = (page - 1) * perPage
    const end = start + perPage
    const data = invoices.slice(start, end)
    commit('SET_INVOICES', data)
  },
  updateCurrentPage ({ commit }, page) {
    commit('UPDATE_CURRENT_PAGE', page)
  },
  updatePerPage ({ commit }, perPage) {
    commit('UPDATE_PER_PAGE', perPage)
  }
}
