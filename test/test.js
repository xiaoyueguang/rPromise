import {Promise as rPromise} from './helper'
import {expect} from 'chai'

const getTime = () => new Date().getTime()

const start = getTime()

const logInit = (str, color) => i => console.log('%c ' + str + i, color)
window.aaa = rPromise

function exec (color, str, Promise, done = () => {}) {
  const log = logInit(str, color)
  const print = i => log('次数' + i + '; 时间:' + (getTime() - start) + '   ')

  var promise0, promise1, promise2, promise3
  
  promise0 = new Promise(resolve => {
    print(0)
    setTimeout(() => {
      print(1)
      resolve(1)
    }, 100)
  })
  promise1 = promise0.then(val => {
    print(2)
    log(val)
    return 9
  })

  // console.log(promise1)

  promise1.then(val => {
    print(3)
    log(val)
    done()
  })
  .then(val => log(val))
  .then(val => log(val))
  .then(val => log(val))
  .then(val => log(val))
  .then(val => log(val))
  .then(val => log(val))



}

describe('TEST: ', function () {
  this.timeout(2000)
  it('TEST', function (done) {
    exec('background: #f23; color: #fff;', '修改: ', rPromise)
    exec('background: #000; color: #fff;', '原生: ', Promise, done)
  })
});
