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
        md="2"
        lg="2"
        xl="2"
      >
        <div class="accordion mt-5" role="tablist">
          <b no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button v-b-toggle.accordion-1 block variant="info">
                <h5 class="m-0 text-left">Análisis Tiempo Real</h5>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text class="mb-3 mt-3">
                  <a
                    class="decoration-none font-weight-light text-light d-flex justify-content-between align-items-center pr-2 pl-2"
                    href=""
                  >
                    <p class="m-0">Análisis Tiempo Real </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </a>
                </b-card-text>
                <b-card-text class="mb-3 mt-3">
                  <a
                    class="decoration-none font-weight-light text-light d-flex justify-content-between align-items-center pr-2 pl-2"
                    href=""
                  >
                    <p class="m-0">Análisis Tiempo Real </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </a>
                </b-card-text>
                <b-card-text>
                  <b no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button v-b-toggle.accordion-3 block variant="info">Accordion 3</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                      <b-card-body>
                        <b-card-text>I start opened because <code>visible</code> is
                          <code>true</code></b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b>

          <b no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button v-b-toggle.accordion-2 block variant="info">Accordion 2</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>I start opened because <code>visible</code> is <code>true</code>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b>
        </div>
      </b-col>
      <b-col
        style="background-color: red;"
        cols="12"
        sm="12"
        md="10"
        lg="10"
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
    background-image: url("../assets/img/logotipo.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left;
}

.btn-info {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
}

.card-body {
    background-color: #063a67;
}

.decoration-none {
    text-decoration: none
}
</style>
