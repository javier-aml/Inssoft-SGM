<template lang="pug">
div
  headerRecover
  b-row.main-body.d-flex.justify-content-center
    .conteiner-recover.d-flex.flex-column.align-items-center.mt-5.w-100
      h4.m-0 Cambio de contraseña

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Validations } from 'vuelidate-property-decorators'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

@Component({
  mixins: [validationMixin],
  auth: false,
  layout: 'unauthorized'
})
export default class RecuperarContraseña extends Vue {
  username: string = ''
  messageError: string = ''
  showPassword: boolean = false
  loading: boolean = false

  private async recoverPass () {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      // do login

      this.loading = true
      try {
        await this.$axios.$post('/auth/recover-password', {
          username: this.username
        })

        this.loading = false
      } catch (error) {
        this.loading = false
        this.messageError = 'Usuario o contraseña inválido'
      }
    } else {
      this.messageError = 'Usuario o contraseña inválido'
    }
  }

  @Validations()
    validations = {
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(255)
      }
    }
}
</script>

<style scoped>
.conteiner-recover {
  max-width: 500px;
}
</style>
