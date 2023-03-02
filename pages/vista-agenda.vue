
<template lang="pug">
div
  Tarea(
    :items="datosTareas.items",
    :Tarea="datosTareas.Tarea",
    :totalRows="datosTareas.totalRows",
    :fileName="datosTareas.fileName"
    :idTarea="datosTareas.idTarea"
    @gettaskparent="gettareas"
  )
  #mainwin.container-fluid
  div(cols="12" sm="12" md="8" lg="9" xl="10")
    b-row(class="flex-wrap h-100 bg-light pl-3")
      b-col(cols="12" sm="12" md="12" lg="12" xl="12")
        b-row(class="justify-content-between mt-5 px-5")
          div(cols="12" sm="12" md="12" class="col-lg-auto pl-4")
            h4(class="m-0") Vista de agenda
            p(class="w-100 text-muted") Visualiza las tareas agendadas
          b-col(cols="12" sm="12" md="12" class="col-lg-auto")
            div(class="justify-content-around justify-content-lg-end align-items-center")
              div(class="col-auto")
                b-button(
                  v-b-modal.modal-center
                  class="d-flex justify-content-center align-items-center btnSecondary bg-white border-secondary px-4 mb-3"
                  variant="outline-dark"
                )
                  img(width="26px" src="../assets/img/icons/historyTask.svg")
                  h6(class="m-0 p-2 pl-3 font-weight-bold text-secondary") Historial de tareas realizadas
                b-modal(id="modal-center" size="xl" hide-footer hide-header scrollable centered title="Historial de tareas realizadas")
                  b-row
                    b-col
                      h2 Historial de tareas realizadas
                      h6 Tareas ya Realizadas
                      b-row
                        b-table(class="tablaHistorial" borderless hover :items="realizada" centered hide-header)
                    b-col(class="text-right col-auto")
                      b-button(variant="outline-dark" class="font-weight-bold border-0" @click="$bvModal.hide('modal-center')")
                        h6(class="xm-0 font-weight-bold ") X
        b-row(class="my-3")
          b-col(cols="12" sm="12" md="12" lg="9")
            b-row
              b-button(
                v-b-toggle.collapse-retraso variant="danger"
                class="w-100 px-5 py-3 d-flex justify-content-between align-items-center roundedNoneB"
              )
                h5(class="m-0")
                  | Tareas con retraso&nbsp;
                  span ({{ retraso.length }})
                img(width="16px" src="../assets/img/icons/arrowB.svg")
              b-collapse(visible id="collapse-retraso" class="w-100")
                BCard(class="roundedNoneT")
                  b-row(class="taskTable")
                    b-table(
                      responsive
                      thead-class="hidden_header"
                      :items="retraso"
                      empty-text="No hay tareas"
                      show-empty
                      :fields = [
                        {key:'Key', label:''},
                        {key: 'Value', label: ''},
                        {key: 'desc', label: ''},
                        {key:'eliminar', label:''},
                        {key: 'ver', label:'' }
                      ]
                    )
                      template(#cell(Key)="data")
                        p(class="m-0 mx-2") {{ data.item.value.proveedor }}
                      template(#cell(Value)="data")
                        p(class="m-0 ") Se retraso por&nbsp;
                          b {{ data.item.value.FechaRestante }} días
                      template(#cell(eliminar)="data")
                        b-button(
                          class="d-flex justify-content-center align-items-center border-danger bg-white border-secondary px-2"
                          variant="outline-dark"
                          style="width: 180px"
                        )
                          img(class="ml-2" width="18px" src="../assets/img/icons/erase.svg")
                          h6(class="m-0 p-2 pl-2 font-weight-bold text-danger") Eliminar
                      template(#cell(desc)="data")
                        p(class="m-0") {{ data.item.value.desc }}
                      template(#cell(ver)="data")
                        b-button(
                          class="d-flex justify-content-center align-items-center btnSecondary bg-white border-secondary px-2"
                          variant="outline-dark"
                          style="width: 180px"
                          @click="getDatos(data.item.value.position)"
                        )
                          h6(class="m-0 p-2 pl-2 font-weight-bold text-secondary") Ver tarea
                          img(class="ml-2" width="1px" src="../assets/img/icons/arrowL.svg")
            b-row
              b-button(
                v-b-toggle.collapse-urgencia variant="warning"
                class="w-100 px-5 py-3 d-flex justify-content-between align-items-center roundedNoneB mt-5"
              )
                h5(class="m-0 text-light")
                  |Tareas con urgencia&nbsp;
                  span ({{ urgente.length }})
                img(width="16px" src="../assets/img/icons/arrowB.svg")
              b-collapse(id="collapse-urgencia" class="w-100")
                BCard(class="roundedNoneT")
                  b-row(class="taskTable")
                    b-table(
                        responsive
                        thead-class="hidden_header"
                        :items="urgente"
                        empty-text="No hay tareas"
                        show-empty
                        :fields = [
                          {key:'Key', label:''},
                          {key: 'Value', label: ''},
                          {key: 'desc', label: ''},
                          {key:'eliminar', label:''},
                          {key: 'ver', label:'' }
                        ]
                      )
                        template(#cell(Key)="data")
                          p(class="m-0 mx-2") {{ data.item.value.proveedor }}
                        template(#cell(Value)="data")
                          p(class="m-0 ") Faltan días &nbsp;
                            b {{ data.item.value.FechaRestante }} para entregar
                        template(#cell(eliminar)="data")
                          b-button(
                            class="d-flex justify-content-center align-items-center border-danger bg-white border-secondary px-2"
                            variant="outline-dark"
                            style="width: 180px"
                          )
                            img(class="ml-2" width="18px" src="../assets/img/icons/erase.svg")
                            h6(class="m-0 p-2 pl-2 font-weight-bold text-danger") Eliminar
                        template(#cell(desc)="data")
                          p(class="m-0") {{ data.item.value.desc }}
                        template(#cell(ver)="data")
                          b-button(
                            class="d-flex justify-content-center align-items-center btnSecondary bg-white border-secondary px-2"
                            variant="outline-dark"
                            style="width: 180px"
                            @click="getDatos(data.item.value.position)"
                          )
                            h6(class="m-0 p-2 pl-2 font-weight-bold text-secondary") Ver tarea
                            img(class="ml-2" width="1px" src="../assets/img/icons/arrowL.svg")
            b-row
              b-button(
                v-b-toggle.collapse-curso
                variant="secondary"
                class="w-100 px-5 py-3 d-flex justify-content-between align-items-center roundedNoneB mt-5"
              )
                h5(class="m-0 text-light")
                  |Tareas en curso&nbsp;
                  span ({{ noUrgente.length }})
                img(width="16px" src="../assets/img/icons/arrowB.svg")
              b-collapse(id="collapse-curso" class="w-100")
                BCard(class="roundedNoneT")
                  b-row(class="taskTable")
                    b-table(
                        responsive
                        thead-class="hidden_header"
                        :items="noUrgente"
                        empty-text="No hay tareas"
                        show-empty
                        :fields = [
                          {key:'Key', label:''},
                          {key: 'Value', label: ''},
                          {key: 'desc', label: ''},
                          {key:'eliminar', label:''},
                          {key: 'ver', label:'' }
                        ]
                      )
                        template(#cell(Key)="data")
                          p(class="m-0 mx-2") {{ data.item.value.proveedor }}
                        template(#cell(Value)="data")
                          p(class="m-0 ") Faltan días &nbsp;
                            b {{ data.item.value.FechaRestante }} para entregar
                        template(#cell(eliminar)="data")
                          b-button(
                            class="d-flex justify-content-center align-items-center border-danger bg-white border-secondary px-2"
                            variant="outline-dark"
                            style="width: 180px"
                          )
                            img(class="ml-2" width="18px" src="../assets/img/icons/erase.svg")
                            h6(class="m-0 p-2 pl-2 font-weight-bold text-danger") Eliminar
                        template(#cell(desc)="data")
                          p(class="m-0") {{ data.item.value.desc }}
                        template(#cell(ver)="data")
                          b-button(
                            class="d-flex justify-content-center align-items-center btnSecondary bg-white border-secondary px-2"
                            variant="outline-dark"
                            style="width: 180px"
                            @click="getDatos(data.item.value.position)"
                          )
                            h6(class="m-0 p-2 pl-2 font-weight-bold text-secondary") Ver tarea
                            img(class="ml-2" width="1px" src="../assets/img/icons/arrowL.svg")
          b-col(cols="12" sm="12" md="12" lg="3")
            BCard(class="mt-3 mt-lg-0 p-1")
              b-row(class="align-items-center")
                b-col(cols="8" sm="8" md="12" lg="12" xl="8")
                  h6(class="m-0 text-muted font-weight-bold") Porcentaje de avance
                  h1(class="font-weight-bold text-secondary m-0 mt-1") 10%
                b-col(cols="4" sm="4" md="12" lg="12" xl="4")
                  div(class="w-100")
                  svg(
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 110.709 117.409"
                  )
                    defs
                      clipPath(id="clip-path")
                        path(
                          id="Trazado_734"
                          data-name="Trazado 734"
                          d="M20854.16,11901.591l1.723,80.986,57.826-59.26Z"
                          transform="translate(-19081 -11724)"
                          fill="none"
                          stroke="#707070"
                          stroke-width="1"
                        )
                    g(id="Grupo_1409" data-name="Grupo 1409" transform="translate(-1757 -177.591)")
                      g(
                        id="Elipse_46"
                        data-name="Elipse 46"
                        transform="translate(1757 192)"
                        fill="none"
                        stroke="#eaeaea"
                        stroke-width="11"
                      )
                        circle(cx="51.5" cy="51.5" r="51.5" stroke="none")
                        circle(cx="51.5" cy="51.5" r="46" fill="none")
                      g(
                        id="Enmascarar_grupo_9"
                        data-name="Enmascarar grupo 9"
                        transform="translate(35)"
                        clip-path="url(#clip-path)"
                      )
                        g(
                          id="Elipse_47"
                          data-name="Elipse 47"
                          transform="translate(1722 192)"
                          fill="none"
                          stroke="#0a467a"
                          stroke-width="14"
                        )
                          circle(cx="51.5" cy="51.5" r="51.5" stroke="none")
                          circle(cx="51.5" cy="51.5" r="44.5" fill="none")
            BCard(class="mt-5 p-1")
              b-row(class="align-items-center")
                b-col(cols="8" sm="8" md="12" lg="12" xl="8")
                  h6(class="m-0 text-muted font-weight-bold") Tickets
                  h1(class="font-weight-bold text-primary m-0 mt-1") 30%
                b-col(cols="4" sm="4" md="12" lg="12" xl="4")
                  div(class="w-100")
                    svg(
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 112.152 117.409"
                    )
                      defs
                        clipPath(id="clip-path")
                          path(
                            id="Trazado_735"
                            data-name="Trazado 735"
                            d="M20854.16,11901.591v57.445l60.992,11.789v-69.234Z"
                            transform="translate(-19081 -11724)"
                            fill="none"
                            stroke="#707070"
                            stroke-width="1"
                          )
                      g(id="Grupo_1410" data-name="Grupo 1410" transform="translate(-1757 -352.591)")
                        g(
                          id="Elipse_48"
                          data-name="Elipse 48"
                          transform="translate(1757 367)"
                          fill="none"
                          stroke="#eaeaea"
                          stroke-width="11"
                        )
                          circle(cx="51.5" cy="51.5" r="51.5" stroke="none")
                          circle(cx="51.5" cy="51.5" r="46" fill="none")
                        g(
                          id="Enmascarar_grupo_10"
                          data-name="Enmascarar grupo 10"
                          transform="translate(35 175)"
                          clip-path="url(#clip-path)"
                        )
                          g(
                            id="Elipse_49"
                            data-name="Elipse 49"
                            transform="translate(1722 192)"
                            fill="none"
                            stroke="#fe891a"
                            stroke-width="14"
                          )
                            circle(cx="51.5" cy="51.5" r="51.5" stroke="none")
                            circle(cx="51.5" cy="51.5" r="44.5" fill="none")
        b-row(class="mt-5")
          b-col(cols="12" sm="12" md="12" class="fullCalendar mt-5 bg-light")
            full-calendar(:options="calendarOptions")
        BModal(
          ref="TareasModal"
          id="TareasModal"
          title="Tareas"
          header-bg-variant="dark"
          header-text-variant="light"
          hide-footer
          class="modal-lg"
        )
          p {{modalContent}}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BCard, BPopover, BModal } from 'bootstrap-vue'
import { validationMixin } from 'vuelidate'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import listPlugin from '@fullcalendar/list'
// import { createPopper } from '@popperjs/core'
// import { text } from 'body-parser'
Vue.component('BCard', BCard)
Vue.component('FullCalendar', FullCalendar)
Vue.component('BPopover', BPopover)
Vue.component('BModal', BModal)

interface Task {
  Id_File?: Number,
  Finished?: Number,
  Fecha?: Date,
  companyId?: Number,
  Estado?: Number
}

@Component({
  mixins: [validationMixin],
  auth: true
})
export default class vistaAgenda extends Vue {
  modalContent: String | null = ''
  messageError: string | undefined
  loading: boolean = false
  checked: boolean = false
  indeterminate: boolean = false
  $axiosSgm: any
  urgente: Array<Task> = []
  retraso: Array<Task> = []
  noUrgente: Array<Task> = []
  realizada: Array<Task> = []
  datosTareas: {
    items: Array<object>;
    Tarea: string;
    totalRows: number;
    fileName: string;
    idTarea: number| undefined;
  } = {
      items: [],
      Tarea: '',
      totalRows: 0,
      fileName: '',
      idTarea: undefined
    }

  data () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        locale: esLocale,
        dateClick: this.handleDateClick,
        headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' },
        buttonText: {
          today: 'Hoy',
          month: 'Mensual',
          week: 'Semanal',
          day: 'Diario',
          list: 'Lista'
        },
        eventClick: (info: { event : { title : string }, el: HTMLElement}) => {
          this.modalContent = info.event.title
          this.showModal()
        },
        events: [
        ],
        views: {
          dayGrid: {
            // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
          },
          timeGrid: {
            // options apply to timeGridWeek and timeGridDay views
          },
          week: {
            // options apply to dayGridWeek and timeGridWeek views
          },
          day: {
            // options apply to dayGridDay and timeGridDay views
          }
        }
      }
    }
  }

  async showModal () : Promise<void> {
    await this.$bvModal.show('TareasModal')
  }

  mounted () {
    this.gettareas()
    this.gettareasRealizadas()
    this.calendario()
  }

  async gettareas () {
    const companyId:any = this.$auth.user?.companyId
    const Task = await this.$axiosSgm.$get('/Task/' + companyId)
    this.urgente = Task.urgente
    this.retraso = Task.retraso
    this.noUrgente = Task.noUrgente
  }

  async gettareasRealizadas () {
    this.loading = true
    try {
      const Task = await this.$axiosSgm.$get('/Taskprueba/')
      this.realizada = Task
      this.loading = false
    } catch (error) {
      this.loading = false
      this.messageError = 'Peticion invalida'
    }
  }

  async calendario () {
    this.loading = true
    try {
      const taskList = await this.$axiosSgm.$get('/calendar/')
      this.$data.calendarOptions.events = taskList
      this.loading = false
    } catch (error) {
      this.loading = false
      this.messageError = 'Peticion invalida'
    }
  }

  handleDateClick () {
    alert('No hay tarea agendada')
  }

  async getDatos (idTarea: number) {
    try {
      const companyId:any = this.$auth.user?.companyId
      const result: any = await this.$axiosSgm.$get('/Tareas/' + idTarea + '/' + companyId)

      if (result) {
        const datos: any = await result
        this.datosTareas.items = datos.tarea
        const Tarea: any = datos.ubicacionTarea[0]
        this.datosTareas.Tarea = Tarea.dirName
        this.datosTareas.totalRows = this.datosTareas.items.length
        this.datosTareas.fileName = datos.ubicacionHTML[0].fileName
        this.datosTareas.idTarea = idTarea
        this.$bvModal.show('modal-single-tarea')
      }
    } catch (error) {
      this.$bvToast.toast('Algo ha salido mal, intenta más tarde.', {
        title: 'Error en solicitud',
        autoHideDelay: 5000,
        variant: 'warning',
        appendToast: true,
        toaster: 'b-toaster-bottom-right'
      })
    }
  }
}
</script>

<style lang="css" scoped>
.btn-primary {
  font-weight: 700;
  background-color: #fff;
  border-color: #0A467A;
  border-radius: 5px;
  color: #0A467A;
  margin: 20px 140px;
  padding: .5rem;
  transition: .5s;
}
  .btn-primary:hover{
  color:#2980b9;
  border-color: #2980b9;
}

.tablaHistorial {
  overflow: scroll;
  height: 60vh;
  width: 200%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.calendar-sidebar>.month-list>.calendar-months>li.active-month {
  background-color: #0b467a;
  color: white;
}

.calendar-sidebar>.calendar-year>button.icon-button>span {
  border-right: 4px solid #212529;
  border-bottom: 4px solid #212529;
  width: 100%;
  height: 100%;
}

.calendar-sidebar {
  position: absolute;
  margin-top: 0;
  width: 200px;
  height: 100%;
  float: left;
  background-color: #fbfbfb;
  color: #212529;
  font-weight: bold;
  z-index: 1;
  -webkit-box-shadow: 0px 0px 0px 0px #ffffff00;
  box-shadow: 0px 0px 0px 0px #ffffff00;
  -webkit-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
  -webkit-transform: translateX(0);
  -ms-transform: translateX(0);
  transform: translateX(0);
  z-index: 2;
}

.calendar-sidebar>.month-list>.calendar-months>li {
  padding: 12px 10px;
  cursor: pointer;
  font-size: 16px;
}

.calendar-sidebar>.calendar-year>button.icon-button {
  display: inline-block;
  width: 8px;
  height: 8px;
  overflow: visible;
}

.calendar-sidebar>.calendar-year>p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
}

.calendar-sidebar>.calendar-year {
  padding: 10px 20px;
  text-align: center;
}

.sidebar-hide .calendar-inner,
.event-hide .calendar-inner {
  height: 620px;
}

.calendar-sidebar>.month-list>.calendar-months>li {
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
}

.calendar-sidebar>.month-list>.calendar-months>li:hover {
  background-color: #0b467a96;
  color: white;
}

.calendar-sidebar>span#sidebarToggler {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  right: 0;
  -webkit-transform: translate(100%, 0);
  -ms-transform: translate(100%, 0);
  transform: translate(100%, 0);
  background-color: #ffffff;
  border: solid 2px #FE891A;
  padding: 8px 8px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0 0px 0px #FE891A;
  box-shadow: 0px 0 0px 0px #FE891A;
}

.tooltip-cal {
  position: absolute;
  z-index: 9999;
  background: #FFC107;
  color: black;
  width: 150px;
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
  padding: 10px;
  text-align: center;
}

button.icon-button>span.bars,
button.icon-button>span.bars::before,
button.icon-button>span.bars::after {
  background-color: #FE891A;
}

th[colspan="7"] {
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 30px;
  padding: 10px;
  color: #212121;
}

#eventListToggler {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  right: 0;
  background-color: #FE891A;
  padding: 14px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0 0px 0px #FE891A;
  box-shadow: 0px 0 0px 0px #FE891A;
  z-index: 1;
}

.event-list>.event-empty {
  padding: 15px 10px;
  background-color: #D3EDDA;
  border: 1px solid #155724;
}

.event-list>.event-empty>p {
  margin: 0;
  color: #155724;
  font-weight: bold;
}

.evo-calendar {
  -webkit-box-shadow: 0px 0px 0px 0 #ffffff;
  box-shadow: 0px 0px 0px 0 #ffffff;
}

th[colspan="7"]::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  width: 60px;
  height: 5px;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: #0b467a96;
  margin-bottom: 10px;
}
.roundedNoneB{
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.roundedNoneT{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.taskTable thead {
  display: none;
}

.taskTable .table th,
.taskTable .table td {
  border: 0 solid white;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
}

.b-table-empty-row{
  width: 100% !important;
}
.taskTable th[aria-colindex="1"],
.taskTable td[aria-colindex="1"] {
  min-width: 370px !important;
}

.taskTable th[aria-colindex="2"],
.taskTable td[aria-colindex="2"] {
  min-width: 250px !important;
}

.taskTable th[aria-colindex="3"],
.taskTable td[aria-colindex="3"] {
  min-width: 200px !important;
}

.taskTable th[aria-colindex="4"],
.taskTable td[aria-colindex="4"],
th[aria-colindex="5"],
.taskTable td[aria-colindex="5"] {
  min-width: 150px !important;
}

.a15{
  width: 15px;
  height: 15px;
}

@media (min-width: 768px) and (max-width:1300px) {

  .calendar-events {
    width: 100%;
    padding: 70px 10px 60px 10px;
    height: auto;
    top: 620px;
  }

  #eventListToggler,
  .event-hide #eventListToggler,
  .calendar-sidebar>span#sidebarToggler,
  #eventListToggler {
    display: none;
  }

  .evo-calendar {
    position: relative;
    background-color: #fbfbfb;
    color: #5a5a5a;
    width: 100%;
    -webkit-box-shadow: 0px 0px 0px 0 #ffffff;
    box-shadow: 0px 0px 0px 0 #ffffff;
    margin: 0 auto;
    overflow: inherit;
    z-index: 1;
    height: 1600px;
  }

  .calendar-sidebar {
    width: 108px;
    height: 620px;
  }

  .calendar-sidebar>.calendar-year {
    padding: 20px;
    text-align: center;
  }

  .calendar-sidebar>.month-list>.calendar-months>li {
    padding: 7px 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .calendar-sidebar>.month-list>.calendar-months>li {
    padding: 7px 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .calendar-inner {
    padding: 50px 10px 70px 10px;
    max-width: calc(100% - 100px);
    margin-left: 100px;
  }

  .calendar-inner .calendar-table {
    border-collapse: collapse;
    font-size: 20px;
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  tr.calendar-header .calendar-header-day,
  tr.calendar-body .calendar-day {
    padding: 17px 5px;
  }

  tr.calendar-body .calendar-day .day {
    padding: 0px 0;
    height: 32px;
    width: 32px;
    font-size: 16px;
  }

  tr.calendar-header .calendar-header-day,
  tr.calendar-body .calendar-day {
    padding: 17px 5px;
  }
}

@media (min-width: 1300px) {
  #calendario {
    height: 620px;
  }
}
</style>
