/**
 * util.promisify 方法
 */

// 引入 util 模块
const util = require('util')
// 引入 fs 模块
const fs = require('fs')
// 返回一个 promise 风格的函数
let mineReadFile = util.promisify(fs.readFile)

mineReadFile('./data/k.txt').then(value => {
  console.log(value.toString())
})

/**
 * Promise 对象的状态
 * [PromiseState]
 * - pending 未决定
 * - resolved | fullfilled 成功
 * - rejected 失败
 */

/**
 * Promise 对象的值
 * [PromiseResult]
 * 保存着对象 成功 | 失败 的结果
 */