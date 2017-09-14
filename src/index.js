class rPromise {
  // 状态
  // pending fulfilled rejected
  _status = 'pending'
  _value = undefined

  _resolve () {}
  _reject () {}

  constructor (fn) {
    if (!fn)
      throw new Error('Promise 必须传入一个参数')
    if (typeof fn !== 'function')
      throw new Error('Promise 的第一个参数必须为一个方法')

    fn(
      this.resolve.bind(this),
      this.reject.bind(this)
    )
  }
  // 这里负责状态变更. 以及变更后 触发 then 里的方法
  resolve = function (value) {
    this._status = 'resolved'
    this._value = value
    requestAnimationFrame(this._resolve.bind(this))
  }

    // 这里负责状态变更. 以及变更后 触发 then 里的方法
    reject = function (value) {
      this._status = 'rejected'
      this._value = value
      requestAnimationFrame(this._reject.bind(this))
    }

  then (resolve, reject) {
    const context = this
    let promise = new rPromise(function (_resolve, _reject) {
      context._resolve = function () {
        _promise = resolve(context._value)
        context._resolve = () => {}

        if (_promise instanceof rPromise) {
          _promise.then(function (val) {
            _resolve(val)
          })
        } else {
          // return rPromise.resolve(_promise)
        }
      }

      context._reject = function () {
        _promise = reject(context._value)
        context._reject = () => {}

        if (_promise instanceof rPromise) {
          _promise.then(() => {}, function (val) {
            _reject(val)
          })
        } else {
          // return rPromise.resolve(_promise)
        }
      }
    })
    switch (this._status) {
      case 'pending':
        break
      case 'resolved':
        // 马上触发
        this._resolve()
        break
    }

    return promise

  }

  static resolve = val => {
    return new rPromise(resolve => resolve(val instanceof rPromise ? undefined : val))
  }

  static reject = val => {
    return new rPromise((resolve, reject) => reject(val instanceof rPromise ? undefined : val))
  }


  // reject = function (reason) {
  //   this._status = 'rejected'
  //   console.error('Uncaught (in promise)', reason)
  //   this._value = reason
  //   requestAnimationFrame(this._reject.bind(this))
  // }
}

module.exports = rPromise
