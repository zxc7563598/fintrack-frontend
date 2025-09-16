/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { zhHans } from 'vuetify/locale'

// 定义自定义主题
const lightTheme = {
  dark: false,
  colors: {
    background: '#F8F9F7',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#F3F5F3',
    'surface-variant': '#E6EAE7',
    'on-surface-variant': '#9BA49E',

    primary: '#6BAF92',
    'primary-darken-1': '#588F77',
    secondary: '#A3A380',
    'secondary-darken-1': '#7E7E65',

    error: '#E57373',
    info: '#64B5F6',
    success: '#81C784',
    warning: '#FFB74D',

    teal: '#4CA691',
    grey: '#9CA3AF',
    'grey-50': '#FAFAFA',
    'grey-100': '#F5F5F5',
    'grey-200': '#EEEEEE',
    'grey-300': '#E0E0E0',
    'grey-400': '#BDBDBD',
    'grey-500': '#9E9E9E',
    'grey-600': '#757575',
    'grey-700': '#616161',
    'grey-800': '#424242',
    'grey-900': '#212121',

    'perfect-scrollbar-thumb': '#D0D5D2',
    'skin-bordered-background': '#FFFFFF',
    'skin-bordered-surface': '#FFFFFF',
    'expansion-panel-text-custom-bg': '#F8F9F7',

    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-info': '#FFFFFF',
    'on-warning': '#FFFFFF',
    'on-error': '#FFFFFF',
    'on-background': '#2F3431',
    'on-surface': '#2F3431',

    income: '#7BAF5B',
    loss: '#A86C6C',
  },
  variables: {
    'border-color': '#E6EAE7',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.9,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.4,
    'idle-opacity': 0.04,
    'hover-opacity': 0.2,
    'focus-opacity': 0.1,
    'selected-opacity': 0.08,
    'activated-opacity': 0.16,
    'pressed-opacity': 0.14,
    'dragged-opacity': 0.1,
    'theme-kbd': '#E6EAE7',
    'theme-on-kbd': '#000000',
    'theme-code': '#F3F5F3',
    'theme-on-code': '#000000',
    'code-color': '#6BAF92',
    'overlay-scrim-background': '#2F3431',
    'overlay-scrim-opacity': 0.5,
    'tooltip-background': '#424242',
    'tooltip-color': '#FFFFFF',
    'table-header-color': '#F3F5F3',
    'shadow-key-umbra-color': '#2F3431',
    'shadow-xs-opacity': 0.16,
    'shadow-sm-opacity': 0.18,
    'shadow-md-opacity': 0.20,
    'shadow-lg-opacity': 0.22,
    'shadow-xl-opacity': 0.24,
  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#1E2020',
    surface: '#2A2D2B',
    'surface-bright': '#333634',
    'surface-light': '#3A3D3B',
    'surface-variant': '#404442',
    'on-surface-variant': '#B0B6B3',

    primary: '#5C8F78',
    'primary-darken-1': '#487160',
    secondary: '#B5B59C',
    'secondary-darken-1': '#949478',

    error: '#E58A8A',
    info: '#7FB8E6',
    success: '#88B893',
    warning: '#E8B169',

    teal: '#548C7B',
    grey: '#9CA3AF',
    'grey-50': '#FAFAFA',
    'grey-100': '#F5F5F5',
    'grey-200': '#EEEEEE',
    'grey-300': '#E0E0E0',
    'grey-400': '#BDBDBD',
    'grey-500': '#9E9E9E',
    'grey-600': '#757575',
    'grey-700': '#616161',
    'grey-800': '#424242',
    'grey-900': '#212121',

    'perfect-scrollbar-thumb': '#555A57',
    'skin-bordered-background': '#2A2D2B',
    'skin-bordered-surface': '#2A2D2B',
    'expansion-panel-text-custom-bg': '#1E2020',

    'on-primary': '#FFFFFF',
    'on-secondary': '#2A2D2B',
    'on-success': '#1E2020',
    'on-info': '#1E2020',
    'on-warning': '#1E2020',
    'on-error': '#1E2020',
    'on-background': '#E4E6E5',
    'on-surface': '#E4E6E5',

    income: '#6FA76A',
    loss: '#B47171',
  },
  variables: {
    'border-color': '#404442',
    'border-opacity': 0.24,
    'high-emphasis-opacity': 0.9,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.4,
    'idle-opacity': 0.04,
    'hover-opacity': 0.2,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.18,
    'pressed-opacity': 0.16,
    'dragged-opacity': 0.12,
    'theme-kbd': '#404442',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#2A2D2B',
    'theme-on-code': '#FFFFFF',
    'code-color': '#5C8F78',
    'overlay-scrim-background': '#000000',
    'overlay-scrim-opacity': 0.6,
    'tooltip-background': '#333634',
    'tooltip-color': '#FFFFFF',
    'table-header-color': '#2A2D2B',
    'shadow-key-umbra-color': '#000000',
    'shadow-xs-opacity': 0.24,
    'shadow-sm-opacity': 0.28,
    'shadow-md-opacity': 0.32,
    'shadow-lg-opacity': 0.36,
    'shadow-xl-opacity': 0.40,
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  locale: {
    locale: 'zhHans',
    messages: { zhHans },
  },
})
