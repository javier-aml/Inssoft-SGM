<template lang="pug">
b-container.min-vh-100.fondo(fluid='')
  b-row.min-vh-100(align-v="center" align-h="center")
    b-col.contentLogin.rounded
      b-form( @submit.prevent="doLogin")
        b-row.mt-4(align-h='center')
          img(src='../assets/img/logotipo.svg')
        h3.text-center.mt-3.mb-0.text-secondary.font-weight-bold Sistema
        h4.text-center.font-weight-light.text-secondary.pl-5.pr-5 Sistema de Gesti&oacute;n de Medici&oacute;n y Control Volum&eacute;trico
        b-container
          b-row
            b-col.pr-4.pl-4
              b-form-group#input-group-1(label='Usuario' label-for='username')
                b-form-input( v-model.trim="$v.username.$model" type="text" placeholder='Nombre de usuario' )

            b-col.pr-4.pl-4( cols="12")
              b-form-group(label='Contraseña' label-for='password')
                b-form-input(  :type="showPassword?'text':'password'" v-on:keyup.enter="submit"  placeholder="Contraseña de 8 dígitos" id="contraseña" v-model.trim="$v.password.$model"   )

            b-col.mt-3.d-flex.justify-content-end( cols="12")
              b-form-checkbox( v-model="showPassword" name="showPassword" )
                p Mostrar contraseña

        b-row.mt-5(align-h='center' class="text-center")
          b-col( cols="12" v-if="messageError")
            p.text-danger Usuario o contraseña inválido
          b-col( cols="12" )
            b-button.active( size="lg" variant="primary" type='submit' role='submit' aria-pressed='true' )
              h2.m-0 Entrar

        b-row.mt-5.mb-5(align-h='center')
          NuxtLink.mt-5.text-dark.font-weight-bold(to="/recuperar-contraseña")
            h5.m-0.text-secondary
              u ¿Olvidaste tu contraseña?

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Validations } from 'vuelidate-property-decorators'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

@Component({
  mixins: [validationMixin]
})
export default class Login extends Vue {
  username: string = ''
  password: string = ''
  messageError: string = ''
  showPassword: boolean = false
  loading: boolean = false

  private async doLogin () {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      // do login

      this.loading = true
      try {
        await this.$auth.loginWith('cookie', {
          data: { username: this.username, password: this.password }
        })
        this.loading = false

        this.$router.push('/')
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
      },
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(255)
      }
    }
}
</script>

<style scoped>
.contentLogin {
  background-color: white;
  max-width: 520px;
  box-shadow: 0px 3px 6px 0px #e5e5e5;
}

.fondo {
  background-size: cover;
  background-image: url("../assets/img/fondo.svg");
}
</style>
