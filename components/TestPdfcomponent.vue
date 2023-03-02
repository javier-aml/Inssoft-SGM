<!--
<template lang="pug">
div
  b-button(type="button" @click="downloadPdf()") Descargar
  vue-html2pdf(ref="pdftoconvert",
    :show-layout="true"
    :float-layout="false"
    :enable-download="true"
    :preview-modal="true"
    :paginate-elements-by-height="1100"
    filename="PDfTest"
    :pdf-quality="2"
    :manual-pagination="false"
    pdf-format="letter"
    pdf-orientation="landscape"
    pdf-content-width="800px"
    :html-to-pdf-options={
    html2canvas: {
        scale: 1,
        useCORS: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    }
    @hasStartedGeneration="hasStartedGeneration()"
    @hasGenerated="hasGenerated($event)"
    @beforeDownload="beforeDownload($event)"
  )
    section#test(slot="pdf-content")
       meta(charset="UTF-8")
        style(type="text/css").

          @media print {
                  body{
                  width: 21cm;
                  height: 29.7;
                  margin: 30mm 45mm 30mm 45mm;
                  page-break-after: always;
                      }
                      }
                      textarea {
                  resize: none;
                      }
                      p.saltodepagina
                  {
                    page-break-after: always;
                  }

        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width,initial-scale=1")
        title FSM_19
        link(href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css", rel="stylesheet", integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65", crossorigin="anonymous")
        //  Script para la barra de herramientas en textarea
        script(src="https://cdn.ckeditor.com/ckeditor5/35.4.0/inline/ckeditor.js")
        link(href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css", rel="stylesheet", integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65", crossorigin="anonymous")
        script(src="https://cdn.ckeditor.com/ckeditor5/35.4.0/inline/ckeditor.js")
        table.table.table-bordered.table-sm.align-middle(style="text-align:center;")
          thead.

          tbody
            tr
              td(rowspan="5")
                img.img-fluid(src="imagen")
                | Fotografia
              td(rowspan="3", colspan="2")
                h2 "Razon social del Cliente"
              td(style="background-color: lightgray;")
                label(for="permiso") PERMISO:
              td(style="background-color: lightgray;")
                h1
                  input.form-control.input-lg(type="text", name="permiso", placeholder="G/XXXX/EXP/ES/FE/XXXX")
            tr
              td(style="background-color: lightgray;")
                label(for="permiso") CLAVE:
              td(style="background-color:lightgray;")
                input.form-control(type="text", name="CLAVE", placeholder="G/XXXX/EXP/ES/FE/XXXX")
            tr
            tr
              td(rowspan="2", colspan="6", style="text-align:left")
                .container
                  h5
                    form
                      input.form-control-plaintext(type="text", name="CLAVE", placeholder="Nombre de la Estación")
            tr
            tr(style="text-align: center;")
              td(colspan="6") Sistema De Gestión De Las Mediciones
            tr(style="font-weight:bold; text-align: center; background-color: lightgray;")
              td(colspan="6") "Nombre para el archivo"
        br
        br
        .container-fluid
          .input-group
            span.input-group-text#basic-addon1(style="background-color: lightgray;") Nombre del Puesto
            input.form-control(type="text", placeholder="Inserte Nombre del puesto", aria-label="Username", aria-describedby="basic-addon1")
          .input-group
            span.input-group-text#basic-addon1(style="background-color: lightgray;") Proceso
            input.form-control(type="text", placeholder="Inserte Proceso", aria-label="Username", aria-describedby="basic-addon1")
          .input-group
            span.input-group-text#basic-addon1(style="background-color: lightgray;") Jefe Inmediato
            input.form-control(type="text", placeholder="Inserte Jefe Inmediato", aria-label="Username", aria-describedby="basic-addon1")
          .input-group
            span.input-group-text#basic-addon1(style="background-color: lightgray;") Personal a Cargo
            input.form-control(type="text", placeholder="Inserte Personal a Cargo", aria-label="Username", aria-describedby="basic-addon1")
          .Container-fluid
          table.table.table-bordered.input-group
            tbody
              tr
                td(style="background-color: lightgray;") Objetivo del Puesto
              tr
                td
                  textarea.form-control-plaintext(cols="198", rows="5", wrap="hard", placeholder="Describa el Objetivo del Puesto")
              tr
                td(style="background-color: lightgray;") Funciones Especifícas
              tr
                td
                  textarea.form-control-plaintext(cols="198", rows="5", wrap="hard", placeholder="Describa las Funciones Especifícas")
        .container-fluid
          table.table.table-bordered
            tbody
              tr
                td(style="background-color: lightgray;") Escolaridad
                td(style="background-color: lightgray;") Idiomas
              tr
                td
                  input.form-control-plaintext(type="text", name="ESCOLARIDAD", placeholder="Ingrese la Escolaridad")
                td
                  input.form-control-plaintext(type="text", name="IDIOMAS", placeholder="Ingrese los Idiomas")
              tr
                td(style="background-color: lightgray;") Edad
                td
                  input.form-control-plaintext(type="text", name="CLAVE", placeholder="Ingrese la Edad")
              tr
                td(style="background-color: lightgray;") Sexo
                td Indistinto
              tr
                td(style="background-color: lightgray;") Estado civil
                td Indistinto
          table.table.table-bordered
            tbody
              tr
                td(style="background-color: lightgray;") Experiencia Laboral
              tr
                td
                  textarea.form-control-plaintext(cols="198", rows="3", wrap="hard", placeholder="Describa la experiencia Laboral")
              tr
                td(style="background-color: lightgray;") Conocimientos Especifícos
              tr
                td
                  textarea.form-control-plaintext(cols="198", rows="3", wrap="hard", placeholder="Describa los Conocimientos que se Desean")
          table.table.table-bordered
            tbody
              tr
                td(style="background-color: lightgray;") Habilidades Requeridas
                td(style="background-color: lightgray;")
                td(style="background-color: lightgray;")
              tr
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
              tr
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
              tr
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
              tr
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
                td
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Habilidad")
              tr
                td(style="background-color: lightgray;") Equipo Requerido
                td(style="background-color: lightgray;")
                td(style="background-color: lightgray;")
              tr
                td.align-middle(scope="row", style="background-color: lightgray;") Equipo de Protección Personal
                td(colspan="3")
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Ingrese el Equipo de Proteccion")
              tr
                td.align-middle(scope="row", style="background-color: lightgray;") Equipo de Computo
                td(colspan="3")
                  input.form-control-plaintext(type="text", name="Habilidades", placeholder="Ingrese el Equipo de Computo")
          .row
            .col-8
              table.table.table-bordered
                tbody
                  tr
                    td(style="background-color: lightgray;") Esfuerzo Físico
                    td
                      select.form-control-plaintext(aria-label="Default select example")
                        option(selected) Nivel de Esfuerzo
                        option(value="1") Bajo
                        option(value="2") Medio
                        option(value="3") Alto
                  tr
                    td(style="background-color: lightgray;") Esfuerzo Técnico
                    td
                      select.form-control-plaintext(aria-label="Default select example")
                        option(selected) Nivel de Esfuerzo
                        option(value="1") Bajo
                        option(value="2") Medio
                        option(value="3") Alto
                  tr
                    td(style="background-color: lightgray;") Esfuerzo Mental
                    td
                      select.form-control-plaintext(aria-label="Default select example")
                        option(selected) Nivel de Esfuerzo
                        option(value="1") Bajo
                        option(value="2") Medio
                        option(value="3") Alto
                  tr
                    td(style="background-color: lightgray;") Esfuerzo Visual
                    td
                      select.form-control-plaintext(aria-label="Default select example")
                        option(selected) Nivel de Esfuerzo
                        option(value="1") Bajo
                        option(value="2") Medio
                        option(value="3") Alto
            .col-3
        br
        br
        .containe-fluid
          table.table.table-bordered
            tbody
              tr
                td(style="background-color: lightgray;") No. de Revisión.
                td(style="background-color: lightgray;") Fecha de Revisión
                td(style="background-color: lightgray;") Concepto o parte del documento que ha sido modificado sobre la anterior revisión.
              tr
                td
                  input.form-control-plaintext(type="text", name="No. de Revisión", placeholder="No.revisión")
                td
                  input.form-control-plaintext(type="date", name="fRevision")
                td
                  input.form-control-plaintext(type="text", name="Concepto o parte del documento", placeholder="INGRESE CONCEPTO DE CAMBIOS")
        br
        .container
          table.table.table-bordered(style="text-align:center;")
            thead.

            tbody
              tr
                td(style="background-color: lightgray;")
                  |
        Revisado por:

                  br
                  br
                  input.form-control(type="text", name="nombreResponsable", placeholder="INGRESE NOMBRE")
                  br
                  |
        Responsable del SGM

                td.

                td(style="background-color: lightgray;")
                  |
        |Aprobado por:

                  br
                  br
                  input.form-control(type="text", name="nombreAprueba", placeholder="INGRESE NOMBRE")
                  br
                  |
        |Dirección

        br
        div(style="text-align:center;")
          |
        Prohibida la reproducción total o parcial de este documento propiedad de

          .container.text-center
          b "Nombre del cliente"
        script(src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js", integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4", crossorigin="anonymous")
        script(src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js", integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3", crossorigin="anonymous")
        script(src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js", integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V", crossorigin="anonymous")
             //- iframe#PDFViewer(width="800", height="10000", src="/site/formatos-sgm/natgas/FSM30LISTADEVERIFICACIN.html")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
@Component({
  mixins: [validationMixin]
})
export default class TestPDF extends Vue {
  $axiosSgm: any
  // $html2canvas: any
  $VueHtml2pdf: any
  downloadPdf () {
    // 1.- Hacer pequeño el contenido del iframe a 300px ||  zoom 60% dependiendo de la calidad

    // 3.- tomar SS con generetePDF
    // 3.- Ver resultados y scalar imagen
    // 2.- pantalla de carga
    // 5.- regresar a normalidad
    // document.querySelector('#PDFViewer').style.zoom = .75
    this.$refs.pdftoconvert.generatePdf()
  }

  mounted () {
    console.log('hola')
    const element:any = document.getElementById('test')
    console.log(element)
    // console.log(this)
    // this.downloadPdf()
    // console.log(this.$refs.pdftoconvert.generatePdf())
    console.log(this.$refs.$pdftoconvert)
  }

  async beforeDownload ({ html2pdf, options, pdfContent }) {
    console.log(options.jsPDF.unit)
    await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(10)
        pdf.setTextColor(150)
        pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
      }
    }).save()
  }
}

</script> -->
