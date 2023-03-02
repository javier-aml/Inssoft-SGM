<template lang="pug">
BModal(size="lg" scrollable centered hide-footer hide-header :id="modalId")
  BRow
    BCol(class="mt-4")
      h1(class="text-center font-weight-bold text-secondary mx-md-5") {{title}}
  BRow(class="position-relative z-index-n1 my-4")
    BCol( class="text-center")
  div(class="d-flex justify-content-center my-4")
    BRow(class="justify-content-around align-items-center w-75")
      BButton(variant="outline-dark" class="font-weight-bold border-0" @click="$bvModal.hide(modalId)")
        h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") No, regresar

      BButton(variant="primary" @click="$emit('toggleDelete',itemId)")
        h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Aceptar
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BRow, BCol, BButton, BModal, ModalPlugin } from 'bootstrap-vue'

Vue.component('BRow', BRow)
Vue.component('BCol', BCol)
Vue.component('BButton', BButton)
Vue.component('BModal', BModal)
Vue.use(ModalPlugin)

@Component
export default class ModalConfirmation extends Vue {
  @Prop(String) modalId: String = ''
  @Prop(String) title: String = ''
  @Prop(Number) itemId: Number = 0
}
</script>
