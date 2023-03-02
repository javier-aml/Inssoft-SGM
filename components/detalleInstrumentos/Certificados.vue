<template lang="pug">
BCardText()
  div(style="min-height: 400px")
    div.row
      div.col-md-12.mb-4
          BButton(type="button" class="btn btn-primary"  @click="showModal" )
            BIconPlus
            | Agregar certificado
    div.row(variant="primary")
      div.col-md-6.pb-2
          BFormGroup(
            label="Mostrando"
            label-for="selPageRows"
            label-cols-sm="3"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          )
            BFormSelect(
              id="selPageRows"
              style="width: 130px"
              label="Mostrando"
              class="cls-select-length"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            )
      div.col-md-3.pb-2
      div.col-md-3.pb-2
        BFormInput( type="search" placeholder="Buscar" size="sm"  v-model="filter" class="cls-buscar" autocomplete="off")
    div.row.certificadosTable.pl-3
      div.col-md-12
        BTable(
          sticky-header
          responsive
          head-variant="dark"
          hover
          show-empty
          small
          empty-text="No hay certificados"
          empty-filtered-text="No se encontro una coincidencia con el valor buscado"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :busy="isLoading"
          @filtered="onFiltered"
        )
          template(v-slot:cell(index)="data") {{ data.index + 1 }}
          template(v-slot:cell(FileName)="data")
            div
              a(:href="urlFiles + data.value" target="_blank" class="btn btn-info btn-block")
                BIconFilePdf(class="mr-2")
                |Ver archivo
              button(class="btn btn-danger btn-block mt-1" @click="deleteCertificadoEquipo(data.item.id)")
                BIconTrash(class="mr-2")
                |Eliminar
          <template #table-busy>
            div#table-busy.text-center.text-info.my-2
              BSpinner(class="align-middle").mr-3
              strong Cargando certificados
          </template>
        </b-table>
    div.row.justify-content-end
      div.col-md-8
        label(class="col-form-label-sm text-sm-right") Total: {{totalRows}} registros
      div.col-md-4
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0" />
  BModal(
    id="modalAddCertificado"
    size="lg"
    title="Nuevo certificado"
    header-bg-variant="dark"
    header-text-variant="light"
    @hide="onHideModalAddCertificado"
    hide-footer
  )
    BForm( v-on:submit.prevent="saveCertificado" autocomplete="off")
      div.row
        div.col-md-4
          BFormGroup(label="*Nombre")
            BFormInput(
              placeholder="Ingresa el nombre"
              v-model.trim="formCertificado.nombre"
              required
            )
        div.col-md-4
          BFormGroup(label="*Certificado")
            BFormInput(
              placeholder="Ingresa el certificado"
              v-model.trim="formCertificado.certificado"
              required
            )
        div.col-md-4
          BFormGroup(label="Fecha de ingreso")
            BFormDatepicker(
              placeholder="Seleccionar fecha"
              label-help="Use las teclas de cursor para navegar por las fechas del calendario"
              label-today-button="Hoy"
              today-button-variant="outline-success"
              style="width: 100%"
              :hide-header="true"
              today-button
              :no-close-on-select="false"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              v-model.trim="formCertificado.fechaIngreso"
            )
      div.row
        div.col-md-12
          BFormGroup(label="Archivo")
            BFormFile(
              accept=".pdf"
              placeholder="Seleccionar archivo"
              drop-placeholder="Arrastrar archivo aquí..."
              v-model="formCertificado.file"
              required
            )
      div.modal-footer
        BButton(variant="danger" @click="hideModal")
          |Cancelar
        BButton(variant="success" type="submit")
          |Guardar
  ModalConfirmation(
    :modalId="modalConfirmationId"
    title="¿Estas seguro que deseas eliminar certificado?"
    @toggleDelete="toggleDeleteCertificado"
    :itemId="certificadoDeleteId"
  )
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BTable, BPagination, BSpinner, BModal, ModalPlugin, BFormFile, ToastPlugin, BIconTrash, BIconFilePdf } from 'bootstrap-vue'
import ModalConfirmation from '../ModalConfirmation.vue'
import { formatDate } from '~/assets/js/functions'

Vue.component('BTable', BTable)
Vue.component('BPagination', BPagination)
Vue.component('BSpinner', BSpinner)
Vue.component('BModal', BModal)
Vue.component('BFormFile', BFormFile)
Vue.component('BIconTrash', BIconTrash)
Vue.component('BIconFilePdf', BIconFilePdf)
Vue.component('ModalConfirmation', ModalConfirmation)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

@Component({})
export default class Certificados extends Vue {
  @Prop(Number) instrumentoId: number | undefined

  $axiosSgm: any
  urlFiles: string | undefined = ''

  data () {
    const now = new Date()
    const today = formatDate(now.toString())

    return {
      items: [],
      fields: [
        { key: 'index', label: 'No.', sortable: true },
        // { key: 'id', label: 'ID', sortable: true },
        { key: 'Nombre', label: 'Nombre', sortable: true },
        { key: 'Certificado', label: 'Certificado', sortable: true },
        { key: 'Fecha_Ingreso', label: 'Fecha ingreso', sortable: true, formatter: (value: string) => { return formatDate(value) } },
        { key: 'FileName', label: 'Acciones', sortable: true }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Mostrar todos' }],
      filter: null,
      filterOn: [],
      isLoading: false,
      formCertificado: {
        equipoId: this.instrumentoId,
        nombre: '',
        certificado: '',
        fechaIngreso: today,
        file: null

      },
      modalConfirmationId: 'modalConfirmCertificado',
      certificadoDeleteId: 0
    }
  }

  created () {
    this.urlFiles = process.env.SgmFileBase + '/instrumentos/certificados/'
    this.getCertificadosByEquipoId(this.instrumentoId)
  }

  async getCertificadosByEquipoId (id:any) {
    this.$data.isLoading = true

    const result:any = await this.$axiosSgm.$get(`/certificados-equipo/${id}`)
    const datos = await result

    if (datos.success) {
      const certificados = datos.certificados
      this.$data.items = certificados != null ? certificados : []
      this.$data.totalRows = this.$data.items.length
    }

    this.$data.isLoading = false
  }

  onFiltered (filteredItems: any) {
    this.$data.totalRows = filteredItems.length
    this.$data.currentPage = 1
  }

  showModal () {
    this.$bvModal.show('modalAddCertificado')
  }

  hideModal () {
    this.$bvModal.hide('modalAddCertificado')
  }

  onHideModalAddCertificado () {
    const now = new Date()
    const today = formatDate(now.toString())

    const formCertificado = {
      equipoId: this.instrumentoId,
      nombre: '',
      certificado: '',
      fechaIngreso: today,
      file: null
    }
    this.$data.formCertificado = formCertificado
  }

  async saveCertificado () {
    const file: File = this.$data.formCertificado.file

    if (file !== null && file.type === 'application/pdf') {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      const form: FormData = new FormData()
      form.append('id', this.$data.formCertificado.equipoId)
      form.append('nombre', this.$data.formCertificado.nombre)
      form.append('certificado', this.$data.formCertificado.certificado)
      form.append('fechaIngreso', this.$data.formCertificado.fechaIngreso)
      form.append('certificadoFile', file)
      const datos: any = await this.$axiosSgm.$post('/certificados-equipo', form, config)

      if (datos.success) {
        this.getCertificadosByEquipoId(this.instrumentoId)
        this.hideModal()
        this.makeToast('success', 'NUEVO CERTIFICADO', '¡El certificado se registró exitosamente!')
      } else {
        this.makeToast('danger', 'NUEVO CERTIFICADO', datos.error)
      }
    } else {
      this.makeToast('danger', 'NUEVO CERTIFICADO', '¡Solo se aceptan archivos con la extensión .pdf!')
      this.$data.formCertificado.file = null
    }
  }

  deleteCertificadoEquipo (id: number) {
    const modalId = this.$data.modalConfirmationId
    this.$data.certificadoDeleteId = id
    this.$bvModal.show(modalId)
  }

  async toggleDeleteCertificado (id: number) {
    const datos: any = await this.$axiosSgm.$delete('/certificados-equipo/' + id)

    if (datos.success) {
      const modalId = this.$data.modalConfirmationId
      this.getCertificadosByEquipoId(this.instrumentoId)
      this.$bvModal.hide(modalId)
      this.$data.certificadoDeleteId = 0
      this.makeToast('success', 'ELIMINAR CERTIFICADO', '¡El certificado se eliminó exitosamente!')
    } else {
      this.makeToast('danger', 'ELIMINAR CERTIFICADO', '¡Intenta nuevamente!')
    }
  }

  private makeToast (variant: string = '', title: string = '', body: string = '') {
    this.$bvToast.toast(body, {
      title,
      variant,
      solid: true,
      headerClass: 'justify-content-center'
    })
  }
}
</script>
<style>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Buscar';
}
</style>
