<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      Lo sentimos, ha ocurrido un problema
    </h1>
    <NuxtLink to="/">
      Ir al inicio
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: null
    }
  } // you can set a custom layout for the error page
}
</script>
