import type { VuetifyOptions } from 'vuetify'
import { resolveVuetifyTheme } from '@core/utils/vuetify'

export const staticPrimaryColor = '#666CFF'

const theme: VuetifyOptions['theme'] = {
  defaultTheme: resolveVuetifyTheme(),
  themes: {
    light: {
      dark: false,
      colors: {
        // 'primary': localStorage.getItem(`${themeConfig.app.title}-lightThemePrimaryColor`) || staticPrimaryColor,
        'primary': '#F6E1AA',
        'on-primary': '#fff',
        'secondary': '#DAC79F',
        'on-secondary': '#fff',
        'success': '#72E128',
        'on-success': '#fff',
        'info': '#26C6F9',
        'on-info': '#fff',
        'warning': '#FDB528',
        'on-warning': '#fff',

        'error': '#FF5C8D',
        'background': '#F7F1F7',
        'on-background': '#000',

        'surface': '#EAE4EA',
        'on-surface': '#000',

        'snackbar-background': '#212121',
        'tooltip-background': '#262732',
        'alert-background': '#F7F7F9',

        'grey-50': '#FAFAFA',
        'grey-100': '#F4F5FA',
        'grey-200': '#F5F5F7',
        'grey-300': '#E0E0E0',
        'grey-400': '#BDBDBD',
        'grey-500': '#9E9E9E',
        'grey-600': '#757575',
        'grey-700': '#616161',
        'grey-800': '#424242',
        'grey-900': '#212121',

        'text': '#000',
        'text-1': '#241E21',
        'text-2': '#4E4148',
        'text-3': '#8B6578',
        'text-4': '#C5AFBA',

        'perfect-scrollbar-thumb': '#DBDADE',
        'skin-bordered-background': '#fff',
        'skin-bordered-surface': '#fff',
      },

      variables: {
        'code-color': '#d400ff',
        'border-color': '#4c4e64',
        'hover-opacity': 0.05,
        'overlay-scrim-background': '#4C4E64',
        'overlay-scrim-opacity': 0.5,
        'focus-opacity': 0.1,
        'selected-opacity': 0.12,
        'activated-opacity': 0.1,
        'pressed-opacity': 0.14,
        'dragged-opacity': 0.1,
        'table-header-background': '#F5F5F7',

        // Shadows
        'shadow-key-umbra-opacity': 0.2,
        'shadow-key-penumbra-opacity': 0.14,
        'shadow-key-ambient-opacity': 0.12,
        'shadow-key-umbra-color': '#4C4E64',
        'shadow-key-penumbra-color': '#4C4E64',
        'shadow-key-ambient-color': '#4C4E64',
      },
    },
    dark: {
      dark: true,
      colors: {
        // 'primary': localStorage.getItem(`${themeConfig.app.title}-darkThemePrimaryColor`) || staticPrimaryColor,
        'primary': '#A66A6F',
        'on-primary': '#fff',
        'secondary': '#8F848F',
        'on-secondary': '#fff',
        'success': '#04BE3F',
        'on-success': '#fff',
        'info': '#598BFC',
        'on-info': '#fff',
        'warning': '#D99844',
        'on-warning': '#fff',
        'danger': '#D14771',
        'on-danger': '#fff',

        'error': '#FF5C8D',
        'background': '#1E1A1E',
        'on-background': '#FDF1F7',

        'surface': '#2E292E',
        'on-surface': '#FDF1F7',

        'snackbar-background': '#F5F5F5',
        'on-snackbar-background': '#30334E',
        'tooltip-background': '#464A65',
        'alert-background': '#282A42',

        'grey-50': '#2A2E42',
        'grey-100': '#41435c',
        'grey-200': '#3A3E5B',
        'grey-300': '#5E6692',
        'grey-400': '#7983BB',
        'grey-500': '#8692D0',
        'grey-600': '#AAB3DE',
        'grey-700': '#B6BEE3',
        'grey-800': '#CFD3EC',
        'grey-900': '#E7E9F6',

        'text': '#FDF1F7',
        'text-1': '#E3D8DD',
        'text-2': '#BDB3B8',
        'text-3': '#837C80',
        'text-4': '#4C484B',

        'perfect-scrollbar-thumb': '#4A5072',
        'skin-bordered-background': '#282A42',
        'skin-bordered-surface': '#282A42',
      },
      variables: {
        'code-color': '#d400ff',
        'border-color': '#eaeaff',
        'hover-opacity': 0.05,
        'overlay-scrim-background': '#101121',
        'overlay-scrim-opacity': 0.6,
        'focus-opacity': 0.1,
        'selected-opacity': 0.12,
        'activated-opacity': 0.1,
        'pressed-opacity': 0.14,
        'dragged-opacity': 0.1,
        'table-header-background': '#1E1A1E',

        // Shadows
        'shadow-key-umbra-opacity': 0.2,
        'shadow-key-penumbra-opacity': 0.14,
        'shadow-key-ambient-opacity': 0.12,
        'shadow-key-umbra-color': '#000',
        'shadow-key-penumbra-color': '#212121',
        'shadow-key-ambient-color': '#30334E',

        'shadow-lg-c': '#000',
        'shadow-lg-x': '-14px',
        'shadow-lg-y': '14px',
        'shadow-lg-b': '60px',
        'shadow-lg-o': 0.5,
      },
    },
  },
}

export default theme
