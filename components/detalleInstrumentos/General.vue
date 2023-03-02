<template lang="pug">
BCardText()
  div
    div.row
      div.col-md-5
        BFormGroup(label="Código")
          BFormInput( v-model.trim="instrumento.codigo" readonly)
      div.col-md-7
        BFormGroup(label="Fecha de Alta")
          BFormInput( v-model.trim="instrumento.fechaAlta" readonly)
    div.row
      div.col-md-12
        BFormGroup(label="Nombre completo")
          BFormInput( v-model.trim="instrumento.nombre" readonly)
    div.row
      div.col-md-4
        BFormGroup(label="Ubicación")
          BFormInput( v-model.trim="instrumento.ubicacion" readonly)
      div.col-md-4
        BFormGroup(label="Marca")
          BFormInput( v-model.trim="instrumento.marca" readonly)
      div.col-md-4
        BFormGroup(label="Modelo")
          BFormInput( v-model.trim="instrumento.modelo" readonly)
    div.row
      div.col-md-6
        BFormGroup(label="Amplitud de medición")
          BFormInput( v-model.trim="instrumento.amplitudMedicion" readonly)
      div.col-md-6
        BFormGroup(label="Frecuencia de Calibración")
          BFormInput( v-model.trim="instrumento.frecuenciaCalibracion" readonly)
    div.row
      div.col-md-4
        BFormGroup(label="Exactitud Requerida")
          BFormInput( v-model.trim="instrumento.exactitudRequerida" readonly)
      div.col-md-4
        BFormGroup(label="Incertidumbre")
          BFormInput( v-model.trim="instrumento.incertidumbre" readonly)
      div.col-md-4
        BFormGroup(label="*Número de Serie")
          BFormInput( v-model.trim="instrumento.noSerie" readonly)
    div.row
      div.col-md-4
        BFormGroup(label="Número de certificado")
          BFormInput( v-model.trim="instrumento.noCertificado" readonly)
      div.col-md-4
        BFormGroup(label="Número de patrón")
          BFormInput( v-model.trim="instrumento.noPatron" readonly)
      div.col-md-4
        BFormGroup(label="Vigencia del patrón")
        BFormInput( v-model.trim="instrumento.vigenciaPatron" readonly)
    div.row
      div.col-md-4
        BFormGroup(label="Última calibración")
          BFormInput( v-model.trim="instrumento.ultimaCalibracion" readonly)
      div.col-md-6
        BFormGroup(label="*Tipo instrumento")
          BFormInput( v-model.trim="instrumento.tipo" readonly)
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BTabs, BTab, BCardText, BFormGroup, BFormInput, BFormCheckbox } from 'bootstrap-vue'
import { formatDate } from '~/assets/js/functions'
Vue.component('BTabs', BTabs)
Vue.component('BTab', BTab)
Vue.component('BCardText', BCardText)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BFormInput', BFormInput)
Vue.component('BFormCheckbox', BFormCheckbox)

@Component
export default class General extends Vue {
  @Prop(Number) instrumentoId: number | undefined

  $axiosSgm: any
  data () {
    return {
      instrumento: {
        id: this.instrumentoId,
        codigo: '',
        fechaAlta: '',
        nombre: '',
        ubicacion: '',
        marca: '',
        modelo: '',
        amplitudMedicion: '',
        frecuenciaCalibracion: '',
        exactitudRequerida: '',
        incertidumbre: '',
        noSerie: '',
        noCertificado: '',
        noPatron: '',
        vigenciaPatron: '',
        ultimaCalibracion: '',
        tipo: ''
      }
    }
  }

  async created () {
    const datos = await this.getInstrumentoById(this.instrumentoId)
    const instrumento = datos.instrumento

    if (instrumento !== null) {
      this.$data.instrumento = instrumento[0]
      this.$data.instrumento.fechaAlta = formatDate(instrumento[0].fechaAlta)
      this.$data.instrumento.ultimaCalibracion = formatDate(instrumento[0].ultimaCalibracion)
      this.$data.instrumento.vigenciaPatron = instrumento[0].vigenciaPatron ? formatDate(instrumento[0].vigenciaPatron) : 'INDEFINIDA'
    }
  }

  async getInstrumentoById (id:any) {
    const datos:any = await this.$axiosSgm.$get(`/instrumento/${id}`)
    return datos
  }
}
</script>
