<template lang="pug">
.accordion.mt-5(role='tablist')
  MenuTree( v-for="item in menu"  :item="item" :key="item.id")

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  auth: false,
  layout: 'unauthorized'
})
export default class AsideMenu1 extends Vue {
  username: string = ''
  messageError: string = ''
  showPassword: boolean = false
  loading: boolean = false
  menu: any[] = []

  private async loadDescription () {
    const menuResponse = await this.$axios.$get('/module/menu')
    return menuResponse.data
  }

  async mounted () {
    this.menu = await this.loadDescription()
  }
}
</script>

<style scoped>

</style>
