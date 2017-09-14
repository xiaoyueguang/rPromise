import {Promise as rPromise} from './helper'
import {expect} from 'chai'

const getTime = () => new Date().getTime()

const start = getTime()

const logInit = (str, color) => i => console.log('%c ' + str + i, color)
window.aaa = rPromise

function exec (color, str, Promise, done = () => {}) {
  const log = logInit(str, color)
  const print = i => log('次数' + i + '; 时间:' + (getTime() - start) + '   ')

  var promise, promise1, promise2, promise3
  
  promise = new Promise(resolve => {
    // print(0)
    setTimeout(() => {
      // print(1)
      resolve(1)
    }, 100)
  })
  // promise.z = 0
  // promise1 = promise.then(val => {
  //   print(1.5)
  //   log('值为:' + val)
  //   promise2 = new Promise(resolve => {
  //     print(2)

  //     setTimeout(() => {
  //       print(3)
  //       print(4)
  //       resolve(3)

  //     }, 400)
  //   })
  //   // promise2.z = 2

  //   return promise2
  // })
  // promise1.z = 1

  promise3 = promise.then(val => {
    log('这里要跑起来: ' + val)
    return val
  })

  window.bbbb = promise3

  promise3.then(val => {
    log('这里也要跑起来: ' + val)

  })
  // promise3.z = 3

}

describe('TEST: ', function () {
  this.timeout(2000)
  it('TEST', function (done) {
    exec('background: #f23; color: #fff;', '修改: ', rPromise)
    exec('background: #000; color: #fff;', '原生: ', Promise, done)
  })
});
