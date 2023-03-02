<template lang="pug">
div
  headerRecover
  b-row.main-body.d-flex.justify-content-center
    .conteiner-recover.d-flex.flex-column.align-items-center.mt-5.w-100
      h4.m-0 Cambio de contraseña
      p.mb-2 Ingresa tu usuario
      b-form.mt-3.p-5.pt-0.d-flex.flex-column.align-items-center.w-100( @submit.prevent="recoverPass()")
        b-form-group.w-100(label='Usuario' label-for='username')
          b-form-input( v-model.trim="$v.username.$model" :state="$v.username.required" type="text" placeholder='Nombre de usuario' )
          b-form-invalid-feedback
            | Dato requerido

        p.mt-4.text-center
          | Para validar tu identidad, mandaremos un código de validación a tu correo
          | electrónico
        b-button.mt-3(type='submit' variant='primary' )
          h5.m-0.p-2.font-weight-bold CAMBIAR CONTRASEÑA
        NuxtLink.mt-5.text-dark.font-weight-bold(to="/login")
          h5.m-0 REGRESAR A INICIO DE SESIÓN

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
