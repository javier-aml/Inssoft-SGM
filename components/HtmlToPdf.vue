
<template lang="pug">
doctype html
html(lang='en')
 head
  // SCRIPTS REQUIRED BY THE FORMATS
  script(v-if="loadScripts" script type="text/javascript" src='https://cdn.jsdelivr.net/npm/handlebars@4.7.7/dist/handlebars.min.js' class="format-script")
  script(v-if="loadScripts" script type="text/javascript" src='/site/natgas/NatGas-handlebar.js' class="format-script")
  script(v-if="loadScripts" script type="text/javascript" src='https://cdn.ckeditor.com/ckeditor5/35.4.0/inline/ckeditor.js' class="format-script")
  script(v-if="loadScripts" script type="text/javascript" src='/site/natgas/NatGas-formats.js' class="format-script")
  script(v-if="loadScripts" script type="text/javascript" src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js' class="format-script")
  script(v-if="loadScripts" script type="text/javascript" src='https://cdn.jsdelivr.net/npm/chart.js@4.2.1/dist/chart.umd.min.js' class="format-script")
 body
  input(type="button" onCLick="fill_template()" ref="renderHeaderBtn" class="d-none")
  input(type="button" onCLick="renderInlineEditor()" ref="renderEditorBtn" class="d-none")
  input(type="button" onCLick="renderChart()" ref="renderChartBtn" class="d-none")
  div(class="d-flex justify-content-center" v-if="isLoading")
    b-spinner(big v-if="true")
    p(class="ml-2 mt-1 text-lg") Cargando datos
  span(v-show="isValidFormat")
    span(ref="content" id="content" v-show="!isLoading")
    div(class="mt-1 d-flex justify-content-end gap-3" v-if="!isLoading")
      b-button(@click.prevent="closeModalHandler" :disabled="isDisabled" variant="danger") Cancelar
      b-button(@click.prevent="htmlToPdf" class="ml-1" :disabled="isDisabled" variant="success") Guardar
        b-spinner(small class="ml-1" v-if="isDisabled")
  div(class="d-flex justify-content-center" v-if="!isValidFormat && !isLoading")
    p(class="ml-2 mt-1 text-lg") No se encontró el formato

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import { BSpinner } from 'bootstrap-vue'

const html2pdf = require('html2pdf.js')

Vue.component('BSpiner', BSpinner)

@Component({
  mixins: [validationMixin]
})

export default class HtmlToPdf extends Vue {
  $axiosSgm: any
  html2pdf: Function | undefined

  SCRIPT_COUNT: number = 6
  CANVAS_MAX_WIDTH: string = '730px'

  isLoading: boolean = true
  isValidFormat: boolean = false
  isDisabled: boolean = false
  loadScripts: boolean = false
  formatTile: string = ''

  @Prop(Number) readonly companyId: Number | undefined
  @Prop(String) readonly fileName: String | undefined
  @Prop() readonly idTarea: Number | undefined

  fecthFormatTitle () {
    const titleInput = document.getElementById('CLAVE') as HTMLInputElement
    titleInput.value = this.formatTile
  }

  // FETCH HTML CONTENT
  async fetchHtmlContent () {
    const endPoint = `/api/getFormats/${this.$props.companyId}/${this.$props.fileName}`

    try {
      return await this.$axiosSgm.$get(endPoint)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return null
    }
  }

  // FETCHES HTML DATA AND PARSE IT
  renderHTMLFormat (htmlContent: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const htmlContaniner = (this.$refs.content as HTMLSpanElement)
        const renderHeaderBtn = (this.$refs.renderHeaderBtn as HTMLInputElement)
        const renderEditorBtn = (this.$refs.renderEditorBtn as HTMLInputElement)
        const renderChartBtn = (this.$refs.renderChartBtn as HTMLInputElement)

        const tempContainer = document.createElement('div')
        tempContainer.innerHTML = htmlContent

        // GET FORMAT TITLE
        const formatTitleTag = tempContainer.getElementsByTagName('title')
        this.formatTile = formatTitleTag.length ? formatTitleTag[0].innerText : ''

        // REMOVES ALL LINK TAGS FROM DE HTML FORMATS
        tempContainer.querySelectorAll('link').forEach((item) => { item.remove() })
        htmlContaniner.innerHTML = tempContainer.innerHTML

        // SELECTS THE FILE REPOSITORY
        const filePath = [
          { id: 1, path: 'natgas' },
          { id: 2, path: 'tomza' },
          { id: 3, path: 'kansas' },
          { id: 4, path: 'togo' }
        ].find(item => item.id === +this.$props.companyId)

        // EXECUTES SCRIPTS USED IN THE FORMATS
        setTimeout(() => { // SORRY
          if (document.getElementById('output')) {
            renderHeaderBtn.click() // RENDER HANDLE BAR DYNAMIC HEADER
            this.fecthFormatTitle() // RENDER TITLE
          }
          renderEditorBtn.click() // RENDER CKEDITOR
          renderChartBtn.click() // RENDER CHART

          // REPLACE AL IMAGE BASE DIR
          htmlContaniner.querySelectorAll('img').forEach((item: { src: string }) => {
            const SgmFileBase = process.env.SgmFileBase
            const localBaseUrl = window.location.origin + this.$nuxt.context.base
            item.src = `${SgmFileBase}/${filePath?.path}/${item.src.replace(localBaseUrl, '')}`
          })

          resolve(true)
        }, 1000)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        reject(error)
      }
    })
  }

  // CONVERTS LINE BREAKS FROM TEXTAREAS TO DIV TAGS WITH BR TAG(PDF GENERATOR IGNORES LINE BREAKS ON TEXT AREAS)
  renderLineBreaks (): void {
    const htmlContaniner = this.$refs.content as HTMLSpanElement
    const textAreaCol = htmlContaniner.getElementsByTagName('textarea') as HTMLCollectionOf<HTMLTextAreaElement>

    let textAreaArr = Array.from(textAreaCol)
    textAreaArr = textAreaArr.filter(item => item.value.trim())
    textAreaArr.forEach((item: HTMLTextAreaElement) => {
      // REPLACES LINE BREAKS \r FOR <br/>
      const parsedContent = item.value.replace(/\r?\n/g, '<br/>')
      const divTag = document.createElement('div')

      divTag.style.display = 'none'
      divTag.classList.add('text-div')
      divTag.innerHTML = parsedContent
      item.classList.add('text-area')
      if (item.parentNode) {
        item.parentNode.appendChild(divTag)
      }
    })
  }

  // RESIZE CANVAS FROM CHART TO FIT IN THE PDF FILE
  resizeCanvas (toogle : boolean) {
    const htmlContaniner = (this.$refs.content as HTMLSpanElement)

    Array.from(htmlContaniner.getElementsByTagName('canvas')).forEach((item : HTMLCanvasElement) => {
      item.style.maxWidth = toogle ? this.CANVAS_MAX_WIDTH : 'auto'
      item.style.height = 'auto'
    })
  }

  // GENERATES DE PDF FILE(BLOB)
  async generatePdfFile (): Promise<FormData> {
    this.renderLineBreaks()
    this.resizeCanvas(true)

    const htmlContaniner = (this.$refs.content as Element)

    // SWITCH THE TEXT AREAS TO THE RENDERED DIV'S IN ORDER TO RENDER LINE BREAKS
    Array.from(htmlContaniner.getElementsByClassName('text-area') as HTMLCollectionOf<HTMLTextAreaElement>).forEach((item) => { item.style.display = 'none' })
    Array.from(htmlContaniner.getElementsByClassName('text-div') as HTMLCollectionOf<HTMLDivElement>).forEach((item) => { item.style.display = '' })

    const options = {
      margin: [0.8, 0.3, 0.8, 0.3],
      to: 'pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { avoid: ['input', 'tr'] }
    }

    const blob = await html2pdf().set(options).from(this.$refs.content).outputPdf('blob')
    const formData = new FormData() as FormData
    formData.append('upl', blob, `${this.$props.fileName}.pdf`)

    // SWITCH BACK THE TEXT AREAS AND HIDE THE DIV'S
    Array.from(htmlContaniner.getElementsByClassName('text-area') as HTMLCollectionOf<HTMLTextAreaElement>).forEach((item) => { item.style.display = '' })
    Array.from(htmlContaniner.getElementsByClassName('text-div') as HTMLCollectionOf<HTMLDivElement>).forEach((item) => { item.style.display = 'none' })

    this.resizeCanvas(false)

    return formData
  }

  // UPLOADS THE PDF FILE
  async uploadPdfFile (companyId: number, formData: FormData) {
    // GET ENDPOINT
    const endPoint = [
      { id: 1, endPoint: '/api/uploadPDFNatgas/' },
      { id: 2, endPoint: '/api/uploadPDFTomza/' },
      { id: 3, endPoint: '/api/uploadPDFKansas/' },
      { id: 4, endPoint: '/api/uploadPDFTogo/' }
    // eslint-disable-next-line eqeqeq
    ].find(item => item.id === +companyId)?.endPoint

    if (!endPoint) { throw new Error('Endpoint not found') }

    // UPLOADS FILE
    if (process.env.SgmUrlBase) {
      await fetch(process.env.SgmUrlBase + endPoint + this.idTarea, {
        method: 'POST',
        body: formData
      })
    }
  }

  // GENERATES PDF FILE AND UPLOAD IT TO THE FILE REPO
  async htmlToPdf () {
    this.isDisabled = true
    try {
      const pdfFile = await this.generatePdfFile()
      const companyId = this.$props.companyId
      await this.uploadPdfFile(companyId, pdfFile)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    this.isDisabled = false

    this.closeModalHandler()
  }

  closeModalHandler () {
    this.$emit('closeModal')
  }

  async mounted () {
    interface document {
      htmlToPdfLoaded: Boolean
    }
    const window_ = document as unknown as document

    // VALIDATES THAT SCRIPTS ARE ONLY ADDED ONCE
    this.loadScripts = !window_.htmlToPdfLoaded

    // GET HTML FORMAT
    const htmlContent = await this.fetchHtmlContent()

    // VALIDATE HTML FORMAT
    this.isValidFormat = htmlContent ? Object.keys(htmlContent).length > 0 : false

    if (!this.isValidFormat) {
      // eslint-disable-next-line no-console
      console.error('File not found')
    }

    // RENDER HTML FORMAT
    await this.renderHTMLFormat(htmlContent)

    this.isLoading = false
    window_.htmlToPdfLoaded = true
  }
}
</script>
<style>
body {
/*STYLES USED TO SHOW CKEDITOR IN B-MODAL*/
--ck-z-default: 100;
--ck-z-modal: calc( var(--ck-z-default) + 999 );
}
</style>
