class rPromise {
  // 状态
  // pending fulfilled rejected
  _status = 'pending'
  _value

  _resolve () {}
  _reject () {}

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
    requestAnimationFrame(this._resolve.bind(this))
  }

  reject = function (reason) {
    this._status = 'rejected'
    console.error('Uncaught (in promise)', reason)
    this._value = reason
    requestAnimationFrame(this._reject.bind(this))
  }

  then (resolve, reject) {
    const promise = new rPromise((_resolve, _reject) => {
      this._resolve = () => {
        resolve(this._value)
        _resolve(promise._value)
      }
      this._reject = () => {
        reject(this._value)
        _reject(promise._value)
      }
    })

    return promise

  }
}

module.exports = rPromise
