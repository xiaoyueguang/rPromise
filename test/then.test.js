import {ERROR, Promise} from './helper'
import {expect} from 'chai'

describe('then: ', function () {
  it('每个 Promise 实例化后都会有个 then 方法', function () {
    const promise = new Promise(() => {})
    expect(promise.then).to.be.a('function')
  })

  it('Promise 没有执行 resolve 或 reject 时, then 都不会被触发', function () {
    let i = 0
    const promise = new Promise(() => {
      i++
    }).then(() => {})
    expect(i).to.be.equal(1)
  })

  it('Promise then 方法走 resolve', function (done) {
    let i = 0
    const promise = new Promise((resolve) => {
      i++
      setTimeout(() => {
        i++
        resolve(i)
      })
    }).then(function (val) {
      expect(i).to.be.equal(2)
      expect(val).to.be.equal(2)
      done()
    })
    expect(i).to.be.equal(1)
  })

  it('Promise then 方法走 reject', function (done) {
    let i = 0
    const promise = new Promise((resolve, reject) => {
      i++
      setTimeout(() => {
        i++
        reject(ERROR)
      })
    }).then(function (val) {
    }, function (err) {
      expect(i).to.be.equal(2)
      expect(err).to.be.equal(ERROR)
      done()
    })
    expect(i).to.be.equal(1)
  })

  it('Promise then 方法 返回一个新的 Promise 实例', function (done) {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve(1))
    })

    const then = promise.then(val => {
      return new Promise(resolve => {
        val++
        setTimeout(() => {
          resolve(val)
        })
      })
    })
    then.then(val => {
      console.log(val)
      done()
    })
  })

  it('Promise then 方法里返回一个 Promise 时, 之后的 then 应当遵循那个 Promise', function () {

  })
});
