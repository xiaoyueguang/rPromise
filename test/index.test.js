import Promise from '../src/index.js'
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
});

