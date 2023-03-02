<template lang="pug">
b-row.main-body
  b-col
    div.row
      div(class='col-md-12')
        EditUser(:userId="userId")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EditUser from '~/components/EditUser.vue'

Vue.component('EditUser', EditUser)

@Component
export default class EditarUsuario extends Vue {
  data () {
    return {
      userId: Number(this.$route.query.id)
    }
  }
}
</script>
