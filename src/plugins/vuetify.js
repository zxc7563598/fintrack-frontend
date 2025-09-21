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
import { VCalendar } from 'vuetify/labs/VCalendar'
import { zhHans } from 'vuetify/locale'
import * as directives from 'vuetify/directives'

// 定义自定义主题
const lightTheme = {
  dark: false,
  colors: {
    background: '#F9FAFB',       // 背景更干净
    surface: '#FFFFFF',          // 卡片/面板
    'surface-bright': '#FFFFFF',
    'surface-light': '#F4F6F8',
    'surface-variant': '#E5E7EB',
    'on-surface-variant': '#9CA3AF',

    primary: '#4F9D8D',          // 主色：低饱和青绿色，金融风
    'primary-darken-1': '#3E7D6F',
    secondary: '#FFB84C',        // 辅色：温暖橙色，点缀用
    'secondary-darken-1': '#E69A2E',

    error: '#EF5350',            // 错误：柔和红
    info: '#42A5F5',             // 信息：蓝色
    success: '#4CAF50',          // 成功：绿色
    warning: '#FFA726',          // 警告：亮橙

    teal: '#3FB8AF',
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
    'grey-900': '#1F2937',

    'perfect-scrollbar-thumb': '#D1D5DB',
    'skin-bordered-background': '#FFFFFF',
    'skin-bordered-surface': '#FFFFFF',
    'expansion-panel-text-custom-bg': '#F9FAFB',

    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-info': '#FFFFFF',
    'on-warning': '#FFFFFF',
    'on-error': '#FFFFFF',
    'on-background': '#111827',  // 更深的文字颜色
    'on-surface': '#111827',

    income: '#4CAF50',           // 收入：偏亮绿
    loss: '#D9534F',             // 支出：柔和红
  },
  variables: {
    'border-color': '#E5E7EB',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.9,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.08,
    'focus-opacity': 0.1,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.14,
    'dragged-opacity': 0.1,
    'theme-kbd': '#E5E7EB',
    'theme-on-kbd': '#111827',
    'theme-code': '#F3F4F6',
    'theme-on-code': '#111827',
    'code-color': '#4F9D8D',
    'overlay-scrim-background': '#111827',
    'overlay-scrim-opacity': 0.5,
    'tooltip-background': '#374151',
    'tooltip-color': '#FFFFFF',
    'table-header-color': '#F3F4F6',
    'shadow-key-umbra-color': '#111827',
    'shadow-xs-opacity': 0.08,
    'shadow-sm-opacity': 0.1,
    'shadow-md-opacity': 0.12,
    'shadow-lg-opacity': 0.14,
    'shadow-xl-opacity': 0.16,
  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#111827',        // 主背景 深灰蓝
    surface: '#1F2937',           // 卡片/面板
    'surface-bright': '#374151',  // 高亮面板
    'surface-light': '#1E293B',
    'surface-variant': '#4B5563',
    'on-surface-variant': '#9CA3AF',

    primary: '#4F9D8D',           // 主色：青绿
    'primary-darken-1': '#3E7D6F',
    secondary: '#FFB84C',         // 辅色：暖橙
    'secondary-darken-1': '#E69A2E',

    error: '#EF5350',             // 红
    info: '#42A5F5',              // 蓝
    success: '#66BB6A',           // 绿色更亮
    warning: '#FFA726',           // 橙色

    teal: '#3FB8AF',
    grey: '#9CA3AF',
    'grey-50': '#1F2937',
    'grey-100': '#374151',
    'grey-200': '#4B5563',
    'grey-300': '#6B7280',
    'grey-400': '#9CA3AF',
    'grey-500': '#D1D5DB',
    'grey-600': '#E5E7EB',
    'grey-700': '#F3F4F6',
    'grey-800': '#F9FAFB',
    'grey-900': '#FFFFFF',

    'perfect-scrollbar-thumb': '#374151',
    'skin-bordered-background': '#1F2937',
    'skin-bordered-surface': '#1F2937',
    'expansion-panel-text-custom-bg': '#111827',

    'on-primary': '#FFFFFF',
    'on-secondary': '#111827',
    'on-success': '#111827',
    'on-info': '#FFFFFF',
    'on-warning': '#111827',
    'on-error': '#FFFFFF',
    'on-background': '#F9FAFB',
    'on-surface': '#F9FAFB',

    income: '#81C784',            // 收入：亮绿
    loss: '#E57373',              // 支出：亮红
  },
  variables: {
    'border-color': '#374151',
    'border-opacity': 0.24,
    'high-emphasis-opacity': 0.9,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.08,
    'focus-opacity': 0.1,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.14,
    'dragged-opacity': 0.1,
    'theme-kbd': '#374151',
    'theme-on-kbd': '#F9FAFB',
    'theme-code': '#1F2937',
    'theme-on-code': '#F9FAFB',
    'code-color': '#4F9D8D',
    'overlay-scrim-background': '#000000',
    'overlay-scrim-opacity': 0.6,
    'tooltip-background': '#374151',
    'tooltip-color': '#FFFFFF',
    'table-header-color': '#1F2937',
    'shadow-key-umbra-color': '#000000',
    'shadow-xs-opacity': 0.24,
    'shadow-sm-opacity': 0.28,
    'shadow-md-opacity': 0.32,
    'shadow-lg-opacity': 0.36,
    'shadow-xl-opacity': 0.4,
  }
}

export default createVuetify({
  directives,
  components: {
    VCalendar,
  },
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
