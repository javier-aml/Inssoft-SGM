export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  router: {
    middleware: ['auth'],
    base: '/site/'
  },
  server: {
    port: process.env.WEB_APP_PORT || 3000, // default: 3000
    host: process.env.WEB_APP_HOST || '127.0.0.1'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web-app-softoil',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/site/favicon.ico' }
    ],
    script: [
      { src: 'https://scadavis.io/synoptic/synopticapi.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: './plugins/component-library-softoil', mode: 'client' },
    { src: '~/plugins/vuelidate', mode: 'client' },
    { src: '~/plugins/axiosSgm.js' },
    { src: '~/plugins/vuehtml2canvas.js', mode: 'client' },
    { src: '~/plugins/vue-html2pdf', mode: 'client' }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-html2canvas-proxy', /* default path is /_proxy */
    'nuxt-vue-multiselect'

  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: [
      'FormGroupPlugin',
      'LayoutPlugin',
      'FormPlugin',
      'FormInputPlugin',
      'FormCheckboxPlugin',
      'ButtonPlugin',
      'DropdownPlugin',
      'CollapsePlugin',
      'AlertPlugin'
    ],
    directivePlugins: []
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    },
    transpile: /@fullcalendar.*/
  },
  styleResources: {
    scss: '@/assets/scss/_variables.scss'
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  axios: {
    baseURL: process.env.API_URL,
    credentials: true
  },
  /*
 ** Auth module configuration
 */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/my-reports'
    },
    strategies: {
      local: false,
      cookie: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            withCredentials: true,
            autoFetch: false,
            property: 'data'
          },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/is_authenticated', method: 'get', autoFetch: true },
          refresh: { url: '/api/auth/refresh', method: 'post' }
        },
        user: {
          property: 'data', // <--- Default "user"
          autoFetch: true
        }
        // cookie: {
        //   // (optional) If set, we check this cookie existence for loggedIn check
        //   name: 'Authentication'
        // }
      }
    }
  },

  env: {
    publicFilesBase: process.env.PUBLIC_FILES_BASE || 'http://localhost:5500',
    SgmUrlBase: process.env.API_SGM_URL,
    SgmFileBase: process.env.PUBLIC_FILES_SGM_BASE
  }

}
