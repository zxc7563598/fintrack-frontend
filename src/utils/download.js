import { isWailsMode } from "./environment"

export async function downloadFile(filename, data) {
    if (isWailsMode()) {
        let buffer
        if (data instanceof Blob) {
            buffer = new Uint8Array(await data.arrayBuffer())
        } else if (data instanceof ArrayBuffer) {
            buffer = new Uint8Array(data)
        } else if (data instanceof Uint8Array) {
            buffer = data
        } else {
            throw new Error('不支持的数据类型')
        }
        try {
            // 转成普通数组
            const arr = Array.from(buffer)
            await window.go.main.App.SaveCSV(filename, arr)
        } catch (err) {
            console.error('保存失败:', err)
        }
        return
    }
    const blob = data instanceof Blob ? data : new Blob([data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}
