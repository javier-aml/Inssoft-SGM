<template lang="pug">
div
  div.row
    div.col-md-12.mb-4
      //
        BButton(type="button" class="btn btn-primary"  @click="showModal" )
          BIconPlus
          | Agregar equipo
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
    div.col-md-12
      BTable(
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        responsive
        head-variant="dark"
        hover
        show-empty
        small
        empty-text="No hay equipos registrados"
        empty-filtered-text="No se encontro una coincidencia con el valor buscado"
        :busy="isLoading"
      )
        <template #table-busy>
          div#table-busy.text-center.text-info.my-2
            BSpinner(class="align-middle").mr-3
            strong Cargando equipos
        </template>
  div.row.justify-content-end
    div.col-md-8
      label(class="col-form-label-sm text-sm-right") Total: {{totalRows}} registros
    div.col-md-4
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0" />
  BModal(
    ref="modalAddEquipo"
    size="lg"
    title="Nuevo equipo"
    header-bg-variant="dark"
    header-text-variant="light"
    @hide="onHideModalAddEquipo"
  )
    div
      div.row
        div.col-md-8
          BFormGroup(label="*Nombre del equipo")
            BFormInput(v-model="formEquipo.nombre" placeholder="Ingresa el nombre del equipo")
        div.col-md-4
          BFormGroup(label="*Marca")
            BFormInput(v-model="formEquipo.marca" placeholder="Ingresa la marca")
      div.row
        div.col-md-4
          BFormGroup(label="Modelo")
            BFormInput(v-model="formEquipo.modelo" placeholder="Ingresa el modelo")
        div.col-md-4
          BFormGroup(label="Número de serie")
            BFormInput(v-model="formEquipo.noSerie" placeholder="Ingresa el número de serie")
        div.col-md-4
          BFormGroup(label="Número de certificado")
            BFormInput(v-model="formEquipo.noCertificado" placeholder="Ingresa el número de certificado")
        div.col-md-6
          BFormGroup(label="Clasificación")
            BFormInput(v-model="formEquipo.clasificacion" placeholder="Ingresa la clasificación")
        div.col-md-6
          BFormGroup(label="*Fecha calibración")
            BFormDatepicker(
                v-model="formEquipo.fechaCalibracion"
                placeholder="Selecciona fecha desde"
                label-help="Use las teclas de cursor para navegar por las fechas del calendario"
                label-reset-button="Resetear"
                label-today-button="Hoy"
                today-button-variant="outline-success"
                style="width: 100%"
                :hide-header="true"
                today-button
                reset-button
                :no-close-on-select="false"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              )
        div.col-md-4
          BFormGroup(label="Hrs promedio uso")
            BFormInput(v-model="formEquipo.hrsPromedioUso" placeholder="Ingresa las hrs promedio uso")

    <template #modal-footer>
      <b-button size="sm" variant="success" @click="saveEquipos()">
        |Guardar
      </b-button>
      <b-button size="sm" variant="danger" @click="hideModal()">
        |Cancelar
      </b-button>
    </template>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  BFormDatepicker,
  BButton,
  BTable,
  BFormSelect,
  BFormGroup,
  BPagination,
  BSpinner,
  BFormInput,
  BIconPlus,
  BModal,
  ToastPlugin
}
  from 'bootstrap-vue'
Vue.component('BFormDatepicker', BFormDatepicker)
Vue.component('BButton', BButton)
Vue.component('BTable', BTable)
Vue.component('BFormSelect', BFormSelect)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BPagination', BPagination)
Vue.component('BSpinner', BSpinner)
Vue.component('BFormInput', BFormInput)
Vue.component('BIconPlus', BIconPlus)
Vue.component('BModal', BModal)
Vue.component('BFormDatepicker', BFormDatepicker)
Vue.use(ToastPlugin)

@Component
export default class Equipos extends Vue {
  $axiosSgm: any

  data () {
    return {
      items: [],
      fields: [
        { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc', thStyle: { width: '80px' } },
        { key: 'Nombre', label: 'Nombre', sortable: true, thStyle: { width: '200px' } },
        { key: 'Descripcion', label: 'Descripción', sortable: true, thStyle: { width: '200px' } },
        { key: 'Marca', label: 'Marca', sortable: true, thStyle: { width: '200px' } },
        { key: 'Modelo', label: 'Modelo', sortable: true, thStyle: { width: '200px' } },
        { key: 'nSerie', label: 'No. de serie', sortable: true, thStyle: { width: '200px' } },
        { key: 'nCertificado', label: 'No. certificado', sortable: true, thStyle: { width: '200px' } },
        { key: 'nCertificacion', label: 'Clasificación', sortable: true, thStyle: { width: '200px' } },
        { key: 'fCalibracion', label: 'Fecha de calibración', sortable: true, thStyle: { width: '200px' } },
        { key: 'hPromedio', label: 'Hrs promedio de uso', sortable: true, thStyle: { width: '200px' } }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Mostrar todos' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      isLoading: false,
      formEquipo: {
        nombre: '',
        marca: '',
        modelo: '',
        noSerie: '',
        noCertificado: '',
        clasificacion: '',
        fechaCalibracion: '',
        hrsPromedioUso: ''
      }
    }
  }

  async mounted () {
    this.$data.isLoading = true
    const datos = await this.getDatos()
    this.$data.items = Object.values(datos.equipos)
    this.$data.totalRows = this.$data.items.length
    this.$data.isLoading = false
  }

  private async getDatos () {
    const datos:any = await this.$axiosSgm.$get('/equipos')
    return datos
  }

  showModal () {
    // this.$refs.modalAddEquipo.show()
  }

  hideModal () {
    // this.$refs.modalAddEquipo.hide()
  }

  private makeToast (variant: string = '', title: string = '', body: string = '') {
    this.$bvToast.toast(body, {
      title,
      variant,
      solid: true,
      headerClass: 'justify-content-center'
    })
  }

  saveEquipos () {
    // this.makeToast('success', 'NUEVO EQUIPO', '¡El equipo se registró exitosamente!')
    // console.log(this.$data.formEquipo)
  }

  onHideModalAddEquipo () {
    const formEquipo = {
      nombre: '',
      marca: '',
      modelo: '',
      noSerie: '',
      noCertificado: '',
      clasificacion: '',
      fechaCalibracion: '',
      hrsPromedioUso: ''
    }

    this.$data.formEquipo = formEquipo
  }
}
</script>

<style scoped>
 .cls-buscar{
    border: 2px solid #0A467A;
    box-shadow: unset;
    font-weight:600;
  }

  .cls-buscar::placeholder{
    color: #0A467A;
    font-weight:600;
  }

  .cls-buscar:focus, .cls-select-length:focus {
    color: #495057;
    background-color: #fff;
    border-color: #0A467A;
    outline: 0;
    box-shadow: 0 0 0 0.2rem #0a467a57;
  }
</style>
