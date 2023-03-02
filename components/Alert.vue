<template lang="pug">
BCol
    BRow.flex-nowrap.position-relative.align-items-start.bgAlertAlfa.p-4.mt-2.mb-5.rounded
      .position-absolute.triangleContainer
        img(width='25px' src='assets/img/icons/icon-alert/triangle.svg')
      img.mx-2.mt-1(width='25px' src='assets/img/icons/icon-alert/alert.svg')
      b
        h3(colorAlertAlfa.font-weight-light)
          b(font-weight-bold)  Alerta detectada.
          | La
          i
            u diferencia de Litros
          | supera el % limite permitido. Favor de revisar la conciliaci&oacute;n
        h5(mt-3)
          | Se envi&oacute;
          b ALERTA
          |  a bit&aacute;cora de operaciones para su futura revisi&oacute;n
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BRow, BCol } from 'bootstrap-vue'

Vue.component('BRow', BRow)
Vue.component('BCol', BCol)

@Component
export default class Alert extends Vue {

}
</script>
<style scoped>
.colorAlert{
    color: #FD493F;
  }

.bgAlert{
    background: #FD493F;
  }

.bgAlertAlfa{
    background: #F8D7DA;
  }

.colorAlertAlfa{
    color: #491217;
  }
label {
    font-weight: lighter;
  }
</style>
