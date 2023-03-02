<template lang="pug">
b-row.main-body
  b-col.p-3.bg-light(cols='12')
    div.row
      div(class='col-md-12')
        div.card
          div.card-body
            BTabs( pills card vertical)
              BTab( disabled)
                <template #title>
                  div.mb-2
                    img(src="../assets/img/logotipo.svg")
                </template>
              BTab(title="General" active)
                General(:instrumentoId="instrumentoId")
              BTab(title="Certificados")
                Certificados(:instrumentoId="instrumentoId")
              BTab(title="Gestión documental")
                GestionDocumental(:instrumentoId="instrumentoId")

</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BTabs, BTab, BCardText } from 'bootstrap-vue'
import General from '~/components/detalleInstrumentos/General.vue'
import Certificados from '~/components/detalleInstrumentos/Certificados.vue'
import GestionDocumental from '~/components/detalleInstrumentos/GestionDocumental.vue'

Vue.component('BTabs', BTabs)
Vue.component('BTab', BTab)
Vue.component('BCardText', BCardText)
Vue.component('General', General)
Vue.component('Certificados', Certificados)
Vue.component('GestionDocumental', GestionDocumental)

@Component
export default class DetalleInstrumento extends Vue {
  data () {
    return {
      instrumentoId: Number(this.$route.query.id)
    }
  }
}
</script>
<style>
.card-header{
  background-color: #fff;
  border-right: 1px solid #ddd;
}
</style>
