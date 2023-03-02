<template lang="pug">
b-row.flex-wrap.h-100
  b-col.border.border-top-0.bg-light(cols='12', sm='12', md='12', lg='4', xl='3')
    b-row.p-4.border-bottom.bg-white
      h4.m-0 Alta de rol
      p.w-100.text-muted Da de alta un nuevo rol
      b-form.d-flex.flex-column.align-items-center.w-100
        b-form-group#input-group-1.w-100(label='*Nombre del rol', label-for='input-1')
          b-form-input#input-1(placeholder='Nuevo rol', type='text', required=''  v-model.trim="$v.roleName.$model")
          div( v-if="messageError")
            p.text-danger Escribe el nombre del rol
    b-row.px-4.py-2.pt-5
      h4.m-0 M&oacute;dulos
      p.w-100.text-muted Selecciona un m&oacute;dulo
    b-row.containerModules
      div.w-100( v-for="m in modules" :key="m.id" :id="`rol_${m.id}`")
        b-button.px-5.py-3.pt-4.w-100.bg-light.border-left-0.border-top-0.border-right-0.border-bottom.text-left
          b-form-checkbox(:id="`${m.id}`" @change="addModuleToSelection(m,$event)")
            h5.text-dark.text-uppercase.font-weight-bold {{m.name}}
            h6.text-muted.border-0.w-100 {{m.modules.length}} subm&oacute;dulos
  b-col.overflow-auto.h-lg-100.d-flex.flex-column.justify-content-top.align-items-center(cols='12', sm='12', md='12', lg='8', xl='9')
    b-row(v-if="modulesToSelection.length == 0").mt-5.h-50.flex-column.justify-content-center.align-items-center
      h2.text-center A&uacute;n no tienes seleccionado ning&uacute;n m&oacute;dulo
      h2.text-center.text-muted.font-weight-light Selecciona uno para continuar y agrega un nuevo rol
    b-col(v-if="modulesToSelection.length > 0").h-100.w-100.d-flex.flex-column.justify-content-top.align-items-center
      d.flex-column.justify-content-start.align-items-center
        .card.border.m-lg-5.my-5
          ModulesTree( v-for="item in modulesToSelection"  :item="item" :key="item.id" :modules="modules")
    b-row(v-if="modulesToSelection.length > 0").my-5.justify-content-around.align-items-center.w-50
      b-button.border-0(variant='outline-dark')
        h5.m-0.p-2.px-4.font-weight-bold.text-uppercase Cancelar
      b-button(variant='primary',@click="saveRole")
        h5.m-0.p-2.px-4.font-weight-bold.text-uppercase Guardar

</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Validations } from 'vuelidate-property-decorators'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { VBTooltip } from 'bootstrap-vue'

Vue.directive('b-tooltip', VBTooltip)

interface ActionM {
  id: number;
  rol: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  selectedInRole?: boolean;
}

interface ModuleM {
  id: number;
  name: string;
  status: number;
  parentId: number
  url: string | null
  createdAt: Date;
  creationIdUser: number;
  updatedAt: Date;
  lastUpdateIdUser: number
  deletedAt?: Date | null;
  selectedInRole?: boolean;
  actions: ActionM[]
}

@Component({
  mixins: [validationMixin]
})

export default class AltaRole extends Vue {
  roleName: string = ''
  messageError: boolean = false
  modules: Array<ModuleM> = []
  modulesToSelection: Array<ModuleM> = []

  private saveRole () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      this.messageError = false

      // const datos = { name: this.roleName, status: 1, tree: JSON.stringify(this.modules) }
      // const result = await this.$axios.$post('/role/role', datos)

      // console.log(datos)
      // saveRole
    } else {
      this.messageError = true
    }
  }

  private async loadModulesWithActions () {
    const modules = await this.$axios.$get('/module/modules?actions=true&activeActions=false&treeMode=true')
    return modules.data
  }

  private addModuleToSelection (module: ModuleM, event: boolean) {
    if (event) {
      this.modulesToSelection.push(module)
    } else {
      this.modulesToSelection = this.modulesToSelection.filter((obj: ModuleM) => obj.id !== module.id)
      this.setUnselectedModuleInRoleTree(module)
    }
  }

  private setUnselectedModuleInRoleTree (item: any) {
    item.selectedInRole = false
    if (item.actions) {
      for (const action of item.actions) {
        action.selectedInRole = false
      }
    }

    if (item.modules) {
      for (let child of item.modules) {
        child = this.setUnselectedModuleInRoleTree(child)
      }
    }
    return item
  }

  async created () {
    this.modules = await this.loadModulesWithActions()
  }

  @Validations()
    validations = {
      roleName: {
        required
      }
    }
}
</script>

<style scoped>
  .main-body {
      height: 800px;
      min-height: calc(100vh - 100px);
  }

  .containerModules .btn,
  .collapseRol {
      box-shadow: none !important;
      border-radius: 0;
  }
  .containerModules .btn:focus {
      background-color: white !important;
      box-shadow: 4px 0px 0px 0px white !important
  }
  .collapseRol {
      background-color: white;
  }
  .lineRol {
      background-image: url("../assets/img/icons/icon-menu/lineRol.svg");
      background-repeat: repeat-y;
      background-position: left 5px bottom 0px;
      background-position-y: top;
      background-size: 5px;
  }
  .lineRolO {
      background-image: url("../assets/img/icons/icon-menu/lineRolO.svg");
      background-repeat: no-repeat;
      width: 40px;
      height: 12px;
  }
</style>
