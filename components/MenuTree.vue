<template lang="pug">
div(v-if="item.modules.length>0")
  b-button.w-100.btn-collapse.font-weight-light.text-light.py-2.px-0(  v-b-toggle="`collapse-${item.id}`" :pressed="item.id==activeAccordionId" v-on:click="activate(item.id)")
    b-container( fluid)
      b-row
        b-col.px-0( cols="1")
          img(width='20px' src='../assets/img/icons/icon-menu/line.svg')
        b-col( cols="9")
          h5.m-0.text-left
            | {{item.name}}
        b-col( cols="2")
          img(width='20px' src='../assets/img/icons/icon-menu/arrow.svg')

  b-collapse.mt-1.menu-inner.ml-2( :id="`collapse-${item.id}`")
    MenuTree( v-for="child in item.modules" :item="child" :key="child.id")

div(v-else)
  NuxtLink(:to="item.url" v-if="item.url")
    b-button.w-100.btn-collapse.font-weight-light.text-light.d-flex.p-2.pl-3.pr-4(v-b-toggle="`collapse-${item.id}`" :pressed="isRouteActive" v-on:click="activate(item.id)")
      img.mr-3(width='20px' src='../assets/img/icons/icon-menu/circleColor.svg')
      p.m-0.text-left {{item.name}}

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  auth: false
})
export default class MenuTree extends Vue {
  activeAccordionId: any = null

  @Prop(Object) readonly item: any | undefined

  activate (id: number) {
    this.activeAccordionId = this.activeAccordionId ? null : id
  }

  get isRouteActive () {
    return this.$nuxt.$route.path === this.item.url
  }
}
</script>

<style scoped>
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show>.btn-secondary.dropdown-toggle:focus {
  box-shadow: none;
}

.btn-secondary:focus,
.btn-secondary.focus {
  background-color: transparent;
  border: none;
  box-shadow: none;

}

/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}

/* exact link will show the primary color for only the exact matching link */

a:hover {
  color: white;
  text-decoration: none;
}
</style>
