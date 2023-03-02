<template lang="pug">
b-row.flex-nowrap.border
  b-col
    b-container
      b-row.d-flex.flex-nowrap.justify-content-center.p-3.nav-header
        .logotipoNav
  b-col.d-flex.justify-content-end(cols="9")
    .d-flex.justify-content-end.align-self-center.col-12.align-items-center(
      v-if="this.$auth.user"
    )
      img.profileImage(height="50%", v-if="profileImage" :src="profileImage")
      .ml-4
        .d-flex.align-items-center
          h5.text-secondary.font-weight-bold.m-0.text-capitalize
            | {{ fullName }}
          b-dropdown(
            variant="link",
            toggle-class="text-decoration-none",
            right=""
          )
            b-dropdown-item(href="#")
              | Ajustes
            b-dropdown-item(href="#")
              | Cambio de contraseña
            b-dropdown-divider
            b-dropdown-item(@click="logOut")
              | Cerrar sesión
        p.m-0
          | Administrador
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

Component.registerHooks(['validations'])

@Component({})
export default class HeaderRecover extends Vue {
  messageError: string = ''
  showPassword: boolean = false
  showPasswordConfirm: boolean = false
  loading: boolean = false

  get fullName () {
    return this.$auth.user?.firstname + ' ' + this.$auth.user?.lastname
  }

  get profileImage () {
    return process.env.publicFilesBase ? process.env.publicFilesBase + '/' + this.$auth.user?.image : null
  }

  private async logOut () {
    // do login

    try {
      await this.$auth.logout(/* .... */)
    } catch (error) {
    }
  }
}
</script>

  <style scoped>
.nav-header {
  max-height: 100px;
}

.profileImage {
  max-width: 100px;
}
.logotipoNav {
  height: 70px;
  width: 80%;
  background-image: url("../assets/img/logotipoM.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left;
}
@media (min-width: 576px) {
  .logotipoNav {
    background-image: url("../assets/img/logotipo.svg");
  }
}
</style>
