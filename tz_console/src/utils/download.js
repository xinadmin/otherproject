/**
 * @Author Cris <1023244978@qq.com>
 * @Date 2018/12/26
 */
const browser = () => {
    const userAgent = navigator.userAgent

    const isOpera = userAgent.indexOf('Opera') > -1
    if (isOpera) {
        return 'Opera'
    }

    if (userAgent.indexOf('Firefox') > -1) {
        return 'Firefox'
    }
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome'
    }

    if (userAgent.indexOf('Safari') > -1) {
        return 'Safari'
    }

    if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        return 'IE'
    }

    if (userAgent.indexOf('Trident') > -1) {
        return 'Edge'
    }
}

const download = (base64 = null, name = 'image') => {
    if (browser() === 'IE' || browser() === 'Edge') {
        saveIE(base64, name)
    } else {
        save(base64, name)
    }
}
const save = (base64, name) => {
    let image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        let context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        let url = canvas.toDataURL('image/png')

        let a = document.createElement('a')
        let event = new MouseEvent('click')
        a.download = name
        a.href = url
        a.dispatchEvent(event)
    }
    image.src = base64
}

const saveIE = (url, name) => {
    let dataUrl = url.split(',')
    let mime = dataUrl[0].match(/:(.*?);/)[1]

    let base = atob(dataUrl[1])
    let len = base.length
    let u8Arr = new Uint8Array(len)

    while (len--) {
        u8Arr[len] = base.charCodeAt(len)
    }
    let blob = new Blob([ u8Arr ], { type: mime })
    window.navigator.msSaveOrOpenBlob(blob, name + '.' + 'png')
}


export {
    browser,
    download
}

export default {
    browser,
    download
}
