<template lang="pug">
#mainwin
  .container
    .row
      .col
        .row
          #tabla.tabla.container.gy-5.rnd(style='background-color: #fff')
            .row
              .col-6.col-xl-12
                .row
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd(type='hidden' hidden) id
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd.descTitlProv.fstCap Descripción
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd ID
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Nombre
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Modelo
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Numero de serie
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Fabricante
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Número de certificado
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Clasificación
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Fecha de calibración
                  .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Horas promedio de uso
            #bodyEquipo
                .col-6.col-xl-12.bodyTable.clickEvent#Equipo_1
                  .row.tableSep#index
                    .col-12.col-xl-1.mt-xl-3.p-xl-2.tableLin#id_id(type='hidden' hidden).
                      id
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Descripcion_id(style='word-wrap: break-word') Descripcion
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin.descLin.fstCap#idInstrumento_id.
                      idInstrumento
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Nombre_id Nombre
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Modelo_id Modelo
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#nSerie_id nSerie
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Fabricante_id Fabricante
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#nCertificado_id nCertificado
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Clasificacion_id Clasificacion
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#fCalibracion_id date
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#hPromedio_id hPromedio
                .col-6.col-xl-12.bodyTable.clickEvent#Equipo_2
                  .row.tableSep#index
                    .col-12.col-xl-1.mt-xl-3.p-xl-2.tableLin#id_id(type='hidden' hidden).
                      id
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Descripcion_id(style='word-wrap: break-word') Descripcion
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin.descLin.fstCap#idInstrumento_id.
                      idInstrumento
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Nombre_id Nombre
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Modelo_id Modelo
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#nSerie_id nSerie
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Fabricante_id Fabricante
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#nCertificado_id nCertificado
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#Clasificacion_id Clasificacion
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#fCalibracion_id date
                    .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#hPromedio_id hPromedio
  .text-right.position-relative
    .position-relative.bottom-0.end-0
      img#imgadd(src='/assets/add40.png' style='margin-right: 9%; margin-top:2%;' width='40' height='40' alt data-bs-toggle='modal' data-bs-target='#addEquipo')
  .modal.fade#addEquipo(tabindex='-1' aria-labelledby='addEquipoLabel' aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h5.modal-title#addEquipoLabel Modal title
          button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
        .modal-body
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Nombre
            input.form-control#Nombre(type='text' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Descripción
            input.form-control#Descripcion(type='text' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Modelo
            input.form-control#Modelo(type='text' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Numero de serie
            input.form-control#nSerie(type='text' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Fabricante
            input.form-control#Fabricante(type='text' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Número de certificado
            input.form-control#nCertificado(type='text' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Clasificación
            input.form-control#Clasificacion(type='text' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Fecha de calibración
            input.form-control#fCalibracion(type='date' aria-describedby='inputGroupPrepend' required)
          br
          .input-group.has-validation
            span.input-group-text#inputGroupPrepend Horas promedio de uso
            input.form-control#hPromedio(type='text' placeholder='HH:MM' aria-describedby='inputGroupPrepend' required)
        .modal-footer
          button.btn.btn-danger(type='button' data-bs-dismiss='modal') Cancelar
          button.btn.btn-primary#agregarEquipo(type='button') Agregar
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin]
})
export default class EquiposComponent extends Vue {
  mounted () {
    const bodyEquipo:any = document.querySelector('#bodyEquipo')
    const body = bodyEquipo.querySelectorAll('.clickEvent')
    body.forEach((element:any) => {
      element.style.cursor = 'pointer'
      element.onclick = function () {
      // do something...
        // console.log(window.location.href)
        // console.log(url[2] + '/Equipo' + `/${this.id}`)

        window.location.replace(window.location.href.replace('Equipos', 'Equipo') + `/Equipo/${this.id}`)
        // console.log(this.id)
      }
    })
    // console.log(bodyEquipo)
  }
}

</script>
<style scoped>
.conteiner-recover {
  max-width: 500px;
}

.nav-header {
  max-height: 100px;
}

.control-input:checked~.custom-control-label::before {
  color: #fff;
  border-color: #85AC1C !important;
  background-color: #85AC1C !important;
}

.logotipoNav {
  height: 70px;
  width: 80%;
  background-image: url("../assets/img/logotipo.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left;
}
@media screen and (min-width: 1200px) {

.tableSep {
    border: solid !important;
    border-width: 4px 0 0 0 !important;
    border-color:  #CCC !important;
    border-radius: 2px;
}

.descTable{
    width: 60% !important;
}
.tableTitl{
    font-weight: 900 !important;
    color:  #555 !important;
    font-size: 16px;
    background-color: #FFF;
}

}
.rnd{
    border-radius: 6px;
}
@media screen and (max-width: 1200px) {
 .tableLin{
    border: solid !important;
    border-width: 1px 1px 1px 1px !important;
    border-color:  #DDD !important;
    border-radius: 2px;
    /*background-color: #eee;*/
    color:  #777 !important;
    font-weight: 400 !important;
    padding: .8rem 0;

}

 .tableTitl{
    font-weight: 900 !important;
    color:  #888 !important;
    font-size: 16px;
    background-color: #eee;
 }

.tableCbx{
    padding: 1rem 0;
    position: relative !important;

 }

 .descTitlProv{
    height: 8rem;
 }

.descLin{
    height: 8rem;
 }
 .descTitl{
    height: 8rem;
 }
}
.tableLin {
text-align: center;
}

.tableTitl{
font-weight: bolder;
}
</style>
