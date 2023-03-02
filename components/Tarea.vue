<template lang="pug">
BModal(scrollable='' id="modal-single-tarea" centered size='xl' :title='"Tarea: "+this.$props.Tarea' no-enforce-focus)

  #mainwin
    .container.gy-5.descTable.text-center.rnd(style="background-color: #fff")

    .container-fluid
      .row
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
          empty-text="No hay instrumentos"
          empty-filtered-text="No se encontro una coincidencia con el valor buscado"
          :busy="isLoading"
        )
            <template v-slot:cell(Validar)="{ item }">
              span
                BButton(type="button" class="btn btn-primary"  @click="showModal($event)" ) Validar
            </template>
    BModal(
      ref="AgregarPDFTask"
      id="AgregarPDFTask"
      title="Generar PDF"
      header-bg-variant="dark"
      header-text-variant="light"
      hide-footer
      class="modal-lg"
      no-enforce-focus
    )
      BForm( v-on:submit.prevent="ConvertToPdf" autocomplete="off")
        .containerRight(ref="capture")
          HtmlToPdf(:company-id="this.$auth.user?.companyId" :file-name="this.fileName" @closeModal="hideModal")
  template(#modal-footer='')
    .w-100
      b-button.float-right(variant='outline-secondary'  @click='closeModal()')
        | Cerrar

</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
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
Vue.component('BForm', BForm)
Vue.component('BFormCheckbox', BFormCheckbox)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

@Component({
  mixins: [validationMixin],
  auth: true
})

export default class Tarea extends Vue {
  $axiosSgm: any
  $html2canvas: any

  data () {
    return {
      fields: [
        { key: 'id', label: 'No.', class: 'id', sortable: true, sortDirection: 'desc', thStyle: { width: '80px' } },
        { key: 'tarea', label: 'Tarea', sortable: true, thStyle: { width: '200px' } },
        { key: 'descTarea', label: 'Descripción de la Tarea', sortable: true, thStyle: { width: '250px' } },
        { key: 'fecha', label: 'Fecha', sortable: true, thStyle: { width: '200px' } },
        { key: 'Validar', label: 'Validar', sortable: true, thStyle: { width: '200px' } }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Mostrar todos' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      isLoading: false,
      TaskSelected: ''
    }
  }

  @Prop() items: Array<object> = []
  @Prop({ default: 'tarea' }) readonly Tarea: string = ''
  @Prop() totalRows: number = 0
  @Prop() fileName: string = ''
  @Prop() idTarea: number| undefined = undefined
  @Emit('gettaskparent')
  doTask () {
    return true
  }

  closeModal () {
    this.$bvModal.hide('modal-single-tarea')
  }

  showCaptureRef () {
    const vc = this
    return vc.$refs.capture
  }

  async showModal () : Promise<void> {
    await this.$bvModal.show('AgregarPDFTask')
    const modal:any = document.querySelector('.modal-md')
    modal.classList.remove('modal-md')
    modal.classList.add('modal-xl')
  }

  hideModal () {
    this.$bvModal.hide('AgregarPDFTask')
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

.containerRight{
  /*background: #F1F1F1 !important;*/
  /* margin:auto; */
  width:auto;
  height:auto;
  padding:1%;
  background-color:white;
  border: solid;
  border-color:#f1f1f0;
  margin-top: 2%;
  margin-bottom: 2%;
  /* top: 30%; */
  /* margin-right: 50%;
  left: 50%; */
}
</style>
