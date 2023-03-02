<!-- eslint-disable no-console -->
<template lang="pug">
BModal(size="xl" scrollable centered hide-footer hide-header :id="modalId")
    BRow(class="mt-3 ml-2 justify-content-between")
        BCol(class="col-auto")
            h4(class="m-0") Detalle de factura de compra
            p(class="w-100 text-muted") *Campos obligatorios
        BCol(class="col-auto")
            BButton(variant="outline-dark" class="font-weight-bold border-0" @click="$bvModal.hide(modalId)")
    BRow()
        BForm(class="w-100")
            b(class="w-100 d-flex flex-wrap justify-content-around align-items-center py-2")
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") No. identificación:
                    h6(class="font-weight-bold")  {{ invoice.noIdentificacion }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Tipo comprobante:
                    h6(class="font-weight-bold")  {{ invoice.tipoComprobante }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Régimen Fiscal del Receptor:
                    h6(class="font-weight-bold")  {{invoice.regimenFiscalReceptor}}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Estatus:
                    h6(class="font-weight-bold")  {{ invoice.estatus }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Uso de CFDI:
                    h6(class="font-weight-bold")  {{ invoice.usoCFDI }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Impuesto:
                    h6(class="font-weight-bold")  {{ invoice.impuesto }}
                BCol(lg="5" class="text-center text-lg-left col-auto col-xl-auto mt-2 mb-1 px-0 px-2 py-3 border rounded")
                    h6(class="font-weight-light") Emisión:
                    BRow(class="flex-nowrap")
                        BCol(class="d-flex justify-content-around align-items-center")
                            img(class="mr-2" width="18px" src="../assets/img/icons/icon-balance/calendar.svg" )
                            h6(class="font-weight-bold m-0") {{ invoice.fechaEmision }}
                        BCol(class="d-flex justify-content-around align-items-center")
                            img(class="mx-2" width="20px" src="../assets/img/icons/icon-balance/time.svg")
                            h6(class="font-weight-bold m-0") {{ invoice.fechaEmision }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") RFC de Receptor:
                    h6(class="font-weight-bold")  {{ invoice.rfcReceptor }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Receptor:
                    h6(class="font-weight-bold")  {{ invoice.receptor }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") RFC de Emisor:
                    h6(class="font-weight-bold")  {{ invoice.rfcEmisor }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Emison:
                    h6(class="font-weight-bold")  {{ invoice.emisor }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Descripción:
                    h6(class="font-weight-bold")  {{ invoice.descripcion }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Cantidad de Litros:
                    h6(class="font-weight-bold")  {{ invoice.cantidad }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") UUID:
                    h6(class="font-weight-bold")  {{ invoice.uuid }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Importe:
                    h6(class="font-weight-bold")  {{ invoice.importeConcepto }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Importe de Impuesto:
                    h6(class="font-weight-bold")  {{ invoice.importeImpuesto }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Subtotal:
                    h6(class="font-weight-bold")  {{ invoice.subtotal }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Descuento:
                    h6(class="font-weight-bold")  {{ invoice.descuento }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Total sin descuento::
                    h6(class="font-weight-bold")  {{ invoice.total }}
                BCol(cols="12" sm="12" md="12" lg="5" class="text-center text-lg-left col-xl-auto mt-2 mb-1 ml-lg-2")
                    h6(class="font-weight-light") Total con descuento::
                    h6(class="font-weight-bold")  {{ invoice.totalMXN}}
    BRow(class="position-relative z-index-n1 justify-content-around mt-4 font-weight-bold")
        BCol(class="col-auto")
            BFormGroup(class="btnToggle" id="" label="*Incluir factura en Balance Actual:" label-for="factura")
                input(class="toggle toggle-left" id="toggle-on-factura" name="toggle-biometricos2" value="true" type="radio" v-model="inBalance")
                label(class="btn" for="toggle-on-factura") Si
                input(class="toggle toggle-right" id="toggle-off-factura" name="toggle-biometricos2" value="false" type="radio" v-model="inBalance")
                label(class="btn" for="toggle-off-factura") No
        BCol(class="col-auto")
            BFormGroup(class="btnToggle" id="" label="*Cambiar Fecha de Aplicación en Balance:" label-for="fecha")
                input(class="toggle toggle-left" id="toggle-on-fecha" name="fecha" value="normal" type="radio" v-model="state")
                label(class="btn" for="toggle-on-fecha") Si
                input(class="toggle toggle-right" id="toggle-off-fecha" name="fecha" value="disabled" type="radio" v-model="state")
                label(class="btn" for="toggle-off-fecha") No
        BCol(cols="12" sm="12" md="6")
            h5(class="m-0 my-1 text-muted") En caso de discrepancias, puede incluir o no la
                b(class="text-secondary")
                    i  Factura en el Balance
    BRow(class="justify-content-around mt-4 font-weight-bold")
        BCol(class="col-auto mt-4")
            BFormGroup(id="" label="*Fecha nueva de Aplicación en Balance:" label-for="*Fecha nueva de Aplicación en Balance:")
                BFormDatepicker( placeholder="Ingresa una fecha" v-model="fechaNuevaAplicacion"  :disabled="disabled" )
        BCol(class="col-auto mt-4")
            BFormGroup(id="" label="Hora nueva de Aplicación en Balance:" label-for="*Fecha nueva de Aplicación en Balance:")
                BTime( placeholder="Ingresa una hora" v-model="horaNuevaAplicacion" :disabled="disabled")
        BCol(cols="12" sm="12" md="6" lg="5" xl="4" class=" mt-4")
            BFormGroup(id="" label="*Detalle de la Justificación del Cambio:" label-for="Detalle de la Justificación del Cambio")
                BFormTextarea( id="textarea" v-model="justificacionCambio" placeholder="Detalla por qué se realiza el cambio en la fecha de la factura" rows="3" max-rows="6"  :disabled="disabled")
    b(class="d-flex justify-content-center my-4")
        BRow(class="justify-content-around align-items-center w-50")
            BButton(variant="outline-dark" class="font-weight-bold border-0" @click="$bvModal.hide(modalId)")
                h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Cerrar
            BButton(v-b-modal.modal-changes variant="primary" @click="editInvoice")
                h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Aplicar Cambio
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BRow, BCol, BButton, BModal, ModalPlugin, BFormInput, BFormTextarea, BTime } from 'bootstrap-vue'

Vue.component('BRow', BRow)
Vue.component('BCol', BCol)
Vue.component('BButton', BButton)
Vue.component('BModal', BModal)
Vue.component('BFormInput', BFormInput)
Vue.component('BFormTextarea', BFormTextarea)
Vue.component('BTime', BTime)
Vue.use(ModalPlugin)
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

@Component
export default class ModalDetailBilling extends Vue {
  fechaNuevaAplicacion = ''
  horaNuevaAplicacion = ''
  justificacionCambio = ''
  inBalance = true
  changeDateApplication = false
  state = 'disabled'

  get invoice (): Invoice {
    return this.$store.state.balance.invoice
  }

  get disabled () {
    return this.state === 'disabled'
  }

  modalId = this.$store.state.balance.modalDetailId

  editInvoice () {
    const data = {
      fechaNuevaAplicacion: this.fechaNuevaAplicacion,
      horaNuevaAplicacion: this.horaNuevaAplicacion,
      justificacionCambio: this.justificacionCambio,
      inBalance: this.inBalance
    }
    // eslint-disable-next-line no-console
    // console.log('data', data)
    this.$store.commit('balance/SET_PROPS_INVOICE', data)
    this.$store.commit('balance/EDIT_INVOICE', this.invoice)
    this.$bvModal.hide(this.$store.state.balance.modalDetailId)
    this.$store.commit('balance/SET_PROPS_INVOICE', {
      fechaNuevaAplicacion: '',
      horaNuevaAplicacion: '',
      justificacionCambio: '',
      inBalance: true
    })
    // eslint-disable-next-line no-console
    // console.log(this.$store.state.balance.invoices)
  }
}
</script>
<style>
#modal-bill .modal-dialog {
    transform: none;
    width: 85vw;
    max-width: 1430px !important;
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
