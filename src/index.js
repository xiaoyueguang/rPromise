class rPromise {
  // 状态
  // pending fulfilled rejected
  _status = 'pending'
  _value

  constructor (fn) {
    if (typeof this !== 'object')
      throw new Error('Promise 必须通过实例化来调用')
    if (!fn)
      throw new Error('Promise 必须传入一个参数')
    if (typeof fn !== 'function')
      throw new Error('Promise 的第一个参数必须为一个方法')

    fn(
      this.resolve.bind(this),
      this.reject.bind(this)
    )

  }

  resolve = function (value) {
    this._status = 'resolved'
    this._value = value
  }

  reject = function (reason) {
    this._status = 'rejected'
    console.error('Uncaught (in promise)', reason)
    this._value = reason
  }

  then (resolve, reject) {
    return new rPromise()
  }
}

module.exports = rPromise
