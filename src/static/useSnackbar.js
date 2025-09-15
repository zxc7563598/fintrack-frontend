import { reactive } from 'vue'

export const snackbar = reactive({
    visible: false,
    text: '',
    color: 'error',
    timeout: 3000,
})

export function showSnackbar({ text, color = 'error', timeout = 3000 }) {
    snackbar.text = text
    snackbar.color = color
    snackbar.timeout = timeout
    snackbar.visible = true
}
