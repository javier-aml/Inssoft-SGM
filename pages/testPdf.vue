<template lang="pug">
TestPdfcomponent
</template>

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
canvas{ width: 3000px !important; height: 3000px !important; }
</style>
