import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
import { icons } from './icons'
import { themes } from './theme'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default function (app) {
  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
    },
    defaults,
    icons,
    theme: {
      defaultTheme: 'dark',
      themes,
    },
  })

  const updateTheme = (isDark) => {
    vuetify.theme.global.name.value = isDark ? 'dark' : 'light'
  }

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  updateTheme(isDark)

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => updateTheme(e.matches))

  app.use(vuetify)
}
