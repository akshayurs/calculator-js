const numberEles = document.querySelectorAll('.number')
const operationEles = document.querySelectorAll('.operation')
const clearEle = document.querySelector('[data-clear]')
const cancelEle = document.querySelector('[data-cancel]')
const equalsEle = document.querySelector('[data-equals]')
const decimalEle = document.querySelector('[data-decimal]')
const display1Ele = document.querySelector('.display1')
const display2Ele = document.querySelector('.display2')

var result = null
var firstNum = ''
var secondNum = ''
var lastoperation = ''
var haveDecimal = false
var toclear = false

numberEles.forEach((ele) => {
  ele.addEventListener('click', (e) => {
    if (toclear) {
      cleardisplay()
      toclear = false
    }
    navigator.vibrate(20)
    let num = e.target.innerHTML
    if (haveDecimal && num == '.') return
    if (!haveDecimal && num == '.') haveDecimal = true
    secondNum += num
    display2Ele.innerHTML = secondNum
  })
})

operationEles.forEach((ele) => {
  ele.addEventListener('click', (e) => {
    if (!secondNum && e.target.innerHTML == '-') {
      secondNum = '-'
      display2Ele.innerHTML = '-'
      navigator.vibrate(20)
      return
    }
    // if (!secondNum) return
    navigator.vibrate(20)
    haveDecimal = false
    result = secondNum
    display2Ele.innerHTML = result
    cleardisplay2(e.target.innerHTML)
  })
})

function cleardisplay2(operation = '') {
  firstNum += secondNum + ' ' + operation + ' '
  display1Ele.innerHTML = firstNum
  display2Ele.innerHTML = ''
  secondNum = ''
}

function cancel() {
  if (toclear) {
    cleardisplay()
    return
  }
  navigator.vibrate(20)
  if (secondNum != '') {
    secondNum = secondNum.slice(0, -1)
    display2Ele.innerHTML = secondNum
  } else {
    firstNum = firstNum.slice(0, -2)
    display1Ele.innerHTML = firstNum
  }
}
cancelEle.addEventListener('click', cancel)

equalsEle.addEventListener('click', (e) => {
  navigator.vibrate(20)
  console.log(eval('firstNum'))
  toclear = true
  cleardisplay2()
  let temp
  console.log({ firstNum, secondNum, result })
  try {
    temp = firstNum
      .replaceAll('Π', Math.PI)
      .replaceAll('x', '*')
      .replaceAll('^', '**')
    temp = temp.trim().replace(/[+/%*x(]$/g, '')
    display2Ele.innerHTML = '=' + eval(temp)
  } catch {
    cleardisplay()
    display2Ele.innerHTML = 'Syntax Error !'
  }

  firstNum = temp
})

function cleardisplay() {
  navigator.vibrate(20)
  display2Ele.innerHTML = '0'
  display1Ele.innerHTML = ''
  result = null
  secondNum = ''
  firstNum = ''
}
clearEle.addEventListener('click', cleardisplay)
