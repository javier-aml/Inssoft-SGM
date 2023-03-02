<template lang="pug">
div
  div.row
    div.col-md-12.mb-4
        BButton(type="button" class="btn btn-primary"  @click="showModal" )
          BIconPlus
          | Agregar instrumento
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
    div.row.w-100.instrumentosTable.pl-3
      div.col-md-12
        BTable(
          sticky-header
          responsive
          head-variant="dark"
          hover
          show-empty
          small
          empty-text="No hay instrumentos"
          empty-filtered-text="No se encontro una coincidencia con el valor buscado"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :busy="isLoading"
          @filtered="onFiltered"
          selectable
          select-mode="single"
          @row-selected="selectRow"
        )
          template(v-slot:cell(index)="data") {{ data.index + 1 }}
          <template #table-busy>
            div#table-busy.text-center.text-info.my-2
              BSpinner(class="align-middle").mr-3
              strong Cargando instrumentos
          </template>
  div.row.justify-content-end
    div.col-md-8
      label(class="col-form-label-sm text-sm-right") Total: {{totalRows}} registros
    div.col-md-4
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0" />
  BModal(
    id="modalAddInstrumento"
    size="lg"
    title="Nuevo instrumento"
    header-bg-variant="dark"
    header-text-variant="light"
    @hide="onHideModalAddInstrumento"
    hide-footer
  )
    BForm( v-on:submit.prevent="saveInstrumento" autocomplete="off")
      div.row
        div.col-md-5
          BFormGroup(label="*Código")
            BFormInput(
              v-model.trim="formInstrumento.codigo"
              placeholder="Ingresa el código"
              required
            )
        div.col-md-7
          BFormGroup(label="Fecha de Alta")
            BFormDatepicker(
              v-model="formInstrumento.fechaAlta"
              placeholder="Seleccionar fecha"
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
      div.row
        div.col-md-12
          BFormGroup(label="Nombre completo")
            BFormInput(
              v-model.trim="formInstrumento.nombre"
              placeholder="Ingresa el nombre"
            )
      div.row
        div.col-md-4
          BFormGroup(label="Ubicación")
            BFormInput(
              v-model.trim="formInstrumento.ubicacion"
              placeholder="Ingresa la ubicación"
            )
        div.col-md-4
          BFormGroup(label="*Marca")
            BFormInput(
              v-model.trim="formInstrumento.marca"
              placeholder="Ingresa la marca"
              required
            )
        div.col-md-4
          BFormGroup(label="*Modelo")
            BFormInput(
              v-model.trim="formInstrumento.modelo"
              placeholder="Ingresa el modelo"
              required
            )
      div.row
        div.col-md-6
          BFormGroup(label="Amplitud de medición")
            BFormInput(
              v-model.trim="formInstrumento.amplitudMedicion"
              placeholder="Ingresa la amplitud de medición"
            )
        div.col-md-6
          BFormGroup(label="Frecuencia de Calibración")
            BFormInput(
              v-model.trim="formInstrumento.frecuenciaCalibracion"
              placeholder="Ingresa la frecuencia de calibración"
            )
      div.row
        div.col-md-4
          BFormGroup(label="Exactitud Requerida")
            BFormInput(
              v-model.trim="formInstrumento.exactitudRequerida"
              placeholder="Ingresa la exactitud requerida"
            )
        div.col-md-4
          BFormGroup(label="Incertidumbre")
            BFormInput(
              v-model.trim="formInstrumento.incertidumbre"
              placeholder="Ingresa la incertidumbre"
            )
        div.col-md-4
          BFormGroup(label="*Número de Serie")
            BFormInput(
              v-model.trim="formInstrumento.noSerie"
              placeholder="Ingresa el número de serie"
              required
            )
      div.row
        div.col-md-4
          BFormGroup(label="Número de certificado")
            BFormInput(
              v-model.trim="formInstrumento.noCertificado"
              placeholder="Ingresa el número de certificado"
            )
        div.col-md-4
          BFormGroup(label="Número de patrón")
            BFormInput(
              v-model.trim="formInstrumento.noPatron"
              placeholder="Ingresa el número de patrón"
            )
        div.col-md-4
          BFormGroup(label="Vigencia del patrón")
            BFormDatepicker(
              v-model="formInstrumento.vigenciaPatron"
              placeholder="Seleccionar fecha"
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
      div.row
        div.col-md-4
          BFormGroup(label="Última calibración")
            BFormDatepicker(
              v-model="formInstrumento.ultimaCalibracion"
              placeholder="Seleccionar fecha"
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
        div.col-md-6
          BFormGroup(label="*Tipo instrumento")
            BFormSelect(
              style="width: 100%"
              :options="optionsSelectTipo"
              v-model="formInstrumento.tipo"
              required
            )
      div.modal-footer
        BButton(variant="danger" @click="hideModal")
          |Cancelar
        BButton(variant="success" type="submit")
          |Guardar
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
  ToastPlugin,
  ModalPlugin,
  BForm,
  BFormCheckbox
}
  from 'bootstrap-vue'

import { formatDate } from '~/assets/js/functions'

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
Vue.component('BForm', BForm)
Vue.component('BFormCheckbox', BFormCheckbox)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

@Component
export default class Equipos extends Vue {
  $axiosSgm: any

  data () {
    return {
      items: [],
      fields: [
        { key: 'index', label: 'No.', sortable: true },
        // { key: 'id', label: 'N°', sortable: true },
        { key: 'codigo', label: 'Código/ID', sortable: true },
        { key: 'fechaAlta', label: 'Fecha de Alta', sortable: true, formatter: (value: string) => { return formatDate(value) } },
        { key: 'nombre', label: 'Nombre Completo', sortable: true },
        { key: 'ubicacion', label: 'Ubicación', sortable: true },
        { key: 'marca', label: 'Marca', sortable: true },
        { key: 'modelo', label: 'Modelo', sortable: true },
        { key: 'amplitudMedicion', label: 'Amplitud de Medición', sortable: true },
        { key: 'frecuenciaCalibracion', label: 'Frecuencia de Calibración', sortable: true },
        { key: 'exactitudRequerida', label: 'Exactitud Requerida', sortable: true },
        { key: 'incertidumbre', label: 'Incertidumbre', sortable: true },
        { key: 'noSerie', label: 'Número de Serie', sortable: true },
        { key: 'noCertificado', label: 'Número de Certificado', sortable: true },
        { key: 'noPatron', label: 'Número del Patrón', sortable: true },
        { key: 'vigenciaPatron', label: 'Vigencia del Patrón', sortable: true, formatter: (value: string) => { return value === null ? 'INDEFINIDA' : formatDate(value) } },
        { key: 'ultimaCalibracion', label: 'Última Calibración del Patrón', sortable: true, formatter: (value: string) => { return formatDate(value) } },
        { key: 'tipo', label: 'Tipo', sortable: true }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Mostrar todos' }],
      filter: null,
      filterOn: [],
      isLoading: false,
      optionsSelectTipo: [
        { value: null, text: 'Selecciona una opción' },
        { value: 'Medidores de nivel', text: 'Medidores de nivel' },
        { value: 'Basculas de alta capacidad', text: 'Basculas de alta capacidad' },
        { value: 'Medidores de temperatura', text: 'Medidores de temperatura' },
        { value: 'Medidores de presión absoluta', text: 'Medidores de presión absoluta' },
        { value: 'Medidores de flujo tipo coriolis', text: 'Medidores de flujo tipo coriolis' },
        { value: 'Otros', text: 'Otros' }
      ],
      formInstrumento: {
        codigo: '',
        fechaAlta: null,
        nombre: '',
        ubicacion: '',
        marca: '',
        modelo: '',
        amplitudMedicion: '',
        frecuenciaCalibracion: '',
        exactitudRequerida: '',
        incertidumbre: '',
        noSerie: '',
        noCertificado: '',
        noPatron: '',
        vigenciaPatron: null,
        ultimaCalibracion: null,
        tipo: null,
        companyId: this.$auth.user?.companyId
      }
    }
  }

  mounted () {
    this.getDatos()
  }

  private async getDatos () {
    this.$data.isLoading = true

    const companyId:any = this.$auth.user?.companyId
    const result:any = await this.$axiosSgm.$get(`/instrumentos/${companyId}`)
    const datos:any = await result
    this.$data.items = Object.values(datos.instrumentos)
    this.$data.totalRows = this.$data.items.length
    this.$data.isLoading = false
  }

  showModal () {
    this.$bvModal.show('modalAddInstrumento')
  }

  hideModal () {
    this.$bvModal.hide('modalAddInstrumento')
  }

  onFiltered (filteredItems: any) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.$data.totalRows = filteredItems.length
    this.$data.currentPage = 1
  }

  selectRow (data: any) {
    const { id = 0 } = data[0]
    this.$router.push({ name: 'detalle-instrumento', path: '/detalle-instrumento/', query: { id } })
  }

  private makeToast (variant: string = '', title: string = '', body: string = '') {
    this.$bvToast.toast(body, {
      title,
      variant,
      solid: true,
      headerClass: 'justify-content-center'
    })
  }

  async saveInstrumento () {
    const datos:any = await this.$axiosSgm.$post('/instrumentos', this.$data.formInstrumento)

    if (datos.success) {
      this.getDatos()
      this.hideModal()
      this.makeToast('success', 'NUEVO INSTRUMENTO', '¡El instrumento se registró exitosamente!')
    } else {
      this.makeToast('danger', 'NUEVO INSTRUMENTO', '¡Intenta nuevamente!')
    }
  }

  onHideModalAddInstrumento () {
    const formInstrumento = {
      codigo: '',
      fechaAlta: null,
      nombre: '',
      ubicacion: '',
      marca: '',
      modelo: '',
      amplitudMedicion: '',
      frecuenciaCalibracion: '',
      exactitudRequerida: '',
      incertidumbre: '',
      noSerie: '',
      noCertificado: '',
      noPatron: '',
      vigenciaPatron: null,
      ultimaCalibracion: null,
      tipo: null,
      companyId: this.$auth.user?.companyId
    }

    this.$data.formInstrumento = formInstrumento
  }
}
</script>

<style>
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

.b-table-sticky-header {
  overflow-y: auto;
  max-height: 450px;
}

.instrumentosTable .table th {
  position: sticky !important;
  top: 0 !important;
  z-index: 999 !important;
}

.instrumentosTable th[aria-colindex="1"],
.instrumentosTable td[aria-colindex="1"] { width: 100px !important; }

.instrumentosTable th[aria-colindex="2"],
.instrumentosTable td[aria-colindex="2"] { width: 140px !important; }

.instrumentosTable th[aria-colindex="3"],
.instrumentosTable td[aria-colindex="3"] { width: 150px !important; }

.instrumentosTable th[aria-colindex="4"],
.instrumentosTable td[aria-colindex="4"] { width: 350px !important; }

.instrumentosTable th[aria-colindex="5"],
.instrumentosTable td[aria-colindex="5"] { width: 150px !important; }

.instrumentosTable th[aria-colindex="6"],
.instrumentosTable td[aria-colindex="6"] { width: 350px !important; }

.instrumentosTable th[aria-colindex="7"],
.instrumentosTable td[aria-colindex="7"] { width: 200px !important; }

.instrumentosTable th[aria-colindex="8"],
.instrumentosTable td[aria-colindex="8"] { width: 250px !important; }

.instrumentosTable th[aria-colindex="9"],
.instrumentosTable td[aria-colindex="9"] { width: 250px !important; }

.instrumentosTable th[aria-colindex="10"],
.instrumentosTable td[aria-colindex="10"] { width: 250px !important; }

.instrumentosTable th[aria-colindex="11"],
.instrumentosTable td[aria-colindex="11"] { width: 150px !important; }

.instrumentosTable th[aria-colindex="12"],
.instrumentosTable td[aria-colindex="12"] { width: 150px !important; }

.instrumentosTable th[aria-colindex="13"],
.instrumentosTable td[aria-colindex="13"] { width: 250px !important; }

.instrumentosTable th[aria-colindex="14"],
.instrumentosTable td[aria-colindex="14"] { width: 250px !important; }

.instrumentosTable th[aria-colindex="15"],
.instrumentosTable td[aria-colindex="15"] { width: 250px !important; }

.instrumentosTable th[aria-colindex="16"],
.instrumentosTable td[aria-colindex="16"] { width: 250px !important; }

.instrumentosTable th[aria-colindex="17"],
.instrumentosTable td[aria-colindex="17"] { width: 240px !important; }
</style>
