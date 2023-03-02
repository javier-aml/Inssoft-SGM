<template lang="pug">
b-container.text-center(fluid)
  .text-center
  b-row
    b-col
      b-container
        b-row
          b-col.input-group.col-8.float-end(style='margin-left: 24%;')
            span#inputGroupPrepend.input-group-text Año
            input#ano.form-control.input-group.col-4.float-end(style='margin-right : 2%;' type='text' placeholder='YY/YYYY' aria-describedby='inputGroupPrepend')
            span#inputGroupPrepend.input-group-text Mes
            input#mes.form-control(style='margin-right : 2%;' type='text' placeholder='MM' aria-describedby='inputGroupPrepend').input-group.col-4.float-end
            span#inputGroupPrepend.input-group-text Dia
            input#dia.form-control(type='text' placeholder='DD' aria-describedby='inputGroupPrepend')
        a#cambiarFecha.col-2.float-end.button.btn.btn-ekide.d-none.d-lg-block(@click='changeFecha' type='button' style='margin-left: 74%;margin-top:2%;') Cambiar Fecha
  .row
    .col-12
      .containerRight.text-center
        h3 Compra
        .table-responsive
          table.table
            thead
              tr
                th(scope='col').

                  Rfc emisor

                th(scope='col').

                  Emisor

                th(scope='col').

                  Rfc receptor

                th(scope='col').

                  Receptor

                th(scope='col').

                  Fecha

                th(scope='col-4').
                  Descripción

                th(scope='col').

                  Cantidad

                th(scope='col').

                  Moneda

                th(scope='col').

                  Total

                th(scope='col').

                  Total MXN

            tbody#bodyCompraTable
              tr#key.detalleFactura(data-bs-toggle='modal' data-bs-target='#compraDetallado')
                td RFCEmisor
                td Emisor
                td RFCReceptor
                td Receptor
                td Fechacompleta
                td.col-5 Descripcion
                td Cantidad
                td Moneda
                td Total
                td TotalMXN
  .row
    b-container(fluid)
      b-row
        b-col.input-group.col-2.float-end(style='margin-left: 55%;')
          span#inputGroupPrepend.input-group-text Total MXN
          input#totalMXN.form-control(type='text' readonly aria-describedby='inputGroupPrepend')
        b-col.input-group.col-2.float-end
          span#inputGroupPrepend.input-group-text Total Litros
          input#totalLts.form-control(type='text' readonly aria-describedby='inputGroupPrepend')
  .row
    .col-12.w-25.p-3
      .containerRight.text-center
        h3 Venta
        .table-responsive
          table.table
            thead
              tr
              th(scope='col').

                Rfc emisor

              th(scope='col').

                Emisor

              th(scope='col').

                Rfc receptor

              th(scope='col').

                Receptor

              th(scope='col').

                Fecha

              th(scope='col').

                Descripción

              th(scope='col').

                Cantidad

              th(scope='col').

                Moneda

              th(scope='col').

                Total

              th(scope='col').

                Total MXN

            tbody#bodyVentaTable
              tr.detalleFacturaVenta(data-bs-toggle='modal' data-bs-target='#VentaDetallado')
              td RFCEmisor
              td Emisor
              td RFCReceptor
              td Receptor
              td Fechacompleta
              td Descripcion
              td Cantidad
              td Moneda
              td Total
              td TotalMXN
  .row
    b-container(fluid)
      b-row
        b-col.input-group.col-2.float-end(style='margin-left: 59%;')
          span#inputGroupPrepend.input-group-text Total MXN
          input#totalMXNV.form-control(type='text' readonly aria-describedby='inputGroupPrepend')
        b-col.input-group.col-2.float-end
          span#inputGroupPrepend.input-group-text Total Litros
          input#totalLtsV.form-control(type='text' readonly aria-describedby='inputGroupPrepend')
  .row
    b-container(fluid)
      b-row(style='margin-top:1%;')
        b-col.input-group.col-2.float-end(style='margin-left: 38.5%;')
          span#inputGroupPrepend.input-group-text(style='width:135px') Diferencia MXN
          input#DifMXN.form-control(type='text' readonly aria-describedby='inputGroupPrepend')
        b-col.input-group.has-validation.col-2.float-end.needs-validation
          span#inputGroupPrepend.input-group-text Diferencia LTS
          input#DifLTS.form-control(type='text' readonly aria-describedby='inputGroupPrepend' required)
          <b-col class="invalid-feedback text-center">
            Revisar facturas
          </b-col>
        b-col.input-group.has-validation.col-2.float-end.needs-validation
          span#inputGroupPrepend.input-group-text Diferencia LTS %
          input#DifLTSP.form-control(type='text' readonly value=' %' aria-describedby='inputGroupPrepend' required)
        b-col.invalid-feedback.text-center.
          Revisar facturas

    .col
      a#jsonDiario.col-2.float-end.button.btn.btn-ekide.d-none.d-lg-block(@click="DownloadJson" type='button' style='margin-right: 13%;') Generar json diarios
      br
      a#jsonDiario.col-2.float-end.button.btn.btn-ekide.d-none.d-lg-block(@click="DownloadExcel" type='button' style='margin-right: 13%;') Generar Excel
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin]
})
export default class controlDiario extends Vue {
  $axiosSgm: any
  async mounted () {
    const fecha = '2023-01-19'
    const SatData:any = await this.$axiosSgm.$post(`/diario-natgas/${fecha}`)
    Fecha(fecha)
    const CompraData:any = SatData.tabla
    const VentaData:any = SatData.tablaVenta
    await CompraTabla(CompraData, fecha)
    await VentaTabla(VentaData, fecha)
    const totalMXN:any = document.querySelector('#totalMXN')
    const totalLts:any = document.querySelector('#totalLts')
    const totalMXNV:any = document.querySelector('#totalMXNV')
    const totalLtsV:any = document.querySelector('#totalLtsV')
    const DifLTS:any = document.querySelector('#DifLTS')
    const DifLTSP:any = document.querySelector('#DifLTSP')
    const DifMXN:any = document.querySelector('#DifMXN')
    totalMXN.value = parseFloat(SatData.totalMXNC.toFixed(2)).toLocaleString('en')
    totalLts.value = parseFloat(SatData.totalLTSC.toFixed(2)).toLocaleString('en')
    totalMXNV.value = parseFloat(SatData.totalMXNV.toFixed(2)).toLocaleString('en')
    totalLtsV.value = parseFloat(SatData.totalLTSV.toFixed(2)).toLocaleString('en')
    DifLTS.value = parseFloat((SatData.totalLTSC - SatData.totalLTSV).toFixed(2)).toLocaleString('en')
    DifLTSP.value = (((SatData.totalLTSC - SatData.totalLTSV) / SatData.totalLTSC) * 100).toLocaleString('en') + '%'
    DifMXN.value = parseFloat((SatData.totalMXNC - SatData.totalMXNV).toFixed(2)).toLocaleString('en')
  }

  DownloadJson () {
    const dia:any = document.querySelector('#dia')
    const mes:any = document.querySelector('#mes')
    const ano:any = document.querySelector('#ano')
    const fecha = `${ano.value}-${mes.value}-${dia.value}`
    window.open(`${process.env.SgmUrlBase}/Diario/Download/ZipDiario/${fecha}`)
  }

  DownloadExcel () {
    const dia:any = document.querySelector('#dia')
    const mes:any = document.querySelector('#mes')
    const ano:any = document.querySelector('#ano')
    const fecha = `${ano.value}-${mes.value}-${dia.value}`
    window.open(`${process.env.SgmUrlBase}/Diario/Download/ExcelDiario/${fecha}`)
  }

  async changeFecha () {
    const dia:any = document.querySelector('#dia')
    const mes:any = document.querySelector('#mes')
    const ano:any = document.querySelector('#ano')
    const fecha = `${ano.value}-${mes.value}-${dia.value}`
    const SatData:any = await this.$axiosSgm.$post(`/diario-natgas/${fecha}`)
    Fecha(fecha)
    const CompraData:any = SatData.tabla
    const VentaData:any = SatData.tablaVenta
    await CompraTabla(CompraData, fecha)
    await VentaTabla(VentaData, fecha)
    const totalMXN:any = document.querySelector('#totalMXN')
    const totalLts:any = document.querySelector('#totalLts')
    const totalMXNV:any = document.querySelector('#totalMXNV')
    const totalLtsV:any = document.querySelector('#totalLtsV')
    const DifLTS:any = document.querySelector('#DifLTS')
    const DifLTSP:any = document.querySelector('#DifLTSP')
    const DifMXN:any = document.querySelector('#DifMXN')
    totalMXN.value = parseFloat(SatData.totalMXNC.toFixed(2)).toLocaleString('en')
    totalLts.value = parseFloat(SatData.totalLTSC.toFixed(2)).toLocaleString('en')
    totalMXNV.value = parseFloat(SatData.totalMXNV.toFixed(2)).toLocaleString('en')
    totalLtsV.value = parseFloat(SatData.totalLTSV.toFixed(2)).toLocaleString('en')
    DifLTS.value = parseFloat((SatData.totalLTSC - SatData.totalLTSV).toFixed(2)).toLocaleString('en')
    DifLTSP.value = (((SatData.totalLTSC - SatData.totalLTSV) / SatData.totalLTSC) * 100).toLocaleString('en') + '%'
    DifMXN.value = parseFloat((SatData.totalMXNC - SatData.totalMXNV).toFixed(2)).toLocaleString('en')
  }
}
function Fecha (Fecha:string) {
  const fechaSplit = Fecha.split('-')
  const dia:any = document.querySelector('#dia')
  const mes:any = document.querySelector('#mes')
  const ano:any = document.querySelector('#ano')
  dia.value = fechaSplit[2]
  mes.value = fechaSplit[1]
  ano.value = fechaSplit[0]
}
function CompraTabla (CompraData:any, fecha:any) {
  let text = ''
  for (const key in CompraData) {
    text += `<tr id="${key}" class="detalleFacturaVenta" data-bs-toggle="modal" data-bs-target="#VentaDetallado">
                  <td> ${CompraData[key].RFCEmisor} </td>
                  <td> ${CompraData[key].Emisor} </td>
                  <td> ${CompraData[key].RFCReceptor} </td>
                  <td> ${CompraData[key].Receptor} </td>
                  <td> ${fecha} </td>
                  <td> ${CompraData[key].Descripcion} </td>
                  <td> ${CompraData[key].Cantidad} </td>
                  <td> ${CompraData[key].Moneda} </td>
                  <td> ${CompraData[key].Total} </td>
                  <td> ${CompraData[key].TotalMXN} </td>
                </tr>`
  }
  const bodyCompra:any = document.querySelector('#bodyCompraTable')
  bodyCompra.innerHTML = text
}
function VentaTabla (VentaData:any, fecha:any) {
  let text = ''
  for (const key in VentaData) {
    text += `<tr id="${key}" class="detalleFacturaVenta" data-bs-toggle="modal" data-bs-target="#VentaDetallado">
                  <td> ${VentaData[key].RFCEmisor} </td>
                  <td> ${VentaData[key].Emisor} </td>
                  <td> ${VentaData[key].RFCReceptor} </td>
                  <td> ${VentaData[key].Receptor} </td>
                  <td> ${fecha} </td>
                  <td> ${VentaData[key].Descripcion} </td>
                  <td> ${VentaData[key].Cantidad} </td>
                  <td> ${VentaData[key].Moneda} </td>
                  <td> ${VentaData[key].Total} </td>
                  <td> ${VentaData[key].TotalMXN} </td>
                </tr>`
  }
  const bodyVentaTable:any = document.querySelector('#bodyVentaTable')
  bodyVentaTable.innerHTML = text
}
</script>

<style scoped>
.button {
    width: 50%;
    background-color: #343434b2;
    border: none;
    color: white;
    padding: 0px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 300;
    border-radius: 4px;
    font-family: Calibri;
}

.btn-ekide, .btn-ekide:hover, .btn-ekide:active, .btn-ekide:visited {
    background-color: #717171 !important;
    color: white ;
}
.containerRight{
  /*background: #F1F1F1 !important;*/
    margin:auto;
    width:1200px;
    padding:1%;
    background-color:white;
    border: solid;
    border-color:#f1f1f0;
    height: 700px;
    margin-top: 5%;
    overflow:scroll;
    border-collapse: collapse;
    border-spacing: 0;
}
input[readonly] {
    background-color: white !important;
}
td {
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal !important;
    text-align: justify;

}
table {
  table-layout: fixed;
}
</style>
