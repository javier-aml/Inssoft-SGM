<template lang="pug">
#mainwin
  .container-fluid
    .row
      .col-3
        .containerLeft.gy-5.rnd
          .row
            .text-center
              img#img(src='~/assets/img/logotipo.svg' width='300' height='150' alt='Image not found')
            .text-right
              img#imgAdd(src='/icon-estructura/add40.png' width='40' data-bs-toggle='modal' data-bs-target='#CambiarIMG' height='40' alt)
          .row
            .col
              a#homeNav(href='/VistaPrueba/Equipos/id' style='font-size: 30px;')
                img#homeImg(src='/icon-estructura/home.png' width='35' style='padding-right: 8px; vertical-align: baseline;')
                p General
          .row
            .col
              a#homeNav(href='/VistaPrueba/Equipos/Certificados/id' style='font-size: 30px;')
                img#homeImg(src='/icon-estructura/certification.png' width='35' style='vertical-align: baseline;')
                p Certificados
          .row
            .col
              a#homeNav(href='/VistaPrueba/Equipos/Documentos/id' style='font-size: 30px;')
                img#homeImg(src='/icon-estructura/document.png' width='35' style='padding-right: 8px; vertical-align: baseline;')
                p Documental
      .col
        .containerLeft
          .row
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='Nombre')
                label(for='floatingInput') Nombre
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='idInstrumento')
                label(for='floatingInput') ID
          .row
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='Marca')
                label(for='floatingInput') Marca
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='Modelo')
                label(for='floatingInput') Modelo
          .row
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='Fabricante')
                label(for='floatingInput') Fabricante
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='nSerie')
                label(for='floatingInput') Numero de serie
          .row
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='nCertificado')
                label(for='floatingInput') Número de certificado
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='Clasificacion')
                label(for='floatingInput') Clasificacion
          .row
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='date')
                label(for='floatingInput') Fecha de calibración
            .col
              .form-floating.mb-3
                input.form-control#floatingInput(type='text' readonly value='hPromedio')
                label(for='floatingInput') Horas de uso por dia
</template>
<script>
export default {
  auth: false,
  asyncData ({ params }) {
    const EquipoEspecifico = params.EquipoEspecifico
    return { EquipoEspecifico }
  }
}
</script>

<style scoped>
.containerLeft{
  /*background: #F1F1F1 !important;*/
  margin:auto;
  width:100%;
  padding:1%;
  background-color:white;
  border: solid;
  border-color:#f1f1f0;
  box-shadow:0px 0px 20px 5px #f1f1f1;
  margin-top: 4%;
}
a { color: inherit; }
.rnd{
    border-radius: 6px;
}
</style>
