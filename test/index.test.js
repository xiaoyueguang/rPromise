import {ERROR, Promise} from './helper'
import {expect} from 'chai'

describe('实例化: ', function () {
  it('必须通过 new 实例化', function () {
    function exec () {
      Promise()
    }
    expect(exec).to.throw(Error, /Cannot call a class as a function/)
  })

  it('实例化时 必须传入一个参数', function () {
    function exec () {
      new Promise()
    }
    expect(exec).to.throw(Error, 'Promise 必须传入一个参数')
  })

  it('实例化时 第一个参数必须为一个方法', function () {
    function exec () {
      new Promise('test')
    }
    expect(exec).to.throw(Error, 'Promise 的第一个参数必须为一个方法')
  })

  it('实例化时 Promise 传进去的方法会立即同步执行', function () {
    let i = 0
    const promise = new Promise(() => {
      i++
    })
    expect(i).to.be.equal(1)
  })

  it('实例化后 Promise 的原型为 Promise', function () {
    const promise = new Promise(() => {})
    expect(promise).to.instanceof(Promise)
  })

  it('实例化后 Promise 会有一个状态 默认值为 pending', function () {
    const promise = new Promise(() => {})
    expect(promise._status).to.be.equal('pending')
  })

  it('实例化后 Promise, 执行 resolve, 状态会变成 resolved', function () {
    const promise = new Promise((resolve) => {
      resolve()
    })
    expect(promise._status).to.be.equal('resolved')
  })

  it('实例化后 Promise, 执行 resolve, 值会变成 传入 resolve 的值', function () {
    const promise = new Promise((resolve) => {
      resolve(1)
    })
    expect(promise._value).to.be.equal(1)
  })

  it('实例化后 Promise, 执行 reject, 状态会变成 rejected', function () {
    const promise = new Promise((resolve, reject) => {
        reject()
    })
    expect(promise._status).to.be.equal('rejected')
  })

  it('实例化后 Promise, 执行 reject, 值会变成传入 reject 的值', function () {

    const promise = new Promise((resolve, reject) => {
        reject(ERROR)
    })
    expect(promise._value).to.be.equal(ERROR)
  })
});

