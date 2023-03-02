<template lang="pug">
div
  div
    b-alert(show='' dismissible='' variant='success')
      b
        img(width='25px' src='../assets/img/icons/icon-alert/alert.png')
        | Código enviado.
      |  Se mando el código de
      |       validación al correo electrónico
      b &rArr;
  b-row.main-body.d-flex.justify-content-center
    div.conteiner-recover.d-flex.flex-column.align-items-center.mt-5.w-100
      h4.m-0 Cambio de contraseña
      p.mb-2 Validación de código
      b-form.mt-3.p-5.pt-0.d-flex.flex-column.align-items-center.w-100( @submit.prevent="recoverPass" autocomplete="offsdfd")
        b-form-group.w-100(label='Código de validación:' label-for='code-validation')
          b-form-input(v-model.trim="$v.form.codeValidation.$model" :state="validateState('codeValidation')" type="text" name="new-user-street-address" id="new-user-street-address" autocomplete="new-user-street-address"  )
          b-form-invalid-feedback Campo obligatorio
        b-form-group.w-100.mt-3(label='Contraseña nueva' label-for='pass')
          b-form-input(v-model.trim="$v.form.password.$model" :type="showPassword?'text':'password'"  :state="validateState('password')" name="new-user-street-address2123" id="new-user-street-address2123" autocomplete="new-user-street-address2123"   placeholder='Ingresa un contraseña ' )
          b-form-invalid-feedback Campo obligatorio
          b-form-checkbox.d-flex.justify-content-end.mt-3( v-model="showPassword" name="showPassword" )
            p Mostrar contraseña
          b.d-flex.flex-column.contrasena
            b-form-checkbox.font-weight-light(v-model='verifyRegex.mayus' disabled='') Una mayúscula
            b-form-checkbox.font-weight-light(v-model='verifyRegex.number' disabled='') Una número
            b-form-checkbox.font-weight-light(v-model='verifyRegex.character' disabled='')
              | carácter especial como ! , " , #, $ , % , & , / , (,)
            b-form-checkbox.font-weight-light(v-model='verifyRegex.atLeast' disabled='') 8 caracteres
        b-form-group.w-100.mt-3(label='Repetir contraseña' label-for='input-2')
          b-form-input( v-model.trim="$v.form.confirmPassword.$model" :type="showPasswordConfirm?'text':'password'" :state="validateState('confirmPassword')"  placeholder='Ingresa un contraseña ' )
          b-form-invalid-feedback Campo obligatorio
          b-form-checkbox.d-flex.justify-content-end.mt-3( v-model="showPasswordConfirm" name="showPasswordConfirm" )
            p Mostrar contraseña
        b-button.mt-5(size="lg" variant="primary" type='submit' role='submit' aria-pressed='true')
          h5.m-0.p-2.font-weight-bold CAMBIAR CONTRASEÑA

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Validations } from 'vuelidate-property-decorators'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

Component.registerHooks(['validations'])

type changePasswordForm ={
  codeValidation: string,
    password: string,
    confirmPassword: string
}

const passwordAccepted = (value:string) => {
  // value.includes('cool')
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[$+:?@<>*()!#%&/]).{16,}$/gm.test(value)
}

@Component({
  mixins: [validationMixin],
  auth: false,
  layout: 'unauthorized'
})
export default class CambiarContraseña extends Vue {
  messageError: string = ''
  showPassword: boolean = false
  showPasswordConfirm: boolean = false
  loading: boolean = false
  form: changePasswordForm = {
    codeValidation: '',
    password: '',
    confirmPassword: ''
  }

  private validateState (name:string) {
    return this.$v.form[name]?.$dirty ? !this.$v.form[name]?.$error : null
  }

  get verifyRegex () {
    return {
      mayus: /^(?=.*[A-Z]).{1,}$/gm.test(this.form.password),
      number: /^(?=.*\d).{1,}$/gm.test(this.form.password),
      character: /^(?=.*[$+:?@<>*()!#%&/]).{1,}$/gm.test(this.form.password),
      atLeast: this.form.password.length > 15
    }
  }

  private async recoverPass () {
    this.$v.$touch()

    if (!this.$v.$invalid) {
      // do login

      this.loading = true
      try {
        await this.$axios.$post('/auth/change-password', {
          codeValidation: this.form.codeValidation,
          password: this.form.password
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
      form: {
        codeValidation: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(50)

        },
        password: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(100),
          passwordAccepted
        },
        confirmPassword: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(100),
          sameAsPassword: sameAs('password')
        }
      }

    }
}
</script>

<style>
.conteiner-recover {
  max-width: 500px;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #85AC1C !important;
  background-color: #85AC1C !important;
}
</style>
