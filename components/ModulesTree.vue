<template lang="pug">
div(v-if="item.modules.length>0")
  b-form-checkbox(@change="changeModule(item,$event)" :checked="item.selectedInRole").d-flex.mx-4.mt-5.mb-4
    h5.m-0.text-dark.text-uppercase.font-weight-bold
      | M&oacute;dulo completo
      b.ml-1
        b-button.px-2.py-0(v-b-tooltip.hover.top="'Dando click en módulo completo sus colaboradores tendrán permiso de ver los submódulos'", variant='dark') i
  d-row(v-if="item.actions.length > 0").w-100.px-4.mb-2
    b-form-checkbox(@change="changeModule(item,$event)" :checked="item.selectedInRole").mx-4
      h5.text-dark.text-uppercase.font-weight-bold {{item.name}}
      h6.text-muted.border-0.w-100 Acciones
    b-form-checkbox(v-for="action in item.actions" @change="changeAction(action,$event,item.id)" :key="item.id" :checked="item.selectedInRole").mx-5.my-3
      h5.text-dark.font-weight-light {{action.rol}}
  b-button.collapseRol.rounded-0.pl-4.pr-5.py-2.pt-4.w-100.border-left-0.border-bottom-0.border-right-0.border-top.text-left.d-flex.justify-content-between.align-items-top(v-b-toggle="`collapse-modules-${item.id}`", variant='light' )
    b
      h5.text-dark.text-uppercase.font-weight-bold {{item.name}}
      h6.text-muted.border-0.w-100 {{item.modules.length}} subm&oacute;dulos
    b.ml-5
      img(width='20px', src='../assets/img/icons/icon-menu/arrowB.svg')
  b-collapse( :id="`collapse-modules-${item.id}`")
    ModulesTree( v-for="child in item.modules" :item="child" :key="child.id" :modules="modules").pl-2

div(v-else)
  b.w-100.d-flex.flex-wrap.pl-4
    // Buttom second level
    b-button.w-100.collapseRol.w-100.rounded-0.p-0.pt-4.pb-3.border-0.text-left.d-flex.justify-content-start.align-items-top(v-b-toggle="`collapse-modules-child-${item.id}`", variant='light')
      b.w-100.d-flex
        b.lineRolO.mt-2
        b
          h5.text-dark.text-uppercase.font-weight-bold {{item.name}}
          h6.text-muted.border-0.w-100 {{item.modules.length}} subm&oacute;dulos
      b.mr-5
        img(width='20px', src='../assets/img/icons/icon-menu/arrowB.svg')
    b-collapse(:id ="`collapse-modules-child-${item.id}`", variant='light').w-100
      b(v-if="item.actions.length > 0").d-flex.pl-2.align-items-center
        b-col(cols='1')
        b-form-checkbox(:id="`cb-${item.id}`" @change="changeModule(item,$event,true)" :checked="item.selectedInRole").mt-2.d-flex
          h5.text-dark.text-uppercase.font-weight-bold
            | Subm&oacute;dulo completo
            b.ml-1
              b-button.px-2.py-0(v-b-tooltip.hover.top="'Dando click en submódulos completo sus colaboradores tendrán permiso de ver los submódulos'", variant='dark') i
      b(v-if="item.actions.length > 0").d-flex.justify-content-around
        b-col(cols='1')
        b-col.lineRol.ml-2.p-0
          b.w-100.d-flex.flex-column.justify-content-center.align-items-center
            b-form-checkbox(@change="changeModule(item,$event,true)" :checked="item.selectedInRole").w-50.mr-5.mt-4
              h5.text-dark.text-uppercase.font-weight-bold {{item.name}}
              h6.text-muted.border-0.w-100
                | Acciones
            b-form-checkbox(v-for="action in item.actions" @change="changeAction(action,$event, item.id)" :key="item.id" :checked="item.selectedInRole").my-2.w-50
              h5.text-dark.font-weight-light {{action.rol}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
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
  auth: false
})
export default class ModulesTree extends Vue {
  @Prop(Object) readonly item: object | undefined
  @Prop(Array) modules: Array<ModuleM> | undefined

  private changeModule (nodo: ModuleM, event: boolean) {
    if (this.modules !== undefined) {
      for (let module of this.modules) {
        module = this.setSelectedModuleInRoleTree(module, nodo.id, event)
      }
    }
  }

  private changeAction (action: ActionM, event: boolean, moduleId: number) {
    if (this.modules !== undefined) {
      for (let module of this.modules) {
        module = this.setSelectedActionInRoleTree(module, action.id, event, moduleId)
      }
    }
  }

  /* private readTree (item: any) {
    console.log(item.name, item.selectedInRole)

    if (item.actions) {
      for (let action of item.actions) {
        console.log('   Action', action.rol, action.selectedInRole)
      }
    }

    if (item.modules) {
      for (let child of item.modules) {
        this.readTree(child)
      }
    }
    return item
  } */

  private setSelectedModuleInRoleTree (item: any, nodoId: number, value: boolean) {
    if (item.id === nodoId || item.parentId === nodoId) {
      item.selectedInRole = value
      if (item.actions) {
        for (const action of item.actions) {
          action.selectedInRole = value
        }
      }
    }

    if (item.modules) {
      for (let child of item.modules) {
        child = this.setSelectedModuleInRoleTree(child, nodoId, value)
      }
    }
    return item
  }

  private setSelectedActionInRoleTree (item: any, actionId: number, value: boolean, moduleId: number) {
    if (item.actions) {
      for (const action of item.actions) {
        if (action.id === actionId) {
          action.selectedInRole = value
        }
      }
    }

    if (item.modules) {
      for (let child of item.modules) {
        child = this.setSelectedActionInRoleTree(child, actionId, value, moduleId)
      }
    }
    return item
  }
}
</script>

<style scoped>
  .containerModules .btn,
  .collapseRol {
      box-shadow: none !important;
      border-radius: 0;
  }
  .collapseRol {
      background-color: white;
  }
</style>
