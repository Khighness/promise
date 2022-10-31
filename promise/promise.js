class Promise {

  /**
   * Promise构造函数
   * 
   * @param {*} executor 执行器
   */
  constructor(executor) {
    // Promise状态
    this.PromiseState = 'pending'
    // Promise结果
    this.PromiseResult = null
    // Promise回调函数
    this.Callbacks = []

    const self = this

    // resolve, reject
    // 1. 修改对象的状态 - PromiseState
    // 2. 设置对象结果值 - PromiseResult
    // 3. 执行相应回调函数 - Callback

    function resolve(data) {
      if (self.PromiseState !== 'pending') return
      self.PromiseState = 'fullfilled'
      self.PromiseResult = data
      setTimeout(() => {
        self.Callbacks.forEach(callback => {
          callback.onResolved(data)
        })
      })
    }

    function reject(data) {
      if (self.PromiseState !== 'pending') return
      self.PromiseState = 'rejected'
      self.PromiseResult = data
      setTimeout(() => {
        self.Callbacks.forEach(callback => {
          callback.onRejected(data)
        })
      })
    }

    try {
      // 同步调用执行器函数
      executor(resolve, reject)
    } catch (e) {
      // 捕捉异常设置状态
      reject(e)
    }
  }

  /**
   * Promise异步回调
   * 
   * @param {*} onResolved 执行成功时的回调函数
   * @param {*} onRejected 执行失败时的回调函数
   * @returns Promise
   */
  then(onResolved, onRejected) {
    const self = this

    if (typeof onResolved !== 'function') {
      onResolved = value => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }

    return new Promise((resolve, reject) => {

      /**
       * 包装回调函数
       * 
       * @param {*} operation 函数类型，reslove 或者 reject
       */
      function callback(operation) {
        try {
          let result = operation(self.PromiseResult)
          if (result instanceof Promise) {
            result.then(value => resolve(value), reason => reject(reason))
          } else {
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      }

      if (this.PromiseState === 'fullfilled') {
        setTimeout(() => {
          callback(onResolved)
        })
      } else if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected)
        })
      } else if (this.PromiseState === 'pending') {
        this.Callbacks.push({
          onResolved: function () {
            callback(onResolved)
          },
          onRejected: function () {
            callback(onRejected)
          }
        })
      }
    })
  }


  /**
   * Promise失败回调
   * 
   * @param {*} onRejected 失败回调的函数
   * @returns Promise
   */
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  /**
   * Promise的快捷构造函数
   * 
   * @param {*} value 值对象 或者 Promise实例
   * @returns fullfilled状态的Promise实例
   */
  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      } else {
        resolve(value)
      }
    })
  }

  /**
   * Promise的快捷构造函数
   * 
   * @param {*} reason 失败值 或者 Promise实例
   * @returns rejected状态的Promise实例
   */
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /**
   * Promise的快捷构造函数
   * 
   * @param {*} promises Promise数组
   * @returns Promise实例。
   * 所有的Promise都为fullfilled，状态才为fullfilled；
   * 只要有一个Promise为rejected，状态就为rejected。
   */
  static all(promises) {
    return new Promise((resolve, reject) => {
      let cnt = 0
      let arr = []
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(value => {
          cnt++
          arr[i] = value
          if (cnt === promises.length) {
            resolve(arr)
          }
        }, reason => {
          reject(reason)
        })
      }
    })
  }

  /**
   * Promise的快捷构造函数
   * 
   * @param {*} promises Promise数组
   * @returns Promise实例，状态由最先最先修改状态的Promise决定。
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      }
    })
  }
}
