<template>
  <b-container fluid>
    <b-row class="flex-nowrap">
      <b-col>
        <b-container>
          <b-row class="d-flex flex-nowrap justify-content-center p-3 nav-header">
            <div class="logotipoNav" />
          </b-row>
        </b-container>
      </b-col>
      <b-col cols="9" class="d-flex justify-content-end">
        <div class="d-flex justify-content-end align-self-center col-12">
          <img height="50%" src="../assets/img/logoEmpresa.png">
          <div class="ml-4">
            <div class="d-flex align-items-end">
              <h5 class="text-secondary font-weight-bold m-0">
                Usuario principal
              </h5>
              <b-dropdown variant="link" toggle-class="text-decoration-none" right>
                <b-dropdown-item href="#">
                  Ajustes
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  Cambio de contraseña
                </b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item active>
                  Cerrar sesión
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <p class="m-0">
              Administrador
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="main-body">
      <b-col
        class="p-0 bg-secondary"
        cols="12"
        sm="12"
        md="4"
        lg="3"
        xl="2"
      >
        <div class="accordion mt-5" role="tablist">
          <div>
            <b-button v-b-toggle.collapse-1 class="w-100 btn-collapse d-flex align-items-center">
              <img class="mr-3" src="../assets/img/icons/icon-menu/1.png">
              <h5 class="m-0 text-left">
                Análisis Tiempo Real
              </h5>
            </b-button>
            <b-collapse id="collapse-1" class="mt-1">
              <b-card class="p-0">
                <b-button
                  v-b-toggle.collapse-1-inner
                  class="w-100 btn-collapse font-weight-light text-light d-flex justify-content-between align-items-center p-2 pl-4 pr-4"
                >
                  <p class="m-0">
                    Análisis Tiempo Real
                  </p>
                  <img width="20px" src="../assets/img/icons/icon-menu/arrow.svg">
                </b-button>
                <b-collapse id="collapse-1-inner" class="mt-1">
                  <b-button
                    v-b-toggle.collapse-3
                    class="w-100 btn-collapse font-weight-light text-light d-flex justify-content-between align-items-center p-2 pl-4 pr-4"
                  >
                    <d class="d-flex">
                      <img
                        width="20px"
                        class="mr-3"
                        src="../assets/img/icons/icon-menu/circle.svg"
                      >
                      <p class="m-0">
                        Tiempo Real
                      </p>
                    </d>
                    <img width="20px" src="../assets/img/icons/icon-menu/arrow.svg">
                  </b-button>
                  <b-collapse id="collapse-3" class="mt-1 menu-inner">
                    <b-button
                      v-b-toggle.collapse-2-inner
                      class="w-100 btn-collapse font-weight-light text-light d-flex justify-content-between align-items-center p-2 pl-4 pr-4"
                    >
                      <d class="d-flex">
                        <img
                          width="20px"
                          class="mr-3"
                          src="../assets/img/icons/icon-menu/line.svg"
                        >
                        <p class="m-0">
                          Real
                        </p>
                      </d>
                      <img width="20px" src="../assets/img/icons/icon-menu/arrow.svg">
                    </b-button>
                    <b-collapse id="collapse-2-inner" class="mt-1">
                      <a
                        class="decoration-none font-weight-light text-light d-flex justify-content-between align-items-center p-2 pr-4 pl-5"
                        href=""
                      >
                        <d class="d-flex">
                          <img
                            width="20px"
                            class="mr-3"
                            src="../assets/img/icons/icon-menu/circleColor.svg"
                          >
                          <p class="m-0"> Real Tiempo</p>
                        </d>
                        <img width="20px" src="../assets/img/icons/icon-menu/arrow.svg">
                      </a>
                    </b-collapse>
                  </b-collapse>
                </b-collapse>
              </b-card>
            </b-collapse>
          </div>
        </div>
      </b-col>
      <b-col
        style="background-color: red;"
        cols="12"
        sm="12"
        md="8"
        lg="9"
        xl="10"
      />
    </b-row>
  </b-container>
</template>

<style scoped>
.nav-header {
    max-height: 100px;
}

.main-body {
    height: 800px;
    min-height: calc(100vh - 100px);
}

.logotipoNav {
    height: 70px;
    width: 80%;
    background-image: url("../assets/img/logotipoM.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left;
}

.btn-info,
.btn-collapse {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: transparent;
    background-clip: border-box;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.card-body {
    background-color: #063a67;
    padding: 0;
}

.decoration-none {
    text-decoration: none
}

.menu-inner {
    background-color: #042d51;
}

@media (min-width: 576px) {
    .logotipoNav {
        background-image: url("../assets/img/logotipo.svg");
    }
}
</style>
