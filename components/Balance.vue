<template lang="pug">
div(class="main-body")
  b-row(class="flex-wrap h-100")
    b-col(class="position-relative" cols="12" sm="12" md="12" lg="12" xl="12")
      b-row(class="justify-content-left pl-5 mt-3")
        div(class="pl-4")
          PdfOcr
      b-row(class="justify-content-between px-5")
        b-col(cols="12" sm="12" md="12" class="col-lg-auto pl-4")
          h4(class="m-0") Balance Diario y Mensual
          p(class="w-100 text-muted") *Campos obligatorios
        b-col(cols="12" sm="12" md="12" class="col-lg-auto")
          b-row(class="justify-content-around justify-content-lg-end align-items-center")
            b-col(class="col-auto")
             BOverlay(:show="show" rounded="sm")
              DownloadExcel(:data='invoices' :fields="headers" type='csv'  name="prueba.xls" :before-generate = "startDownload" :before-finish   = "finishDownload")
                b-button(class="d-flex justify-content-center align-items-center btnSecondary bg-white border-secondary px-4 mb-3" variant="outline-dark")
                  img(width="26px" src="../assets/img/icons/icon-balance/excel.svg")
                  h6(class="m-0 p-2 pl-3 font-weight-bold text-secondary") Descargar en xlsx
            b-col(class="col-auto")
              BFormGroup(class="mb-3")
                b(class="d-flex border rounded p-2 pl-4")
                  img(width="24px" src="../assets/img/icons/buscar.svg")
                  b-form-input(class="border-0" placeholder="Buscador" v-model="filter" autocomplete="off")
      b-row(class="border right-0 left-0 bg-light position-relative z-index-n1")
        b-form(class="w-100")
          b(class="w-100 d-flex flex-wrap justify-content-around align-items-start")
            b-col(cols="col-auto mt-4 ml-4")
              BFormGroup
                BFormRadio(
                  class="my-1"
                  v-model="tipoFacturas"
                  name="some-radios"
                  value="Facturas de compra y venta") Facturas de compra y venta
                BFormRadio(
                  class="my-1"
                  v-model="tipoFacturas"
                  name="some-radios"
                  value="Solo facturas de compra") Solo facturas de compra
                BFormRadio(
                  class="my-1"
                  v-model="tipoFacturas"
                  name="some-radios"
                  value="Solo facturas de venta") Solo facturas de venta

            b-col(cols="col-auto mt-4")
              BFormGroup(class="btnToggle" id="" label="*Balance:" label-for="balance")
                input(
                  id="toggle-on-balance"
                  class="toggle toggle-left"
                  name="toggle-balance"
                  value="Diario"
                  type="radio"
                  v-model="tipoBalance"
                )
                label(class="btn" for="toggle-on-balance") &nbsp;&nbsp;Diario&nbsp;&nbsp;
                input(
                  id="toggle-off-balance"
                  class="toggle toggle-right"
                  name="toggle-balance"
                  value="Mensual"
                  type="radio"
                  v-model="tipoBalance"
                )
                label(class="btn" for="toggle-off-balance") Mensual
            b-col(cols="10" sm="10" md="6" lg="6"  class="col-xl-auto mt-4")
              BFormGroup(label="*Fecha desde:" label-for="fecha desde")
                BFormDatepicker(
                  placeholder="Ingresa una fecha"
                  label-help="Use las teclas de cursor para navegar por las fechas del calendario"
                  label-reset-button="Resetear"
                  label-today-button="Hoy"
                  today-button-variant="outline-success"
                  style="width: 100%"
                  :hide-header="true"
                  today-button
                  reset-button
                  :no-close-on-select="false"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  v-model="fechaDesde"
                  )
            b-col(cols="10" sm="10" md="6" lg="6"  class="col-xl-auto mt-4")
              BFormGroup(label="Fecha hasta:" label-for="fecha hasta")
                BFormDatepicker(
                  placeholder="Ingresa una fecha"
                  label-help="Use las teclas de cursor para navegar por las fechas del calendario"
                  label-reset-button="Resetear"
                  label-today-button="Hoy"
                  today-button-variant="outline-success"
                  style="width: 100%"
                  :hide-header="true"
                  today-button
                  reset-button
                  :no-close-on-select="false"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  v-model="fechaHasta"
                )
            b-col(class="col-auto mt-4")
              b-button(
                class="d-flex justify-content-center align-items-center btnSecondary bg-white border-secondary my-4 px-4"
                variant="outline-dark"
                @click="toggleCargarInformacion"
              )
                img(width="24px" src="../assets/img/icons/icon-balance/bill.svg")
                h6(class="m-0 p-2 pl-3 font-weight-bold text-secondary") Cargar información
      b-row(v-if="!showBalanceTable" class=" h-autoText flex-column justify-content-center align-items-center")
        h2(class="text-center") Aún no tienes cargada información
        h2(class="text-center text-muted font-weight-light") Ingresa una fecha para continuar con tu balance
      b-col(v-if="showBalanceTable" class="d-flex flex-column justify-content-around align-items-center my-2")
        b-row(class="balanceTable w-100")
          b-table(
            :per-page="perPage"
            :current-page.sync="currentPage"
            sticky-header
            striped
            class="border rounded"
            responsive
            :fields="fields"
            :items="invoices"
            show-empty
            empty-text="No hay facturas"
            empty-filtered-text="No se encontro una coincidencia con el valor buscado"
            :filter="filter"
            :filter-included-fields="filterOn"
            :busy="isLoading"
            select-mode="single"
            @filtered="onFiltered"
            selectable
            @row-selected="onRowSelected"
            class="mb-1")
            template(#table-busy)
              div(class="text-center text-dark")
                b-spinner(class="align-middle").mr-3
                strong Cargando facturas
            template(v-slot:cell(inBalance)="data")
              b-form-checkbox(class="d-flex justify-content-center" v-model="data.value")
            template(v-slot:cell(RFC)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Emisor)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(rfc)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Receptor)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Fecha_balance)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Descripcion)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Cantidad)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Monto)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Total)="data")
              p(class="m-0") {{data.value}}
            template(v-slot:cell(Total_MXN)="data")
              p(class="m-0") {{data.value}}
          div(class="col-md-8 pl-0 pb-2")
            h6 Total: {{totalRows}} registros
          div.col-md-4
            b-pagination(:total-rows="totalRows" :per-page="perPage" v-model="currentPage" align="center" @input="onCurrentPageChange")
        b-row(class="w-100")
          b-col(cols="12" sm="12" md="12" lg="6")
            b-row(class="justify-content-around align-items-center")
              b-col(class="text-center my-2 col-auto")
                h6(class="font-weight-bold text-secondary") Total MXN Comprado
                h6(class="font-weight-bold") $ {{ totalCompradoMXN }}
              b-col(class="text-center my-2 col-auto")
                h6(class="font-weight-bold text-secondary") Total MXN Venta
                h6(class="font-weight-bold") $ {{ totalVendidoMXN }}
              b-col(class="text-center my-2 col-auto")
                h6(class="font-weight-bold bg-secondary text-white px-4 py-2 m-0 rounded-top") Diferencia MXN
                h6(class="font-weight-bold border px-4 py-2 m-0 colorAlert rounded-bottom") ${{diferenciaMXN}}
          b-col(class="p-0" cols="12" sm="12" md="12" lg="6")
            b-row(class="justify-content-around align-items-center")
              b-col(class="text-center my-2 col-auto order-6 order-xl-0 px-1")
                b(class="d-flex justify-content-around m-0 bgAlert rounded-top")
                  h6(class="font-weight-bold text-white px-4 py-2 m-0") Diferencia Litros
                  h6(class="font-weight-bold text-white px-2 py-2 m-0") &nbsp; % &nbsp;
                b(class="d-flex m-0 border rounded-bottom")
                  h6(class="font-weight-bold colorAlert px-4 py-2 m-0") {{ diferenciaLTS }}
                  h6(class="font-weight-bold colorAlert px-2 py-2 m-0") 8.09
              b-col(class="text-center my-2 col-auto px-2")
                h6(class="font-weight-bold text-secondary") Total Litros Comprado
                h6(class="font-weight-bold") {{ totalCompradoLTS }} lts
              b-col(class="text-center my-2 col-auto px-2")
                h6(class="font-weight-bold text-secondary") Total Litros Venta
                h6(class="font-weight-bold") {{ totalVendidoLTS }} lts
            b-row
              b-col
                b-row(class="flex-nowrap position-relative align-items-start bgAlertAlfa p-4 mt-2 mb-5 rounded")
                  div(class="position-absolute triangleContainer")
                    img(width="25px" src="../assets/img/icons/icon-balance/triangle.svg")
                  img(class="mx-2 mt-1" width="25px" src="../assets/img/icons/icon-balance/alert.svg")
                  b
                    <h3 class="colorAlertAlfa font-weight-light"><b class="font-weight-bold">Alerta detectada.</b> La <i><u>diferencia de Litros</u></i> supera el % limite permitido. Favor de revisar la conciliación</h3>
                    <h5 class="mt-3">Se envió <b>ALERTA</b> a bitácora de operaciones para su futura revisión</h5>
        b-row(class="justify-content-around align-items-center w-50 pb-5 mb-5")
          b-button(class="border-0" variant="outline-dark" @click="toggleClearForm")
            h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Limpiar
          b-button(v-if="showButtonJson" variant="primary" @click="generateJSON")
            h5(class="m-0 pt-2 px-4 font-weight-bold text-uppercase") General Balance
            p(class="m-0 pb-2 px-4 text-uppercase") (Archivo JSON - SAT)
      b-row(class="border bg-light footerResearch z-index-n1")
        b-form(class="w-100")
          b(class="w-100 d-flex flex-wrap justify-content-around align-items-start py-2")
            b-col(class="text-center text-lg-left col-12 col-md-6 col-lg-auto mt-2 mb-1 ml-lg-4")
              label *Filtro:
              h6 {{tipoFacturas}}
            b-col(class="text-center text-lg-left col-12 col-md-6 col-lg-auto mt-2 mb-1 ml-lg-4")
              label *Balance:
              h6 {{tipoBalance}}
            b-col(class="text-center text-lg-left col-12 col-md-6 col-lg-auto mt-2 mb-1 ml-lg-4")
              label *Fecha desde:
              h6 {{fechaDesde}}
            b-col(class="text-center text-lg-left col-12 col-md-6 col-lg-auto mt-2 mb-1 ml-lg-4")
              label Fecha hasta:
              h6 {{fechaHasta}}
            b-col(class="col-auto col-lg-auto mt-lg-2 mb-1")
              b-button(class="d-flex justify-content-center align-items-center btnSecondary bg-white border-secondary px-4"
              variant="outline-dark" @click="toggleSearchEdit")
                img(width="24px" src="../assets/img/icons/icon-balance/bill.svg")
                h6(class="m-0 p-2 pl-3 font-weight-bold text-secondary") Editar búsqueda
  modalDetailBilling
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JsonExcel from 'vue-json-excel'
import { ToastPlugin, ModalPlugin, BFormRadio, BFormGroup, BFormDatepicker, BOverlay } from 'bootstrap-vue'
import ModalDetailBilling from '../components/ModalDetailBilling.vue'
Vue.component('ModalDetailBilling', ModalDetailBilling)
Vue.component('BFormRadio', BFormRadio)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BFormDatepicker', BFormDatepicker)
Vue.component('BOverlay', BOverlay)
Vue.component('DownloadExcel', JsonExcel)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

interface InvoiceM{
  cantidad: number,
  claveSAT: string,
  descripcion: string,
  descuento: number,
  descuentoConcepto: number,
  domicilioFiscalReceptor: string,
  emisor: string,
  estatus: string,
  fechaCompleta: string,
  fechaEmision: string,
  importeConcepto: number,
  importeImpuesto: number
  impuesto: number,
  moneda: string,
  noIdentificacion: string
  receptor: string,
  regimenFiscal: number
  regimenFiscalReceptor: number
  rfcEmisor: string,
  rfcReceptor: string,
  subtotal: number,
  tipoComprobante: string,
  tipoFactura: string,
  total: number
  totalMXN: string,
  unidad: string,
  usoCFDI: string,
  uuid: string
  valorUnitario: number,
  versionCFDI: number,
  inBalance: boolean,
  fechaNuevaAplicacion: string,
  horaNuevaAplicacion: string,
  justificacionCambio: string
}

interface BalanceM {
  invoices: Array<InvoiceM>;
  acumuladoMXNCompra: number;
  acumuladoLTSCompra: number;
  acumuladoMXNVenta: number;
  acumuladoLTSVenta: number;
  diferenciaMXN: number;
  diferenciaLTS: number;
}

@Component
export default class Balance extends Vue {
  $axiosSgm: any
  currentPage = 1

  get invoices (): Array<Object> {
    return this.$store.state.balance.invoices
  }

  get perPage (): number {
    return this.$store.state.balance.perPage
  }

  get totalRows (): number {
    return this.$store.state.balance.invoices.length
  }

  headers = this.$store.state.balance.headersExcel

  data () {
    return {
      modalSearchId: 'modalEditSearch',
      // modalDetailId: 'modalDetailBilling',
      tipoFacturas: 'Facturas de compra y venta',
      tipoBalance: 'Diario',
      fechaDesde: null,
      fechaHasta: null,
      stickyHeader: true,
      showBalanceTable: false,
      selectMode: 'sigle',
      selected: {},
      showButtonJson: false,
      show: false,
      fields: [
        { key: 'inBalance', label: 'Int', stickyColumn: true },
        { key: 'rfcEmisor', label: 'RFC', sortable: true },
        { key: 'emisor', label: 'Emisor', sortable: true },
        { key: 'rfcReceptor', label: 'RFC', sortable: true },
        { key: 'receptor', label: 'Receptor', sortable: true },
        { key: 'fechaCompleta', label: 'Fecha', sortable: true },
        { key: 'descripcion', label: 'Descripción', sortable: true },
        { key: 'cantidad', label: 'Cantidad', sortable: true },
        { key: 'moneda', label: 'Moneda', sortable: true },
        { key: 'total', label: 'Total', sortable: true },
        { key: 'totalMXN', label: 'Total MXN', sortable: true }
      ],
      filter: null,
      filterOn: [],
      isLoading: false,
      totalCompradoMXN: 0.0,
      totalVendidoMXN: 0.0,
      diferenciaMXN: 0.0,
      totalCompradoLTS: 0,
      totalVendidoLTS: 0,
      diferenciaLTS: 0
    }
  }

  private async toggleCargarInformacion () {
    const { fechaDesde, fechaHasta, tipoBalance } = this.$data

    if (tipoBalance === 'Diario') {
      if (fechaDesde) {
        await this.getBalance()
      } else {
        this.makeToast('warning', 'BALANCE', 'Seleccciona la Fecha desde')
      }
    } else if (fechaDesde && fechaHasta) {
      this.$data.showButtonJson = true
      await this.getBalance()
    } else {
      this.makeToast('warning', 'BALANCE', 'Seleccciona la Fecha desde y Fecha hasta')
    }
  }

  private async getBalance () {
    try {
      const { fechaDesde, fechaHasta, tipoBalance, rfc = 'GEM161104H39' } = this.$data

      this.$data.isLoading = true
      this.$data.showBalanceTable = true

      const response = await this.$axiosSgm.$post('/pdfToJson', { fechaDesde, fechaHasta, tipoBalance, rfc })
      const data: BalanceM = await response.data

      this.$data.totalCompradoMXN = data.acumuladoMXNCompra
      this.$data.totalVendidoMXN = data.acumuladoMXNVenta
      this.$data.totalVendidoMXN = data.acumuladoMXNVenta
      this.$data.diferenciaMXN = data.diferenciaMXN

      this.$data.totalCompradoLTS = data.acumuladoLTSCompra
      this.$data.totalVendidoLTS = data.acumuladoLTSVenta
      this.$data.totalVendidoLTS = data.acumuladoLTSVenta
      this.$data.diferenciaLTS = data.diferenciaLTS

      this.$store.commit('balance/SET_INVOICES', data.invoices)
      this.$store.dispatch('balance/fetchTableData')

      this.$data.isLoading = false
    } catch (error) {
      this.$data.isLoading = false
    }
  }

  onRowSelected (items: any) {
    const invoiceSelected = items[0]
    // eslint-disable-next-line no-console
    // console.log(invoiceSelected)
    if (invoiceSelected) {
      this.$store.commit('balance/SET_INVOICE_SELECTED', invoiceSelected)
    }
    const modalId = this.$store.state.balance.modalDetailId
    // eslint-disable-next-line no-console
    console.log(this.$store.state.balance.invoice)
    this.$bvModal.show(modalId)
  }

  onFiltered (filteredItems: any) {
    this.$data.totalRows = filteredItems.length
    this.$data.currentPage = 1
  }

  toggleSearchEdit () {
    // -this.$bvModal.show('modalEditSearch')
  }

  startDownload () {
    this.$data.show = true
  }

  finishDownload () {
    this.$data.show = false
  }

  toggleSearchEditFilters () {
    // this.$data.tipoFacturas = item.invoiceType
    // this.$data.tipoBalance = item.balanceType
    // this.$data.fechaDesde = item.dateFrom
    // this.$data.fechaHasta = item.dateTo
  }

  toggleClearForm () {
    this.$data.tipoFacturas = 'Facturas de compra y venta'
    this.$data.tipoBalance = 'Diario'
    this.$data.fechaDesde = null
    this.$data.fechaHasta = null
    this.$data.showBalanceTable = false
    this.$data.items = []
    this.$data.totalCompradoMXN = 0.0
    this.$data.totalVendidoMXN = 0.0
    this.$data.diferenciaMXN = 0.0
    this.$data.totalCompradoLTS = 0
    this.$data.totalVendidoLTS = 0
    this.$data.diferenciaLTS = 0
  }

  async generateJSON () {
    try {
      const invoices = this.invoices
      // eslint-disable-next-line no-console
      console.log(invoices)
      const response = await this.$axiosSgm.$post('/createBalanceJSON', { invoices, responseType: 'blob' })
      const filename = 'MesTempNatGas_PRZ.json'
      const element = document.createElement('a')
      const url = window.URL.createObjectURL(new Blob([response.json]))
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + url)
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      this.makeToast('danger', 'Generación de JSON ', '¡Intenta nuevamente!')
    }
  }

  onCurrentPageChange (currentPage: number) {
    this.currentPage = currentPage
    this.$store.dispatch('balance/updateCurrentPage', { page: currentPage, perPage: this.perPage })
  }

  private makeToast (variant: string = '', title: string = '', body: string = '') {
    this.$bvToast.toast(body, {
      title,
      variant,
      solid: true,
      headerClass: 'justify-content-center'
    })
  }
}
</script>
<style lang="css">
#modal-bill .modal-dialog {
  transform: none;
  width: 85vw;
  max-width: 1430px !important;
}

.triangleContainer {
  top: -18px;
  left: 28%;
}

.a15 {
  width: 15px;
  height: 15px;
}

.balanceTable th[aria-colindex="1"],
.balanceTable td[aria-colindex="1"],
.balanceTable th[aria-colindex="3"],
.balanceTable td[aria-colindex="3"],
.balanceTable th[aria-colindex="5"],
.balanceTable td[aria-colindex="5"],
.balanceTable th,
.balanceTable td {
  border-right: 2px solid #EFEFEF;
}

.balanceTable th,
.balanceTable td {
  min-width: 110px;
}

.balanceTable th[aria-colindex="1"],
.balanceTable td[aria-colindex="1"] {
  min-width: 70px;
}

.balanceTable th[aria-colindex="4"] div {
  text-transform: uppercase;
}

.balanceTable th[aria-colindex="6"],
.balanceTable td[aria-colindex="6"] {
  min-width: 160px;
}

.balanceTable th[aria-colindex="3"],
.balanceTable td[aria-colindex="3"],
.balanceTable th[aria-colindex="5"],
.balanceTable td[aria-colindex="5"],
.balanceTable th[aria-colindex="7"],
.balanceTable td[aria-colindex="7"] {
  min-width: 270px;
}

.balanceTable th div {
  width: fit-content;
  margin: auto;
}

.balanceTable th[aria-colindex="1"] div {
  color: transparent;
}

.balanceTable td[aria-colindex="1"] {
  padding: 0;
  padding-right: 0 !important;
  padding-left: 0.4rem !important;
}

.balanceTable .table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(255, 255, 255, 0.981);
}

.balanceTable .table td {
  text-align: center;
  padding: 1.5rem 0.8rem;
  vertical-align: middle;
}

.balanceTable .table td p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.balanceTable .table th {
  text-align: center;
  padding: 1rem 0rem;
  vertical-align: middle;
}

.balanceTable .table.b-table>thead>tr>[aria-sort]:not(.b-table-sort-icon-left),
.table.b-table>tfoot>tr>[aria-sort]:not(.b-table-sort-icon-left) {
  background-position: left calc(0.75rem / 2) center;
  padding-left: 0;
  padding-right: 0;
  vertical-align: middle;
}

.balanceTable .table th {
  background-color: #FAF9FB !important;
  position: sticky !important;
}

.table.b-table.table-striped>tbody>tr:nth-of-type(odd)>.table-b-table-default {
  background-image: inherit;
}

.balanceTable .table thead th {
  vertical-align: bottom;
  border-bottom: 0px;
  border-top: 0px;
}

.b-table-sticky-header {
  overflow-y: auto;
  max-height: 450px;
}

@media(min-width: 1200px) {
  .footerResearch {
    position: fixed;
    width: 84%;
    bottom: 0;
  }
}

@media(max-width: 1200px) {
  .footerResearch {
    position: relative;
    width: auto;
    bottom: inherit;
  }
}

.colorAlert {
  color: #FD493F;
}

.bgAlert {
  background: #FD493F;
}

.bgAlertAlfa {
  background: #F8D7DA;
}

.colorAlertAlfa {
  color: #491217;
}

label {
  font-weight: lighter;
}

.z-index-n1 {
  z-index: 10;
}

.h-autoText {
  min-height: 420px;
}

.btnSecondary {
  border-width: 3px;
}

.btnToggle .btn {
  display: inline-block;
  padding: 8px 10px;
  position: relative;
  text-align: center;
  border-radius: 0;
  transition: background 600ms ease, color 600ms ease;
}

.btnToggle div {
  width: fit-content;
  box-shadow: inset 0px 0px 0px 1px #ced4daa6;
  border: solid 1px #ced4da;
  border-radius: 32px;
}

input[type="radio"].toggle {
  display: none;
}

input[type="radio"].toggle+label {
  cursor: pointer;
  min-width: 40px;
  min-height: 40px;
  margin: 0;
}

input[type="radio"].toggle+label:hover {
  background: none;
  color: #0A467A;
}

input[type="radio"].toggle+label:after {
  background: #0A467A;
  border-radius: 25px;
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
  width: 100%;
  z-index: -1;
}

.btnToggle input[type="radio"].toggle.toggle-left+label {
  border-right: 0;
}

.btnToggle input[type="radio"].toggle.toggle-left+label:after {
  left: 100%;
}

.btnToggle input[type="radio"].toggle.toggle-right+label:after {
  left: -100%;
}

.btnToggle input[type="radio"].toggle:checked+label {
  cursor: default;
  color: #fff;
  transition: color 200ms;
}

.btnToggle input[type="radio"].toggle:checked+label:after {
  left: 0;
}
</style>
