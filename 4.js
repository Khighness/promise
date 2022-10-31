/**
 * 封装函数：mineReadFile
 * 读取文件内容
 * @param path 文件路径
 * @return promise
 */

// promise 内部是同步操作
// then 调用是异步
function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

mineReadFile('./data/k.txt').then((value) => {
  console.log(value.toString())
}, (reason) => {
  console.error(reason)
})