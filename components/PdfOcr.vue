<!-- eslint-disable vue/multi-word-component-names -->
<template lang="pug">
div
    b-button(class="bg-white border-0 p-0 mb-4" @click.prevent="showModalData" v-if="!ocrNormalizedM3 || !ocrReference || !ocrqualityReportName")
        h5(class="m-0 text-dark text-lg-left") Aún no cuentas con datos de consumo m
          b(class="subIndice") 3
          reporte calidad.
          u(class="text-primary ml-2") Agregar datos faltantes
    b-button(class="BtnData btn border bg-white mb-4" v-b-modal.modal-editData v-else)
      b-row(class="w-100 mx-0 flex-lg-nowrap justify-content-center align-items-center")
        b-col(class="p-2 mr-2 bg-secondary rounded p-1")
          img(width="26px" src="../assets/img/icons/editWhite.svg")
        b-col(class="mW-text px-1 text-left font-weight-bold")
          p(class="m-0 text-truncate text-secondary") Consumo corregidos
          p(class="m-0 text-dark text-truncate") {{ocrNormalizedM3}}
        b-col(class="mW-text px-2 text-left font-weight-bold")
          p(class="m-0 text-truncate text-secondary") Referencia
          p(class="m-0 text-dark text-truncate") {{ocrReference}}
        b-col(class="mW-text px-1 text-left font-weight-bold")
          p(class="m-0 text-truncate text-secondary") Reporte
          p(class="m-0 text-dark text-truncate") {{ocrqualityReportName}}

    // MODAL DATA
    b-modal(size='lg' scrollable='' centered='' hide-footer='' hide-header='' id="modal-data")
        b-row
            b-col(class="mt-4")
                h1(class="text-center font-weight-bold text-secondary mx-md-5") Agregar datos faltantes
        b-row(class="justify-content-center mt-4")
            b-col(class="my-2" cols='12' sm='12' md='6' lg='5')
                b-form-file(class="dropImput dropImputOcr" placeholder='Consumo corregido' drop-placeholder='Arrastra o adjunta una' accept=".pdf" v-model="correctedConsumption")
            b-col(class="my-2" cols='12' sm='12' md='6' lg='5')
                b-form-file(class="dropImput dropImputOcr" placeholder='Reporte calidad' drop-placeholder='Arrastra o adjunta un' accept=".pdf" v-model="qualityReport")
        b(class="d-flex justify-content-center my-4")
            b-row(class="justify-content-around align-items-center w-75")
                b-button(class="font-weight-bold border-0" variant='outline-dark' @click.prevent="hideModalData")
                    h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") En otro momento
                b-button(variant='primary' @click.prevent="getFiles")
                    h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Agregar archivos

    // MODAL LOADER
    b-modal(size="lg" scrollable centered hide-footer hide-header id="modal-loader")
      b-row
        b-col(class="mt-4")
          h1(class="text-center font-weight-bold text-secondary mx-md-5") Agregar datos faltantes
      b-row(class="flex-column justify-content-center align-items-center my-5")
        b-spinner(variant="secondary" style="width: 5rem; height: 5rem;")
      b-row(class="flex-column justify-content-center mt-4 text-center")
        h2
          b Leyendo documentos
        h3(class="font-weight-light") Puede tardar unos minutos

    // MODAL UPLOAD
    b-modal(size="lg" scrollable centered hide-footer hide-header id="modal-upload")
      b-row
        b-col(class="mt-4")
          h1(class="text-center font-weight-bold text-secondary mx-md-5") Agregar datos faltantes
      b-row(class="justify-content-center my-5")
        b-col(class="mx-md-2 my-4 col-md-auto" cols="10" sm="10" lg="5")
          h4(class="font-weight-bold mb-2") Consumo m
            b(class="subIndice") 3
            | corregidos
          b-row(class="align-items-center mt-4")
            b-col(class="col-auto")
              div(class="bg-primary rounded-circle a15")
            b-col(class="col-auto p-0")
              h6(class="m-0") {{ocrNormalizedM3}}
        b-col(class="mx-md-2 my-4 col-md-auto" cols="10" sm="10" md="6" lg="5")
          h4(class="font-weight-bold mb-2") Referencia
          b-row(class="align-items-center mt-4")
            b-col(class="col-auto")
              div(class="bg-primary rounded-circle a15")
            b-col(class="col-auto p-0")
              h6(class="m-0") {{ocrReference}}
        b-col(class="mx-md-2 my-4 col-md-auto" cols="10" sm="10" md="6" lg="5")
          h4(class="font-weight-bold mb-2") Reporte de calidad
          b-row(class="align-items-center mt-4")
            b-col(class="col-auto")
              div(class="bg-primary rounded-circle a15")
            b-col(class="col-auto p-0")
              h6(class="m-0") {{ocrqualityReportName}}
        b-col(class="my-4" cols="12" sm="12" md="6" lg="5")
      b(class="d-flex justify-content-center my-4")
        b-row(class="justify-content-around align-items-center w-100")
          b-button(variant="outline-dark" class="font-weight-bold border-0" @click.prevent="hideModalUpload")
            h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Subir de nuevo los documentos
          b-button(variant="primary")
            h5(class="m-0 p-2 px-4 font-weight-bold text-uppercase") Si, agregar

</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import { BSpinner } from 'bootstrap-vue'

Vue.component('BSpiner', BSpinner)

@Component({
  mixins: [validationMixin]
})

export default class Ocr extends Vue {
  $axiosSgm: any
  correctedConsumption: any = null
  correctedConsumptionB64: any = null
  qualityReport: any = null
  qualityReportB64: any = null
  ocrNormalizedM3: any = null
  ocrReference: any = null
  ocrqualityReportName: any = null

  showModalData () {
    this.$bvModal.show('modal-data')
  }

  hideModalData () {
    this.$bvModal.hide('modal-data')
  }

  showModalLoader () {
    this.$bvModal.show('modal-loader')
  }

  hideModalLoader () {
    this.$bvModal.hide('modal-loader')
  }

  showModalUpload () {
    this.$bvModal.show('modal-upload')
  }

  hideModalUpload () {
    this.$bvModal.hide('modal-upload')
  }

  base64Encode (data: any) {
    if (!data) {
      return null
    }

    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      } catch (err) {
        reject(err)
      }
    })
  }

  async pdfToJson (fileName: any, fileData: any) {
    const response = await this.$axiosSgm.$post('/pdfToJson', {
      fileName,
      fileData
    })
    // eslint-disable-next-line no-console
    return response
  }

  async getFiles () {
    try {
      this.showModalLoader()
      this.hideModalData()

      this.correctedConsumptionB64 = await this.base64Encode(this.correctedConsumption)
      const correctedConsumptionRes = await this.pdfToJson(this.correctedConsumption.name, this.correctedConsumptionB64)

      // eslint-disable-next-line no-console
      console.log(correctedConsumptionRes)

      this.qualityReportB64 = await this.base64Encode(this.qualityReport)
      const qualityReportRes = await this.pdfToJson(this.qualityReport.name, this.qualityReportB64)

      this.hideModalLoader()
      this.showModalUpload()

      if (correctedConsumptionRes) {
        // eslint-disable-next-line no-console
        this.ocrNormalizedM3 = correctedConsumptionRes.find((item: { title: string }) => item.title === 'm3Corregidos')
        this.ocrNormalizedM3 = this.ocrNormalizedM3 ? this.ocrNormalizedM3.text : ''
        this.ocrReference = correctedConsumptionRes.find((item: { title: string }) => item.title === 'referencia')
        this.ocrReference = this.ocrReference ? this.ocrReference.text : ''
      }

      if (qualityReportRes) {
        // eslint-disable-next-line no-console
        this.ocrqualityReportName = this.qualityReport.name
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      this.hideModalLoader()
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }
}
</script>
<style>
.customDropImputReporte span::after {
  content: "Reporte";
  text-transform: uppercase;
  font-weight: bold;
  display: block;
}

.dropImputOcr .form-file-text::after{
  content: none !important;
}

.dropImputOcr{
  cursor: pointer;
}

.dropImputOcr .custom-file-label{
  height: 110px !important;
}

.subIndice {
  font-size: 14px;
  vertical-align: super;
  margin-right: 2px;
}
</style>
