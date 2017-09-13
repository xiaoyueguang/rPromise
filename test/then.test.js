import Promise from '../src/index.js'
import {expect} from 'chai'

describe('then: ', function () {
  it('每个 Promise 实例化后都会有个 then 方法', function () {
    const promise = new Promise(() => {})
    expect(promise.then).to.be.a('function')
  })

  // it('Promise then 方法走 resolve', function (done) {
  //   let i = 0
  //   const promise = new Promise((resolve) => {
  //     i++
  //     setTimeout(() => {
  //       i++
  //       resolve(i)
  //     })
  //   }).then(function (val) {
  //     expect(i).to.be.equal(2)
  //     expect(val).to.be.equal(2)
  //     done()
  //   })

  //   expect(i).to.be.equal(1)
  // })

});

