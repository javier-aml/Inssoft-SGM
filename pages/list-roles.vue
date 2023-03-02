<template lang="pug">
b-row.main-body
    b-col.p-5.bg-light(cols='12')
      div.row
        div(class='col-md-12')
          div.card
            div.card-body
              div.card-header.bg-white
                h2.text-center Lista de roles
              table.table.table-hover
                tr
                  th(width='25%') Folio
                  th(width='75%') Nombre
                tr
                tr(v-for="{id, name} in roles")
                  td {{id}}
                  td {{name}}
                tr

</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class ListRoles extends Vue {
  roles: Array<object> = []

  private async loadRoles () {
    const roles = await this.$axios.$get('/role/roles')
    return roles.data
  }

  async created () {
    this.roles = await this.loadRoles()
  }
}
</script>
