<template lang="pug">
BModal(id="modalEditSearch" size="xl" scrollable centered hide-footer hide-header style="height: 700px")
  BRow
    BCol(class="mt-4")
      h1(class="text-center font-weight-bold text-secondary mx-md-5") {{title}}
  BRow
    BForm(class="w-100")
      BRow(class="w-100 d-flex flex-wrap justify-content-around align-items-start")
        BCol(cols="col-auto mt-4 ml-4")
          BFormGroup(class="m-0 mb-2")
            BFormRadio(class="my-1" name="some-radios" v-model="item.invoiceType" value="Facturas de compra y venta") Facturas de compra y venta
            BFormRadio(class="my-1" name="some-radios" v-model="item.invoiceType" value="Solo facturas de compra") Solo facturas de compra
            BFormRadio(class="my-1" name="some-radios" v-model="item.invoiceType" value="Solo facturas de venta") Solo facturas de venta
        BCol(cols="10" sm="10" md="6" lg="6" class="col-xl-auto mt-4")
          b-form-group(class="btnToggle" id="" label="*Balance:" label-for="balance")
            input(
              id="toggle-on-balance-edit"
              class="toggle toggle-left"
              name="toggle-balance"
              value="Diario"
              type="radio"
              v-model="item.balanceType"
            )
            label(class="btn" for="toggle-on-balance-edit") &nbsp;&nbsp;Diario&nbsp;&nbsp;
            input(
              id="toggle-off-balance-edit"
              class="toggle toggle-right"
              name="toggle-balance"
              value="Mensual"
              type="radio"
              v-model="item.balanceType"
            )
            label(class="btn" for="toggle-off-balance-edit") Mensual
        BCol(cols="10" sm="10" md="6" lg="6" class="col-xl-auto mt-4")
          BFormGroup(id="" label="*Fecha desde:" label-for="fecha desde")
            BFormDatepicker(
              placeholder="Ingresa una fecha"
              :hide-header="true"
              v-model="item.dateFrom"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              style="width: 100%"
            )
        BCol(cols="10" sm="10" md="6" lg="6" class="col-xl-auto mt-4")
          BFormGroup(id="" label="*Fecha hasta:" label-for="fecha hasta")
            BFormDatepicker(
              placeholder="Ingresa una fecha"
              :hide-header="true"
              v-model="item.dateTo"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              style="width: 100%"
            )
      b(class="d-flex justify-content-center my-4")
        BRow(class="justify-content-around align-items-center w-75")
          BButton(variant="outline-dark" class="font-weight-bold border-0" @click="$bvModal.hide(modalId)")
            h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") No, regresar
          BButton(variant="primary" @click="$emit('toggleSearch',item)")
            h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Editar búsqueda
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BRow, BCol, BButton, BModal, ModalPlugin, BForm, BFormGroup, BFormRadio, BFormDatepicker } from 'bootstrap-vue'

Vue.component('BRow', BRow)
Vue.component('BCol', BCol)
Vue.component('BButton', BButton)
Vue.component('BModal', BModal)
Vue.component('BForm', BForm)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BFormRadio', BFormRadio)
Vue.component('BFormDatepicker', BFormDatepicker)
Vue.use(ModalPlugin)

@Component
export default class ModalEditSearch extends Vue {
  @Prop(String) modalId: String = ''
  @Prop(String) title: String = ''
  @Prop(Object) item: Object = {}
}
</script>
<style>
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
