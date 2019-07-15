const format = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

// 时间戳转换
export const getLocalTime = time =>{
    let dateTime = new Date(time);
    var year=dateTime.getFullYear();
    var month=dateTime.getMonth()+1;
    var date=dateTime.getDate();
    var hour=dateTime.getHours();
    var minute=dateTime.getMinutes();
    var second=dateTime.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

//格式化日期
export const formatDate = time => {
    if (time == '' || time == null || time == undefined) return '';
    if (typeof time === 'string') time = Number(time)
    let date = new Date(time)
    return format(date, 'yyyy-MM-dd hh:mm:ss')
}



//格式化日期
export const formatDate1 = time => {
    if (time == '' || time == null || time == undefined) return '';
    if (typeof time === 'string') time = Number(time)
    let date = new Date(time);
    return format(date, 'yyyy-MM-dd')
}

//格式化金额
export const price = value => {
    const _value = parseFloat(value);
    if (isNaN(_value)) return value;
    return value.toFixed(2);
}

// 许可证信息
export const licenceInfo = value => {
    if (value == '' || value == null || value == undefined) return '缺失'
    // console.log(value)
    return '有效'
}
