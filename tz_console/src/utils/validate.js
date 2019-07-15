/**
 * Created by admin on 19/03/22.
 */

export function isvalidUsername(str) {
  const valid_map = ['user','admin']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 整数
const InterNum = (rule, value, callback) => {
  const reg = /^[0-9]*[1-9][0-9]*$/
  if (value === '' || value === undefined || value === null) {
      callback()
  } else if (!value) {
      return callback(new Error('请填写整数'))
  } else if (!reg.test(value)) {
      return callback(new Error('请输入整数'))
  } else {
      callback()
  }
}

// 正整数
const positiveIntegers = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/
  if (value === '' || value === undefined || value === null) {
      callback()
  } else if (!value) {
      return callback(new Error('请填写正整数'))
  } else if (!reg.test(value)) {
      return callback(new Error('请输入正整数'))
  } else {
      callback()
  }
}

// 价格
const price = (rule, value, callback) => {
  const reg = /^[0-9]+(.[0-9]{1,2})?$/
  if (value === '' || value === undefined || value === null) {
      callback()
  } else if (!reg.test(value)) {
      return callback(new Error('请输入正确的价格'))
  } else if (value < 0) {
      return callback(new Error('请输入大于0的价格'))
  } else {
      callback()
  }
}

// 手机号码
const phone = (rule, value, callback) => {
  const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  if (value === '' || value === undefined || value === null) {
      callback()
  } else if (!reg.test(value)) {
      return callback(new Error('请输入正确的手机号码'))
  } else {
      callback()
  }
}

//密码
const password = (rule, value, callback) => {
  const reg = /^\w+$/
  if (value.length < 6 || value.length > 18) {
      return callback(new Error('密码长度须为6 - 18位'))
  } else if (!reg.test(value)) {
      return callback(new Error('密码长度须为6 - 18位'))
  } else {
      callback()
  }
}

//角色名称
const roleName = (rule, value, callback) => {
  if (value.length < 2 || value.length > 10) {
      return callback(new Error('内容长度须为2 - 10位'))
  } else {
      callback()
  }
}



//姓名称
const name = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/;
  if (value.length < 2 || value.length > 10) {
      return callback(new Error('姓名长度须为2 - 10位'))
  } else if (!reg.test(value)) {
      return callback(new Error('密码长度须为6 - 18位'))
  } else {
      callback()
  }
}



// 邮政编码
const postalcode = (rule, value, callback) => {
  const reg = /^[1-9]\d{5}$/
  if (value === '') {
      callback()
  } else if (value === '' || value === undefined || value === null) {
      callback()
  } else if (!reg.test(value)) {
      return callback(new Error('请输入正确的邮政编码'))
  } else {
      callback()
  }
}

// 银行卡
const creditcard = (rule, value, callback) => {
  const reg = /^([1-9]{1})(\d{14}|\d{18})$/
  if (!reg.test(value)) {
      return callback(new Error('请输入正确的银行卡'))
  } else {
      callback()
  }
}

// 身份证
const idcard = (rule, value, callback) => {
  const reg =  /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (value === '' || value === undefined) {
      callback()
  } else if (!reg.test(value)) {
      return callback(new Error('请输入正确的身份证号码'))
  } else {
      callback()
  }
}

//添加商品-添加套餐-价格
const PackagePrice = (rule, value, callback) => {
  if (value.comboPrice === '') {
      return callback(new Error('请填写套餐价格'))
  } else {
      price(rule, value.comboPrice, callback)
  }
}

//添加商品-添加套餐-数量
const PackageNumber = (rule, value, callback) => {
  if (value.comboNum === '') {
      return callback(new Error('请填写套餐数量'))
  } else {
      positiveIntegers(rule, value.comboNum, callback)
  }
}


//资质证书表单验证--图片
const validateCertificateListImage = (rule, value, callback) => {
  const _validate = value.qualificationUrl;
  if (_validate === undefined || _validate === '') {
      callback(new Error('请选择该资质的图片'));
  } else {
      callback()
  }
}

//资质证书表单验证--证书号
const validateCertificateListNumber = (rule, value, callback) => {
  const _validate = value.qualificationNum;
  const reg = /^[a-zA-Z0-9]+$/
  if (_validate === undefined || _validate === '') {
      callback(new Error('请输入证件号'));
  } else if (!reg.test(_validate)) {
      callback(new Error('请输入正确的证件号'));
  } else {
      callback()
  }
}

//资质证书表单验证--开始日期
const validateCertificateListTimeStart = (rule, value, callback) => {
  const _validate = value.qualificationStartTime;
  if (value.qualificationLongEffective === 0 &&
      (_validate === undefined || _validate === '' || _validate === null)
  ) {
      callback(new Error('请选择资质的开始日期'));
  } else {
      callback()
  }
}

//资质证书表单验证--结束日期
const validateCertificateListTimeEnd = (rule, value, callback) => {
  const _validate = value.qualificationEndTime;
  if (value.qualificationLongEffective === 0 &&
      (_validate === undefined || _validate === '' || _validate === null)
  ) {
      callback(new Error('请选择资质的结束日期'));
  } else {
      callback()
  }
}

// 最大值
const validatemaxnumber = (rule, value, callback) => {
  if (value.refundPrice > value.maxvalue) {
      return callback(new Error(数值不能大于 + value.maxvalue))
  } else {
      callback()
  }
}

export default {
  InterNum,
  positiveIntegers,
  price,
  name,
  phone,
  password,
  roleName,
  postalcode,
  creditcard,
  idcard,
  validatemaxnumber,
  validateCertificateList: {
      image: validateCertificateListImage,
      number: validateCertificateListNumber,
      startTime: validateCertificateListTimeStart,
      endTime: validateCertificateListTimeEnd
  },
  validatePackage: {
      price: PackagePrice,
      number: PackageNumber
  }
}