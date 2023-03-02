<template lang="pug">
b-row.main-body.bg-light
    b-col.p-5(cols='12')
        p.text-center Contenido aquí
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin],
  auth: true
})
export default class Home extends Vue {
  checked: boolean = false
  indeterminate: boolean = false
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
</style>
