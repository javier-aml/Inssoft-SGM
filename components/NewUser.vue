<template lang="pug">
b-row.justify-content-around.mt-5
  b-col(cols='12' sm='12' md='12' lg='5' xl='5')
    h4.m-0 Alta de usuario
    p.w-100.text-muted *Campos obligatorios
  b-col(cols='12' sm='12' md='12' lg='5' xl='5')
  b-col(cols='12')
    BForm(@submit.prevent="toggleSubmitUser" autocomplete="off")
      b-row.justify-content-around
        b-col.mt-2(cols='12' sm='12' md='12' lg='12' xl='5')
          BFormGroup(id='' label='*Correo electrónico:' label-for='correo' class="form-group--error").w-100
            BFormInput(
              v-model.trim="$v.formUser.email.$model"
              placeholder='Correo del contacto de usuario'
              type='text'
            )
            div(v-if="$v.formUser.email.$error")
              .error
                |Ingresa un e-mail válido
        b-col(cols='12' sm='12' md='12' lg='12' xl='5')
      b-row.justify-content-around
        b-col.d-flex.flex-wrap.justify-content-between(cols='12' sm='12' md='12' lg='12' xl='5')
          b-col.mt-2.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='*Nombres:' label-for='nombre').w-100
              BFormInput(
                v-model.trim="$v.formUser.firstname.$model"
                placeholder="Nombre del usuario"
                type="text"
              )
              div(v-if="$v.formUser.firstname.$error")
                .error
                  |Este campo es obligatorio
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='*Apellido Paterno:').w-100
              BFormInput(
                v-model.trim="$v.formUser.lastname.$model"
                placeholder='Apellido del usuario'
                type='text'
              )
              div(v-if="$v.formUser.lastname.$error")
                .error
                  |Este campo es obligatorio
          b-col.mt-2.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='*Apellido Materno:' label-for='materno').w-100
              BFormInput(
                v-model.trim="$v.formUser.secondLastname.$model"
                placeholder='Nombre del usuario'
                type='text'
              )
              div(v-if="$v.formUser.secondLastname.$error")
                .error
                  |Este campo es obligatorio
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='*Cumpleaños:').w-100
              BFormDatepicker(
                v-model.trim="$v.formUser.birthdate.$model"
                placeholder="Seleccionar fecha"
                label-help="Use las teclas de cursor para navegar por las fechas del calendario"
                label-reset-button="Resetear"
                label-today-button="Hoy"
                today-button-variant="outline-success"
                style="width: 100%"
                :hide-header="true"
                today-button
                reset-button
                :no-close-on-select="false"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                :aria-required="true"
                required
                :show-decade-nav="true"
              )
              div(v-if="$v.formUser.birthdate.$error")
                .error
                  |Este campo es obligatorio
        b-col.d-flex.flex-wrap.justify-content-between(cols='12' sm='12' md='12' lg='12' xl='5')
          b-col.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            b-col.mt-2.col-auto.p-0
              BFormGroup(label='*CURP:').w-100
                BFormInput(
                  v-model.trim="$v.formUser.curp.$model"
                  placeholder='CURP a 18 posiciones'
                  type='text'
                )
                div(v-if="$v.formUser.curp.$error")
                  .error
                    |Este campo es obligatorio
            b-col.mt-4.col-auto.p-0
              BFormGroup(label='*R.F.C.:' label-for='RFC').w-100
                BFormInput(
                  v-model.trim="$v.formUser.rfc.$model"
                  placeholder='Ingresa el R.F.C'
                  type='text'
                )
                div(v-if="$v.formUser.rfc.$error")
                  .error
                    |Este campo es obligatorio
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='Avatar:').w-100
              BFormFile(
                accept=".png, .jpg, .jpeg"
                placeholder='Arrastra o adjunta una'
                drop-placeholder='Arrastra o adjunta un'
                v-model="formUser.avatarImage"
              ).dropImput
      hr.my-5
      b-row.pr-5.pl-5
        div.col-md-4
            BFormGroup(label='*Username').w-100
              BFormInput(
                v-model.trim="$v.formUser.username.$model"
                placeholder='Username'
                type='text'
              )
              div(v-if="$v.formUser.username.$error")
                .error
                  |Escribe al menos 6 caracteres
        div.col-md-4
          BFormGroup(label='*Password').w-100
            BFormInput(
              v-model.trim="$v.formUser.password.$model"
              placeholder='Password'
              type='password'
            )
            div(v-if="$v.formUser.password.$error")
              .error
                |Escribe al menos 6 caracteres
        div.col-md-4
          BFormGroup(label='*Confirmar password').w-100
            BFormInput(
              v-model.trim="$v.formUser.repeatPassword.$model"
              placeholder='Confirmar password'
              type='password'
            )
            div(v-if="$v.formUser.repeatPassword.$error")
              .error
                |Las contraseñas no coinciden
      hr.my-5
      b-row.justify-content-around.align-items-center
        b-col.mt-2(cols='12' sm='12' md='12' lg='12' xl='5')
          BFormGroup(label='*Rol:' label-for='rol').w-100
            MultiSelect(
              v-model="$v.formUser.role.$model"
              :options="rolesList"
              :multiple="false"
              :close-on-select="true"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder='Seleccionar rol'
              label='name' track-by='id'
              :preselect-first='false'
              selectLabel='Presiona enter para seleccionar'
              deselectLabel='Presiona enter para quitar'
              selectedLabel="Seleccionado"
              noOptionsLabel="No hay roles disponibles"
              :taggable="true"
            )
            div(v-if="$v.formUser.role.$error")
                .error
                  |Este campo es obligatorio
        b-col(cols='12' sm='12' md='12' lg='12' xl='5')
          h5(v-if="!formUser.role").m-0.text-muted
            | Todav&iacute;a no tienes
            b.text-secondary.ml-1 un rol seleccionado
            | , selecciona uno para comenzar
      hr.my-5
      b-row.justify-content-around
        b-col.d-flex.flex-wrap.justify-content-between(cols='12' sm='12' md='12' lg='12' xl='5')
      b-row.justify-content-around
        b-col.d-flex.flex-wrap.justify-content-between(cols='12' sm='12' md='12' lg='12' xl='5')
          b-col.mt-2.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup.w-100(label='Teléfono de contacto:')
              BFormInput(
                v-model.trim="formUser.primaryPhoneNumber"
                placeholder='Teléfono a 8 dígitos'
                type='text'
              )
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup.w-100(label='Teléfono secundario:')
              BFormInput(
                v-model.trim="formUser.secondaryPhoneNumber"
                placeholder='Teléfono a 8 dígitos'
                type='text'
              )
          b-col.mt-2.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup.w-100.btnToggle(label='Uso de biométricos:' label-for='biometricos')
              input(
                v-model="formUser.biometricsFlag"
                name='toggle-biometricos'
                :value="1"
                type='radio'
              )#toggle-on-biometricos.toggle.toggle-left
              label.btn(for='toggle-on-biometricos') Si
              input(
                v-model="formUser.biometricsFlag"
                name='toggle-biometricos'
                :value="0"
                type='radio'
              )#toggle-off-biometricos.toggle.toggle-right
              label.btn(for='toggle-off-biometricos') No
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(v-if="formUser.biometricsFlag" label='Tipo biométricos:').w-100
              BFormRadio.mt-2(name='tipoBiometrico' value='Huella dactilar' v-model="formUser.biometricsType") Huella  dactilar
              BFormRadio.mt-2(name='tipoBiometrico' value='Escaneo de iris' v-model="formUser.biometricsType") Escaneo de iris
              BFormRadio.mt-2(name='tipoBiometrico' value='Reconocimiento facial' v-model="formUser.biometricsType") Reconocimiento facial
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(v-if="formUser.biometricsFlag" label='Archivo biométrico:').w-100
              BFormFile(
                accept=".png, .jpg, .jpeg"
                placeholder='Arrastra o adjunta una'
                drop-placeholder='Arrastra o adjunta un'
                v-model="formUser.biometricFile"
              ).dropImput.dropFile
        b-col.d-flex.flex-wrap.justify-content-between(cols='12' sm='12' md='12' lg='12' xl='5')
          b-col.mt-2.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='Security Log:').w-100.btnToggle
              input(
                v-model="formUser.securityLogFlag"
                name='toggle-log'
                :value="1"
                type='radio'
              )#toggle-on-log.toggle.toggle-left
              label.btn(for='toggle-on-log') Si
              input(
                v-model="formUser.securityLogFlag"
                name='toggle-log'
                :value="0"
                type='radio'
              )#toggle-off-log.toggle.toggle-right
              label.btn(for='toggle-off-log') No
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='Security Key:' label-for='key').w-100.btnToggle
              input(
                v-model="formUser.privateSecurityKey"
                name='toggle-key'
                value="Privado"
                type='radio'
              )#toggle-on-key.toggle.toggle-left
              label.btn(for='toggle-on-key') Privado
              input(
                v-model="formUser.privateSecurityKey"
                name='toggle-key'
                value="General"
                type='radio'
              )#toggle-off-key.toggle.toggle-right
              label.btn(for='toggle-off-key') General
          b-col.mt-2.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='Modo de Vigilancia:' label-for='vigilancia').w-100.btnToggle
              input(
                v-model="formUser.vigilantModeFlag"
                name='toggle-vigilancia'
                :value="1"
                type='radio'
              )#toggle-on-vigilancia.toggle.toggle-left
              label.btn(for='toggle-on-vigilancia') Si
              input(
                v-model="formUser.vigilantModeFlag"
                name='toggle-vigilancia'
                :value="0"
                type='radio'
              )#toggle-off-vigilancia.toggle.toggle-right
              label.btn(for='toggle-off-vigilancia') No
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(label='Mobile Login:' label-for='mobile').w-100.btnToggle
              input(
                v-model="formUser.mobileLoginFlag"
                name='toggle-mobile'
                :value="1"
                type='radio'
              )#toggle-on-mobile.toggle.toggle-left
              label.btn(for='toggle-on-mobile') Si
              input(
                v-model="formUser.mobileLoginFlag"
                name='toggle-mobile'
                :value="0"
                type='radio'
              )#toggle-off-mobile.toggle.toggle-right
              label.btn(for='toggle-off-mobile') No
          b-col.mt-2.p-0.pr-lg-3.pl-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(id='' label='Autenticación de 2 Factores:' label-for='autenticacion').w-100.btnToggle
              input(
                v-model="formUser.twoFactorAuthFlag"
                name='toggle-autenticacion'
                :value="1"
                type='radio'
              )#toggle-on-autenticacion.toggle.toggle-left
              label.btn(for='toggle-on-autenticacion') Si
              input(
                v-model="formUser.twoFactorAuthFlag"
                name='toggle-autenticacion'
                :value="0"
                type='radio'
              )#toggle-off-autenticacion.toggle.toggle-right
              label.btn(for='toggle-off-autenticacion') No
          b-col.mt-2.p-0.pl-lg-3.pr-lg-0(cols='12' sm='12' md='12' lg='6' xl='6')
            BFormGroup(v-if="formUser.twoFactorAuthFlag" label='Factor de autenticación').w-100
              BFormInput(
                v-model="formUser.twoFactorAuthRecord"
                type="text"
                readonly
              )
      b.d-flex.justify-content-around.align-items-center.w-100
        b-row.my-5.justify-content-around.align-items-center.w-50
          b-button.border-0(variant='outline-dark')
            h5.m-0.p-2.px-4.font-weight-bold.text-uppercase Cancelar
          BButton(variant='primary' type="submit")
            h5.m-0.p-2.px-4.font-weight-bold.text-uppercase Guardar
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Multiselect } from 'vue-multiselect'
import { BFormDatepicker, ToastPlugin, BFormGroup, BFormInput, BForm, BButton, BFormRadio, BFormFile } from 'bootstrap-vue'
import { validationMixin } from 'vuelidate'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

Vue.component('BFormDatepicker', BFormDatepicker)
Vue.component('MultiSelect', Multiselect)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BFormInput', BFormInput)
Vue.component('BForm', BForm)
Vue.component('BButton', BButton)
Vue.component('BFormRadio', BFormRadio)
Vue.component('BFormFile', BFormFile)
Vue.use(ToastPlugin)

@Component({
  mixins: [validationMixin],
  validations: {
    formUser: {
      email: { email, required },
      firstname: { required },
      lastname: { required },
      secondLastname: { required },
      birthdate: { required },
      curp: { required },
      rfc: { required },
      username: {
        required,
        minLength: minLength(6)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      },
      role: { required }
    }
  }
})
export default class NewUser extends Vue {
  data () {
    return {
      rolesList: [],
      formUser: {
        token: '',
        email: '',
        firstname: '',
        lastname: '',
        secondLastname: '',
        status: 1,
        username: '',
        password: '',
        repeatPassword: '',
        companyId: this.$auth.user?.companyId,
        curp: '',
        rfc: '',
        birthdate: null,
        creationIdUser: this.$auth.user?.id,
        primaryPhoneNumber: '',
        secondaryPhoneNumber: '',
        biometricsFlag: 0,
        biometricsType: '',
        biometricFile: null,
        avatarImage: null,
        role: null,
        securityLogFlag: 0,
        privateSecurityKey: 'Privado',
        vigilantModeFlag: 0,
        mobileLoginFlag: 0,
        twoFactorAuthFlag: 0,
        twoFactorAuthRecord: 'Normal'
      }
    }
  }

  created () {
    this.getRolesByCompanyId()
  }

  private async getRolesByCompanyId () {
    const result = await this.$axios.$get('/role/roles')
    const roles = await result

    if (roles.data.length > 0) {
      this.$data.rolesList = roles.data
    }
  }

  async toggleSubmitUser () {
    try {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const datos = this.$data.formUser
        const frm: FormData = new FormData()
        frm.append('token', datos.token)
        frm.append('email', datos.email)
        frm.append('firstname', datos.firstname)
        frm.append('lastname', datos.lastname)
        frm.append('secondLastname', datos.secondLastname)
        frm.append('status', datos.status)
        frm.append('username', datos.username)
        frm.append('password', datos.password)
        frm.append('repeatPassword', datos.repeatPassword)
        frm.append('companyId', datos.companyId)
        frm.append('curp', datos.curp)
        frm.append('rfc', datos.rfc)
        frm.append('birthdate', datos.birthdate)
        frm.append('creationIdUser', datos.creationIdUser)
        frm.append('primaryPhoneNumber', datos.primaryPhoneNumber)
        frm.append('secondaryPhoneNumber', datos.secondaryPhoneNumber)
        frm.append('biometricsFlag', datos.biometricsFlag)
        frm.append('biometricsType', datos.biometricsType)
        frm.append('biometricFile', datos.biometricFile)
        frm.append('avatarImage', datos.avatarImage)
        frm.append('role', JSON.stringify(datos.role))
        frm.append('securityLogFlag', datos.securityLogFlag)
        frm.append('privateSecurityKey', datos.privateSecurityKey)
        frm.append('vigilantModeFlag', datos.vigilantModeFlag)
        frm.append('mobileLoginFlag', datos.mobileLoginFlag)
        frm.append('twoFactorAuthFlag', datos.twoFactorAuthFlag)
        frm.append('twoFactorAuthRecord', datos.twoFactorAuthRecord)

        const { data } = await this.$axios.$post('/user/user', frm, {
          headers:
          {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (data.success) {
          this.makeToast('success', 'NUEVO USUARIO', '¡El usuario se registró exitosamente!')
          this.clearForm()
        } else {
          this.makeToast('warning', 'NUEVO USUARIO', data.msg)
        }
      }
    } catch (error) {
      this.makeToast('danger', 'NUEVO USUARIO', '¡Intenta nuevamente!')
    }
  }

  private makeToast (variant: string = '', title: string = '', body: string = '') {
    this.$bvToast.toast(body, {
      title,
      variant,
      solid: true,
      headerClass: 'justify-content-center'
    })
  }

  private clearForm () {
    const formUser = {
      token: '',
      email: '',
      firstname: '',
      lastname: '',
      secondLastname: '',
      status: 1,
      username: '',
      password: '',
      repeatPassword: '',
      companyId: this.$auth.user?.companyId,
      curp: '',
      rfc: '',
      birthdate: null,
      creationIdUser: this.$auth.user?.id,
      primaryPhoneNumber: '',
      secondaryPhoneNumber: '',
      biometricsFlag: 0,
      biometricsType: '',
      biometricFile: null,
      avatarImage: null,
      role: null,
      securityLogFlag: 0,
      privateSecurityKey: 'Privado',
      vigilantModeFlag: 0,
      mobileLoginFlag: 0,
      twoFactorAuthFlag: 0,
      twoFactorAuthRecord: 'Normal'
    }

    this.$data.formUser = formUser
    this.$v.$reset()
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="css">
.dropImput,
.dropImput .custom-file-label {
  height: 132px;
}

.dropImput .custom-file-label {
  background-color: #EFEFEF;
}

.dropImput span {
  text-align: center;
}

.dropImput span::after {
  content: "Imagen";
  text-transform: uppercase;
  font-weight: bold;
  display: block;
}

.dropFile span::after {
  content: "Archivo";
}

.dropImput span::before {
  content: url("../assets/img/icons/unplug.svg");
  margin-top: 10px;
  margin-bottom: 12px;
  height: 40px;
  display: block;
}

.dropImput .custom-file-label::after {
  display: none;
}

.btnToggle .btn {
  display: inline-block;
  padding: 8px 10px;
  position: relative;
  text-align: center;
  border-radius: 0;
  transition: background 600ms ease, color 600ms ease;
}

.btnToggle div{
  width: fit-content;
  box-shadow: inset 0px 0px 0px 1px #ced4daa6;
  border: solid 1px #ced4da;
  border-radius: 32px;
}

input[type="radio"].toggle {
  display: none;
}

input[type="radio"].toggle+label {
  cursor: pointer;
  min-width: 40px;
  min-height: 40px;
  margin: 0;
}

input[type="radio"].toggle+label:hover {
  background: none;
  color: #0A467A;
}

input[type="radio"].toggle+label:after {
  background: #0A467A;
  border-radius: 25px;
  content: "";
  height: 100%;
  position: absolute;
  top: 0;
  transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
  width: 100%;
  z-index: -1;
}

.btnToggle input[type="radio"].toggle.toggle-left+label {
  border-right: 0;
}

.btnToggle input[type="radio"].toggle.toggle-left+label:after {
  left: 100%;
}

.btnToggle input[type="radio"].toggle.toggle-right+label:after {
  left: -100%;
}

.btnToggle input[type="radio"].toggle:checked+label {
  cursor: default;
  color: #fff;
  transition: color 200ms;
}

.btnToggle input[type="radio"].toggle:checked+label:after {
  left: 0;
}

.multiselect__option--highlight {
    background: #FE891A;
    outline: none;
    color: #fff;
}
.multiselect__option--highlight:after {
    content: attr(data-select);
    background: #FE891A;
    color: #fff;
}

.multiselect__option--selected.multiselect__option--highlight {
    background: #ff6a6a;
    color: #fff;
}

.multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    background: #0A467A;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
}

.main-body{
    height: 100% !important;
}

.error{
  color: #f57f6c;
  font-size: 0.75rem;
}
</style>
