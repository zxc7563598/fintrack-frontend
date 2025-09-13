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
    background: '#FAF8F4',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#EEEEEE',
    'on-surface-variant': '#EEEEEE',

    primary: '#C67E48',
    'primary-darken-1': '#B67443',
    secondary: '#8C8C8C',
    'secondary-darken-1': '#595754',

    error: '#FF3B30',
    info: '#2196F3',
    success: '#4CD964',
    warning: '#FF9500',

    teal: '#009688',
    grey: '#8C8C8C',
    'grey-50': '#FAFAFA',
    'grey-100': '#F0F2F8',
    'grey-200': '#EEEEEE',
    'grey-300': '#E0E0E0',
    'grey-400': '#BDBDBD',
    'grey-500': '#9E9E9E',
    'grey-600': '#757575',
    'grey-700': '#616161',
    'grey-800': '#424242',
    'grey-900': '#212121',

    'perfect-scrollbar-thumb': '#DEDCDA',
    'skin-bordered-background': '#FFFFFF',
    'skin-bordered-surface': '#FFFFFF',
    'expansion-panel-text-custom-bg': '#FAFAFA',

    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-info': '#FFFFFF',
    'on-warning': '#FFFFFF',
    'on-error': '#FFFFFF',
    'on-background': '#413935',
    'on-surface': '#413935',

    income: '#D24D57',
    loss: '#409E70',
  },
  variables: {
    'border-color': '#FAF8F4',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.9,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.4,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.1,
    'selected-opacity': 0.08,
    'activated-opacity': 0.16,
    'pressed-opacity': 0.14,
    'dragged-opacity': 0.1,
    'theme-kbd': '#EEEEEE',
    'theme-on-kbd': '#000000',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
    'code-color': '#FF8000',
    'overlay-scrim-background': '#413935',
    'overlay-scrim-opacity': 0.5,
    'tooltip-background': '#212121',
    'tooltip-color': '#FFFFFF',
    'table-header-color': '#FDFCF9',
    'shadow-key-umbra-color': '#413935',
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
    background: '#121212',
    surface: '#1E1E1E',
    'surface-bright': '#2C2C2C',
    'surface-light': '#2A2A2A',
    'surface-variant': '#BDBDBD',
    'on-surface-variant': '#1E1E1E',

    primary: '#D79C6B',
    'primary-darken-1': '#C67E48',
    secondary: '#B0B0B0',
    'secondary-darken-1': '#8C8C8C',

    error: '#FF6B6B',
    info: '#64B5F6',
    success: '#69F0AE',
    warning: '#FFA726',

    teal: '#26A69A',
    grey: '#B0B0B0',
    'grey-50': '#2C2C2C',
    'grey-100': '#333333',
    'grey-200': '#3A3A3A',
    'grey-300': '#424242',
    'grey-400': '#616161',
    'grey-500': '#757575',
    'grey-600': '#9E9E9E',
    'grey-700': '#BDBDBD',
    'grey-800': '#E0E0E0',
    'grey-900': '#F5F5F5',

    'perfect-scrollbar-thumb': '#555555',
    'skin-bordered-background': '#1E1E1E',
    'skin-bordered-surface': '#2C2C2C',
    'expansion-panel-text-custom-bg': '#2A2A2A',

    'on-primary': '#121212',
    'on-secondary': '#121212',
    'on-success': '#121212',
    'on-info': '#121212',
    'on-warning': '#121212',
    'on-error': '#121212',
    'on-background': '#EDEDED',
    'on-surface': '#EDEDED',

    income: '#FF6B6B',
    loss: '#4CAF50',
  },
  variables: {
    'border-color': '#2C2C2C',
    'border-opacity': 0.2,
    'high-emphasis-opacity': 0.9,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.4,
    'idle-opacity': 0.04,
    'hover-opacity': 0.08,
    'focus-opacity': 0.12,
    'selected-opacity': 0.12,
    'activated-opacity': 0.16,
    'pressed-opacity': 0.14,
    'dragged-opacity': 0.1,
    'theme-kbd': '#2C2C2C',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#1E1E1E',
    'theme-on-code': '#FFFFFF',
    'code-color': '#FFB74D',
    'overlay-scrim-background': '#000000',
    'overlay-scrim-opacity': 0.6,
    'tooltip-background': '#333333',
    'tooltip-color': '#FFFFFF',
    'table-header-color': '#1E1E1E',
    'shadow-key-umbra-color': '#000000',
    'shadow-xs-opacity': 0.4,
    'shadow-sm-opacity': 0.42,
    'shadow-md-opacity': 0.44,
    'shadow-lg-opacity': 0.46,
    'shadow-xl-opacity': 0.48,
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
