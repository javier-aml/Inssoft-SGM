<template lang="pug">
div
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
    div.row.w-100.usersTable.pl-3
      div.col-md-12
        BTable(
          sticky-header
          responsive
          head-variant="dark"
          hover
          show-empty
          small
          empty-text="No hay usuarios"
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
          template(v-slot:cell(image)="data")
            div(v-if="data.value").text-center
              BAvatar(:href="profileImage + '/' + data.value" :src="profileImage + '/' + data.value" target="_blank" size="3.5rem")
            div(v-else).text-center
              BAvatar(size="3.5rem")
          template(v-slot:cell(acciones)="data")
            BButton(variant="primary" style="color:white" class="btn-block" @click="toggleEditUser(data.item)")
              BIconPencilSquare(class="mr-2")
              |Editar
            BButton(variant="danger" style="color:white" class="btn-block" @click="toggleDeleteUser(data.item.id)")
              BIconTrash(class="mr-2")
              |Eliminar
          <template #table-busy>
            div#table-busy.text-center.text-info.my-2
              BSpinner(class="align-middle").mr-3
              strong Cargando usuarios
          </template>
  div.row.justify-content-end
    div.col-md-8
      label(class="col-form-label-sm text-sm-right") Total: {{totalRows}} registros
    div.col-md-4
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0" />
  ModalConfirmation(
    :modalId="modalConfirmationId"
    title="¿Estas seguro que deseas eliminar el usuario?"
    @toggleDelete="deleteUser"
    :itemId="userDeleteId"
  )
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BTable, BFormGroup, BPagination, BSpinner, BFormInput, ToastPlugin, BAvatar, BFormSelect, BButton, BIconPencilSquare, BIconTrash, ModalPlugin } from 'bootstrap-vue'
import ModalConfirmation from '../components/ModalConfirmation.vue'
import { formatDate } from '~/assets/js/functions'

Vue.component('BTable', BTable)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BPagination', BPagination)
Vue.component('BSpinner', BSpinner)
Vue.component('BFormInput', BFormInput)
Vue.component('BAvatar', BAvatar)
Vue.component('BFormSelect', BFormSelect)
Vue.component('BButton', BButton)
Vue.component('BIconPencilSquare', BIconPencilSquare)
Vue.component('BIconTrash', BIconTrash)
Vue.component('ModalConfirmation', ModalConfirmation)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

@Component
export default class Equipos extends Vue {
  data () {
    return {
      items: [],
      fields: [
        { key: 'acciones', label: '', sortable: true, tdClass: 'align-middle' },
        { key: 'index', label: 'No.', sortable: true, tdClass: 'align-middle text-center' },
        { key: 'image', label: 'Imagen', sortable: true, tdClass: 'align-middle' },
        { key: 'firstname', label: 'Nombre', sortable: true, tdClass: 'align-middle' },
        { key: 'lastname', label: 'Apellido paterno', sortable: true, tdClass: 'align-middle' },
        { key: 'secondLastname', label: 'Apellido materno', sortable: true, tdClass: 'align-middle' },
        { key: 'email', label: 'Correo electrónico', sortable: true, tdClass: 'align-middle' },
        { key: 'birthdate', label: 'Cumpleaños', sortable: true, tdClass: 'align-middle', formatter: (value: string) => { return formatDate(value) } },
        { key: 'username', label: 'Username', sortable: true, tdClass: 'align-middle' },
        { key: 'role', label: 'Rol', sortable: true, tdClass: 'align-middle', formatter: (value: any) => { return value ? value.name : '' } }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Mostrar todos' }],
      filter: null,
      filterOn: [],
      isLoading: false,
      companyId: this.$auth.user?.companyId,
      modalConfirmationId: 'modalConfirmDeleteUser',
      userDeleteId: 0
    }
  }

  mounted () {
    this.getDatos()
  }

  get profileImage () {
    return process.env.publicFilesBase ? process.env.publicFilesBase : null
  }

  private async getDatos () {
    this.$data.isLoading = true

    try {
      const result:any = await this.$axios.$get('/user/users')
      const datos:any = await result

      this.$data.items = Object.values(datos.data)
      this.$data.totalRows = this.$data.items.length
    } catch (error) {

    }
    this.$data.isLoading = false
  }

  onFiltered (filteredItems: any) {
    this.$data.totalRows = filteredItems.length
    this.$data.currentPage = 1
  }

  toggleEditUser (data: any) {
    const { id = 0 } = data
    this.$router.push({ name: 'editar-usuario', path: '/editar-usuario/', query: { id } })
  }

  toggleDeleteUser (id: number) {
    const modalId = this.$data.modalConfirmationId
    this.$data.userDeleteId = id
    this.$bvModal.show(modalId)
  }

  async deleteUser (id: number) {
    try {
      const datos: any = await this.$axios.$delete('/user/user/', { params: { id } })

      if (datos.data) {
        const modalId = this.$data.modalConfirmationId
        this.getDatos()
        this.$bvModal.hide(modalId)
        this.$data.userDeleteId = 0
        this.makeToast('success', 'ELIMINAR USUARIO', '¡El usuario se eliminó exitosamente!')
      } else {
        this.makeToast('danger', 'ELIMINAR USUARIO', '¡Intenta nuevamente!')
      }
    } catch (error) {
      this.makeToast('danger', 'ELIMINAR USUARIO', '¡Intenta nuevamente!')
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

<style lang="css">
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

.usersTable .table th {
  position: sticky !important;
  top: 0 !important;
  z-index: 999 !important;
}

.usersTable th[aria-colindex="1"],
.usersTable td[aria-colindex="1"] { width: 150px !important; }

.usersTable th[aria-colindex="2"],
.usersTable td[aria-colindex="2"] { width: 100px !important; }

.usersTable th[aria-colindex="3"],
.usersTable td[aria-colindex="3"] { width: 150px !important; }

.usersTable th[aria-colindex="4"],
.usersTable td[aria-colindex="4"] { width: 200px !important; }

.usersTable th[aria-colindex="5"],
.usersTable td[aria-colindex="5"] { width: 200px !important; }

.usersTable th[aria-colindex="6"],
.usersTable td[aria-colindex="6"] { width: 200px !important; }

.usersTable th[aria-colindex="7"],
.usersTable td[aria-colindex="7"] { width: 200px !important; }

.usersTable th[aria-colindex="8"],
.usersTable td[aria-colindex="8"] { width: 200px !important; }

.usersTable th[aria-colindex="9"],
.usersTable td[aria-colindex="9"] { width: 250px !important; }

.usersTable th[aria-colindex="10"],
.usersTable td[aria-colindex="10"] { width: 200px !important; }

</style>
