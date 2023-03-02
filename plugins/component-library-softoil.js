import Vue from 'vue'
import Components from 'component-library-softoil'

Object.entries(Components).forEach(([name, component]) => {
  Vue.component(name, component)
})
