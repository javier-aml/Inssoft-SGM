<template lang="pug">
.container-fluid
  .row.containerFixed
    .col-12
      .containerLeft
        .row
          .col-3
            h1
              |Estructura
            br
            h5
              |campos obligatorios.
          .col-7
            .containerEstructura
              span.border
                #treeView.fontTitle.treeViewBody
                  .title-font.snd-title.text-center(style="font-weight: bolder;") Contenido
                  .row.
                  #collapseDVR3.panel-collapse.collapseTree.in
                    .tree
          .col-2
            BButton(type="button" class="btn addTask btn-primary"  @click="showModal" ) Agregar Tarea
  .row
    .col-12
      .containerRight(ref="capture")
        iframe#PDFViewer(width="1100", height="1100", frameborder="0",crossorigin="anonymous")
  BModal(
  ref="AgregarTarea"
  size="lg"
  title="Nueva Tarea"
  id="NewTask"
  header-bg-variant="dark"
  header-text-variant="light"
  hide-footer
  )
      div.row
        div.col-md-5
          BFormGroup(label="Ubicación")
            BFormSelect(
              style="width: 100%"
              v-model="selected"
              :options="options"
              placeholder="Selecciona una opción"
              required
              id="ubicacion"
            )
        div.col-md-7
          BFormGroup(label="Nombre de la tarea")
            BFormInput#nombreT( placeholder="Ingresa Nombre de la tarea")
      div.row
        div.col-md-4
          BFormGroup(label="Fecha de realización")
            BFormDatepicker(
                v-model="fechaDesde"
                placeholder="Selecciona fecha desde"
                label-help="Use las teclas de cursor para navegar por las fechas del calendario"
                label-reset-button="Resetear"
                label-today-button="Hoy"
                today-button-variant="outline-success"
                style="width: 300px"
                :hide-header="true"
                :state="fechaDesde != ''"
                today-button
                reset-button
                :no-close-on-select="false"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                id="Fecha"
              )
      div.modal-footer
        BButton(variant="danger" @click="hideModal")
          |Cancelar
        BButton(variant="success" @click="addTask")
          |Guardar
  BButton(type="button" class="btn btn-primary" style="margin-left:50px"  @click="showModal2" ) Agregar PDF
  BModal(
  ref="AgregarPDF"
  size="lg"
  id="AgregarPDF"
  title="Nuevo equipo"
  header-bg-variant="dark"
  header-text-variant="light"
  hide-footer
  )
    BForm( v-on:submit.prevent="ConvertToPdf" autocomplete="off")
      div.row
        div.col-md-8
          BFormGroup(label="Ubicación")
            BFormSelect(
                style="width: 100%"
                v-model="selected"
                :options="options"
                placeholder="Selecciona una opción"
                required
                id="ubicacionPDF"
              )
      div.modal-footer
        BButton(variant="danger" @click="hideModal2")
          |Cancelar
        BButton(variant="success" type="submit")
          |Guardar
          .col-8.col-sm-6
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import {
  BModal,
  BButton,
  BFormDatepicker,
  BFormSelect,
  BForm,
  ToastPlugin,
  ModalPlugin
} from 'bootstrap-vue'
import jsPDF from 'jspdf'
Vue.component('BModal', BModal)
Vue.component('BButton', BButton)
Vue.component('BFormDatepicker', BFormDatepicker)
Vue.component('BFormSelect', BFormSelect)
Vue.component('BForm', BForm)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
@Component({
  mixins: [validationMixin]
})
export default class estructuraBody extends Vue {
  $axiosSgm: any
  $html2canvas: any
  $refs!: {
    AgregarTarea: HTMLDialogElement,
    AgregarPDF: HTMLDialogElement,
    capture: HTMLDialogElement
  }

  data () {
    return {
      fechaDesde: null,
      selected: null,
      options: [{ value: null, text: 'Porfavor seleccione una ubicación' }]
    }
  }

  mounted () {
    this.getEstructura()
  }

  private async getEstructura () {
    const companyId:any = this.$auth.user?.companyId
    const estructura = await this.$axiosSgm.$get(`/estructura/${companyId}`)
    let text = '<ul>'
    for (const key in estructura) {
      this.$data.options.push({ value: estructura[key].position, text: `${estructura[key].position}-${estructura[key].dirName}` })
      text += '<li>'

      text += `<span role="button"><i class="fa fa-minus-square" style="margin-right: 5px;"><img
              src="/site/icon-estructura/folder.png" folder='folder' class="${estructura[key].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${estructura[key].position}-${estructura[key].dirName}</span>
              <ul>`
      for (const key1 in estructura[key].file) {
        const file1 = estructura[key].file

        text += `<li>
                      <span role="button"> <img src="/site/icon-estructura/docs.png" class="files" width="20" height="20"
                      alt="logo">${file1[key1].fileName}</span>
                  </li>`
      }
      for (const key2 in estructura[key].dir) {
        const dir1 = estructura[key].dir
        this.$data.options.push({ value: dir1[key2].position, text: `${dir1[key2].position}-${dir1[key2].dirName}` })

        text += '<li>'
        text += `<span role="button"><i class="fa fa-minus-square" style="margin-right: 5px;"><img
                  src="/site/icon-estructura/folder.png" folder='folder' class="${dir1[key2].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${dir1[key2].position}-${dir1[key2].dirName}</span>
                  <ul>`
        for (const key3 in dir1[key2].file) {
          const file2 = dir1[key2].file
          text += `<li>
                      <span role="button"> <img src="/site/icon-estructura/docs.png" class="files" width="20" height="20"
                      alt="logo">${file2[key3].fileName}</span>
                  </li>`
        }
        for (const key4 in dir1[key2].dir) {
          const dir2 = dir1[key2].dir
          this.$data.options.push({ value: dir2[key4].position, text: `${dir2[key4].position}-${dir2[key4].dirName}` })

          text += '<li>'
          text += `<span role="button"><i class="fa fa-minus-square" style="margin-right: 5px;"><img
                      src="/site/icon-estructura/folder.png" folder='folder' class="${dir1[key2].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${estructura[key].position}-${dir2[key4].dirName}</span>
                      <ul>`
          for (const key5 in dir2[key4].file) {
            const file3 = dir2[key4].file
            text += `<li>
                          <span role="button"> <img src="/site/icon-estructura/docs.png" class="files" width="20" height="20"
                          alt="logo">${file3[key5].fileName}</span>
                      </li>`
          }
          for (const key6 in dir2[key4].dir) {
            const dir3 = dir2[key4].dir
            this.$data.options.push({ value: dir3[key6].position, text: `${dir3[key6].position}-${dir3[key6].dirName}` })

            text += '<li>'
            text += `<span role="button"><i class="fa fa-minus-square" style="margin-right: 5px;"><img
                          src="/site/icon-estructura/folder.png" folder='folder' class="${dir3[key6].position}" width="20" height="20" alt="logo" style="margin-left: 5px;"></i>${estructura[key].position}-${dir3[key6].dirName}</span>
                          <ul>`
            for (const key7 in dir3[key6].file) {
              const file4 = dir3[key6].file
              text += `<li>
                              <span role="button"> <img src="/site/icon-estructura/docs.png" class="files" width="20" height="20"
                              alt="logo">${file4[key7].fileName}</span>
                          </li>`
            }
            text += '</ul>'
            text += '</li>'
          }
          text += '</ul>'
          text += '</li>'
        }
        text += '</ul>'
        text += '</li>'
      }
      text += '</ul>'
      text += '</li>'
    }
    text += '</ul>'
    const tree:any = document.querySelector('.tree')
    tree.innerHTML = text
    const fileEvent = document.querySelectorAll('.files')
    fileEvent.forEach((element) => {
      element.addEventListener('click', (e:any) => {
        let name = e.target.parentNode.innerHTML
        name = name.split('>')
        name = name[1]
        const PDFViewer:any = document.querySelector('#PDFViewer')
        let carpeta
        switch (companyId) {
          case 1:
            carpeta = 'natgas'
            break
          case 2:
            carpeta = 'tomza'
            break
          case 3:
            carpeta = 'kansas'
            break
          case 4:
            carpeta = 'togo'
            break
          default:
            carpeta = null
            break
        }
        if (name.includes('2022-12-20-')) {
          name = name.split('-')
          PDFViewer.setAttribute('src', `${process.env.SgmFileBase}/${carpeta}/${name[3]}.html`)
        } else if (name.includes('-')) {
          PDFViewer.setAttribute('src', `${process.env.SgmFileBase}/${carpeta}/${name}.pdf`)
        } else {
          PDFViewer.setAttribute('src', `${process.env.SgmFileBase}/${carpeta}/${name}.html`)
        }
      })
    })
    let li:any = document.querySelector('.tree')
    li = li.querySelectorAll('li')
    li.forEach((element:any) => {
      if (element.querySelector('ul') != null) {
        element.classList.add('parent_li')
        element.querySelector('span').setAttribute('title', 'Collapse this branch')
      }
      element.querySelector('span').addEventListener('click', (e:any) => {
        const span:any = e.target.parentNode.parentNode
        if (span.getAttribute('title') == null) {
          element.style.display = ''
        } else {
          const children = span.parentNode.querySelector('ul').children
          for (const key in children) {
            if (children[key].style.display !== undefined) {
              if (children[key].style.display !== 'none' && children) {
                children[key].style.display = 'none'
                span.setAttribute('title', 'Expand this branch')
              } else {
                children[key].style.display = 'block'
                span.setAttribute('title', 'Collapse this branch')
              }
            }
          }
        }
        e.stopPropagation()
      })
    })
    collapse()
    function collapse () {
      let li:any = document.querySelector('.tree')
      li = li.querySelectorAll('li')
      li.forEach((element:any) => {
        if (element.querySelector('span').querySelector('img').getAttribute('class').length !== 1) {
          element.style.display = 'none'
          element.querySelector('span').setAttribute('title', 'Expand this branch')
        }
      })
    }
  }

  showCaptureRef () {
    const vc = this
    return vc.$refs.capture
  }

  async addTask () {
    let position:any = document.getElementById('ubicacion')
    let nombre:any = document.getElementById('nombreT')
    let fecha:any = document.getElementById('Fecha')
    position = position.value
    nombre = nombre.value
    fecha = fecha.parentElement.querySelector('label')
    fecha = fecha.innerHTML
    fecha = fecha.replace('/', '-')
    fecha = fecha.replace('/', '-')
    const companyId:any = this.$auth.user?.companyId
    await this.$axiosSgm.$post(`/add/task/${position}/${nombre}/${fecha}/${companyId}`)
    alert('Se genero la tarea')
    this.$bvModal.hide('NewTask')
  }

  ConvertToPdf () {
    const vc = this
    this.$html2canvas(vc.showCaptureRef(), { crossorigin: true })
      .then(async (canvas:any) => {
        const img = canvas.toDataURL()
        // eslint-disable-next-line new-cap
        const doc:any = new jsPDF('l', 'pt', 'letter')
        doc.addImage(img, 'JPEG', 0, 0, canvas.width * 0.6, canvas.height * 0.45, 'a', 'FAST')
        const file:any = doc.output('blob')
        const fd:any = new FormData() // To carry on your data
        const ubicacionPDF:any = document.getElementById('ubicacionPDF')
        const fileName = ubicacionPDF.options[ubicacionPDF.selectedIndex].text.split('-')
        fd.append('upl', file, `${fileName[1]}.pdf`)
        const companyId:any = this.$auth.user?.companyId
        switch (companyId) {
          case 1:
            await fetch(process.env.SgmUrlBase + '/api/uploadPDFNatgas/' + ubicacionPDF.value,
              {
                method: 'post',
                body: fd
              })
              .then(async () => {
                await this.getEstructura()
                this.$bvModal.hide('AgregarPDF')
                this.$bvToast.toast('¡Listo!', {
                  title: 'Se completo la tarea',
                  autoHideDelay: 5000,
                  variant: 'success',
                  appendToast: true,
                  toaster: 'b-toaster-bottom-right'
                })
                alert('Se completo la tarea')
              })
              .catch(function (e:any) {
                alert(e)
              })
            break
          case 2:
            await fetch(process.env.SgmUrlBase + '/api/uploadPDFTomza/' + ubicacionPDF.value,
              {
                method: 'post',
                body: fd
              })
              .then(async () => {
                await this.getEstructura()
                this.$bvModal.hide('AgregarPDF')
                this.$bvToast.toast('¡Listo!', {
                  title: 'Se completo la tarea',
                  autoHideDelay: 5000,
                  variant: 'success',
                  appendToast: true,
                  toaster: 'b-toaster-bottom-right'
                })
                alert('Se completo la tarea')
              })
              .catch(function (e:any) {
                alert(e)
              })
            break
          case 3:
            await fetch(process.env.SgmUrlBase + '/api/uploadPDFKansas/' + ubicacionPDF.value,
              {
                method: 'post',
                body: fd
              })
              .then(async () => {
                await this.getEstructura()
                this.$bvModal.hide('AgregarPDF')
                this.$bvToast.toast('¡Listo!', {
                  title: 'Se completo la tarea',
                  autoHideDelay: 5000,
                  variant: 'success',
                  appendToast: true,
                  toaster: 'b-toaster-bottom-right'
                })
                alert('Se completo la tarea')
              })
              .catch(function (e:any) {
                alert(e)
              })
            break
          case 4:
            await fetch(process.env.SgmUrlBase + '/api/uploadPDFTogo/' + ubicacionPDF.value,
              {
                method: 'post',
                body: fd
              })
              .then(async () => {
                await this.getEstructura()
                this.$bvModal.hide('AgregarPDF')
                this.$bvToast.toast('¡Listo!', {
                  title: 'Se completo la tarea',
                  autoHideDelay: 5000,
                  variant: 'success',
                  appendToast: true,
                  toaster: 'b-toaster-bottom-right'
                })
                alert('Se completo la tarea')
              })
              .catch(function (e:any) {
                alert(e)
              })
            break

          default:
            break
        }
      })
      .catch((error:any) => {
        alert(error)
      })
  }

  showModal () {
    this.$bvModal.show('NewTask')
  }

  hideModal () {
    this.$bvModal.hide('NewTask')
  }

  showModal2 () {
    this.$bvModal.show('AgregarPDF')
  }

  hideModal2 () {
    this.$bvModal.hide('AgregarPDF')
  }
}

</script>

<style scoped>
.containerLeft{
  /*background: #F1F1F1 !important;*/
  margin:auto;
   width:100%;
  padding:5%;
  background-color:white;
  border: solid;
  border-color:#f1f1f0;
  box-shadow:0px 0px 20px 5px #f1f1f1;
  margin-top: 2%;
  top:0px;
  position:sticky;
  overflow-x: auto;
  /* left: 40%; */

}
.containerRight{
  /*background: #F1F1F1 !important;*/
  /* margin:auto; */
  width:1100px;
  height:1100px;
  padding:1%;
  background-color:white;
  border: solid;
  border-color:#f1f1f0;
  margin-top: 2%;
  /* top: 30%; */
  /* margin-right: 50%;
  left: 50%; */
}
.containerEstructura{
background-color: #f5f5f5;
overflow-y: scroll;
height: 200px;
}
.addTask{
  position: absolute;
  bottom: 0;
}
.containerFixed{
  top: 0;
  padding: 5px;
  z-index: 1;
}
/* iframe{ overflow-y: scroll; } */
</style>
