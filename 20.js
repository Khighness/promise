/**
 * 读取 data 下面的：1.txt 2.txt 3.txt
 * 三个文件内容，合并输出
 */
const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

// 回调函数的实现
fs.readFile('./data/1.txt', (err, data1) => {
  if (err) throw err
  fs.readFile('./data/2.txt', (err, data2) => {
    if (err) throw err
    fs.readFile('./data/3.txt', (err, data3) => {
      if (err) throw err
      console.log(data1 + data2 + data3)
    })
  })
})

// async和await的实现
async function main() {
  try {
    let data1 = await mineReadFile('./data/1.txt')
    let data2 = await mineReadFile('./data/2.txt')
    let data3 = await mineReadFile('./data/3.txt')
    console.log(data1 + data2 + data3)
  } catch (e) {
    console.warn(e)
  }
}

main()