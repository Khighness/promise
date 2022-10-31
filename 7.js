const p = new Promise((resolve, reject) => {
  reject('error')
})

/**
 * promise#catch()只接受reject回调
 */
p.catch(reason => {
  console.error(reason)
})