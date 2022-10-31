const fs = require('fs')

// 回调
// fs.readFile('./data/k.txt', (err, data) => {
//   if (err) throw err
//   console.log(data.toString())
// })

// Promise
let p = new Promise((resolve, reject) => {
  fs.readFile('./data/k.txt', (err, data) => {
    if (err) reject(err);
    else resolve(data);
  })
})

// 调用then
p.then(value => {
  console.log(value.toString())
}, reason => {
  console.error(reason)
})