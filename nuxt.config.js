export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'fa',
      dir: 'rtl'
    },
    title: 'پایاشاپ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'robots', name: 'robots', content: 'noindex' }
    ],
    link: [
      { rel: 'alternate', hreflang: 'fa-ir', href: 'https://www.app.payavending.com/' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  loading: {
    color: '#41b518',
    height: '5px'
  },

  //Sert middlewere for authenticate
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'https://api.payavending.com',
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/logout', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/auth/user-profile', method: 'get' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24
        },
        refreshToken: {
          maxAge: 60 * 60 * 24 * 7
        },
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }

  },


  ssr:true,


  // Global CSS (https://go.nuxtjs.dev/config-css)

  css: [
    '@/assets/bulma/css/bulma.min.css',
    '@/assets/css/style.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/vuelayers.js', ssr: false },
    '~/plugins/axios',
    '~/plugins/toast.js',
    { src: '~/plugins/qrcode.js', mode: 'client' }
    //{ src: "@/plugins/hotjar", mode: "client" },
  ],


  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: [
      '~/components',
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  buildModules: [
    '@nuxtjs/pwa'
  ],

  pwa: {
    icon: {
      fileName: 'Payavending_Logo.jpg'
    },
    manifest: {
      name: 'Paya Vending',
      short_name: 'Paya',
      theme_color: '#ef4036',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/Payavending_Logo.jpg',
          sizes: '192x192',
          type: 'image/jpg'
        },
        {
          src: '/Payavending_Logo.jpg',
          sizes: '512x512',
          type: 'image/jpg'
        }
      ]
    },
    meta: {
      theme_color: '#ef4036',
      appleStatusBarStyle: 'black-translucent'
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "https://api.payavending.com/api/"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    postcss: false,
    publicPath: 'payavending',
    standalone: true,
  }
}
