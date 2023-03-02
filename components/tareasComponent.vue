<template lang="pug">
#mainwin
  .container
    .row
      .container.gy-5.descTable.rnd(style='background-color: #fff')
        .row
          .col-6.col-xl-12
            .row
              .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Tarea
          .col-6.col-xl-12
            .row.tableSep
              #id.col-12.col-xl.mt-xl-3.p-xl-2.tableLin Certificación
    .row
      #tabla_index.tabla.container.gy-5.rnd
        .row
          .col-6.col-xl-12
            .row
              .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Tarea
              .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd.descTitlProv2.fstCap Descripción Línea de Pedido
              .col-12.col-xl.py-xl-3.tableTitl.tableLin.rnd Fecha
              .col-12.col-xl-2.py-xl-2.tableTitl.tableLin.rnd Validar
              .col-12.col-xl-2.py-xl-2.tableTitl.tableLin.rnd Descargar
          .col-6.col-xl-12.bodyTable
            .row.tableSep#index
              .col-12.col-xl.mt-xl-3.p-xl-2.tableLin#proyecto_index Certificació  n
              .col-12.col-xl.mt-xl-3.p-xl-2.tableLin.descLin2.fstCap#Pedido_index MESS-CC-TEP-0426-2022
              .col-12.col-xl.mt-xl-3.p-xl-2.tableLin 03-12-2022
              .col-12.col-xl-2.mt-xl-2.p-xl-2.tableLin
                button#descTarea.btn.btn-ekide.btn-sm.btnValidar(type='button' id-file='id_File' data-id='id' data-bs-toggle='modal' data-bs-target='modalPDFTask tarea') Validar
              .col-12.col-xl-2.mt-xl-2.p-xl-2.tableLin
                button#id_File.btn.btn-ekide.btn-sm.modalPDFTaskButton.tarea(type='button' data='id' name='1') PDF
    .modal.fade#Validar(data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='ValidarLabel' aria-hidden='true')
      .modal-dialog.modal-lg
        .modal-content
          .modal-header
            h5.modal-title#ValidarLabel Validación
            button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
          .modal-body
            .input-group.mb-3
              .input-group-prepend
                .input-group-text
                  input(type='checkbox' aria-label='Checkbox for following text input')
              input.form-control(type='text' readonly value='Req. SAT' aria-label='Text input with checkbox')
            .input-group.mb-3
              .input-group-prepend
                .input-group-text
                  input(type='checkbox' aria-label='Checkbox for following text input')
              input.form-control(type='text' readonly value='Req.CRE' aria-label='Text input with checkbox')
            .input-group.mb-3
              .input-group-prepend
                .input-group-text
                  input(type='checkbox' aria-label='Checkbox for following text input')
              input.form-control(type='text' readonly value='Req. PMX' aria-label='Text input with checkbox')
            .input-group.mb-3
              .input-group-prepend
                .input-group-text
                  input(type='checkbox' aria-label='Checkbox for following text input')
              input.form-control(type='text' readonly value='Req. SS' aria-label='Text input with checkbox')
            .input-group
              .input-group-prepend
                span.input-group-text Descripción del Requisito de la norma
              textarea.form-control(aria-label='Descripción del Requisito de la norma')
            br
            .input-group
              .input-group-prepend
                span.input-group-text Documento que satisface el requisito
              textarea.form-control(aria-label='Documento que satisface el requisito ')
            br
            .input-group
              .input-group-prepend
                span.input-group-text Evidencias objetivas / observaciones
              textarea.form-control(aria-label='Evidencias objetivas / observaciones ')
            br
            .input-group.mb-3
              .input-group-prepend
                .input-group-text
                  input(type='checkbox' aria-label='Checkbox for following text input')
              input.form-control(type='text' readonly value='Cumple si o no' aria-label='Text input with checkbox')
          .modal-footer
            button.btn.btn-danger(type='button' data-bs-dismiss='modal') Cancelar
            button.btn.btn-primary#fTask(type='button' data-bs-dismiss='modal') Terminar
</template>

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
