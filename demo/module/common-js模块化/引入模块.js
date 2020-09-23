// CommonJS使用exports和require来导出、导入模块。
// 引入模块，路径必须写./
const m = require('./四则运算.js')
console.log(m)

const result1 = m.sum(1, 1)
const result2 = m.subtract(1, 1)
console.log(result1, result2)