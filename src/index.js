function rPromise (fn) {
  const that = this
  if (typeof this !== 'object')
    throw new Error('Cannot call a class as a function')
  if (fn === undefined)
    throw new Error('Promise 必须传入一个参数')
  if (typeof fn !== 'function')
    throw new Error('Promise 的第一个参数必须为一个方法')

  // pending resolved rejected
  this._status = 'pending'
  this._value = undefined

  this._resolves = []
  this._rejects = []

  fn(resolve.bind(this))
  
  function resolve (val) {
    if (this._status === 'pending') {
      this._status = 'resolved'
      this._value = val
      requestAnimationFrame(function () {
        try {
          that.fire.call(that, that._resolves)
        } catch (e) {
          console.log(e)
        }
      })
    }
  }
}

rPromise.prototype.then = function (resolve, reject) {
  const that = this
  resolve && this._resolves.push(resolve)

  let _promise = new rPromise(function (_resolve) {
    _resolve && that._resolves.push(val => {
      _resolve(val)
    })
  })

  if (this._status !== 'pending') {
    this.fire.call(this, this._resolves)
  }
  return _promise
}

rPromise.prototype.fire = function (arr, value) {
  const fn = arr.shift()
  let promise
  let _value
  if (fn) {
    _value = promise = fn(value || this._value)
  }
  if (promise instanceof rPromise) {
    _value = promise._value
  }
  if (arr.length > 0) {
    const _promise = this.fire.call(this, arr, _value)
  }
}



export default rPromise
