class rPromise {
  // 状态
  // pending fulfilled rejected
  _status = 'pending'

  constructor (fn) {
    if (typeof this !== 'object')
      throw new Error('Promise 必须通过实例化来调用')
    if (!fn)
      throw new Error('Promise 必须传入一个参数')
    if (typeof fn !== 'function')
      throw new Error('Promise 的第一个参数必须为一个方法')

    fn(rPromise.resolve.bind(this), rPromise.reject.bind(this))

  }

  static resolve = function () {
    return new Promise()
  }

  static resolve = function () {

  }

  then (resolve, reject) {
    return new rPromise()
  }
}

rPromise.deferred = () => {}

module.exports = rPromise
