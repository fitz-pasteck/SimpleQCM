let socket = io.connect('http://localhost:3000')
let form = document.querySelector('form')
let questionH3 = document.querySelector('h3')
let responseInput = document.querySelector('input[name=response]')
let allDivTimer = document.querySelectorAll('.timer')

let counter = (element, index, speed) => {
  let timer = 0
  this.doCount = doCount()

  function doCount () {
    if (index <= 0) {
      clearTimeout(timer)
      element.innerHTML = '<b>Le temps est écoulé.</b>'
    } else {
      element.innerHTML = `Il vous reste <b>${index}</b> secondes.`
      index--
      setTimeout(doCount, 1000)
    }
  }
}

window.onload = function () {
  for (let divTimer of allDivTimer) {
    let time = Number(divTimer.dataset.time)
    counter(divTimer, time)
  }
}

form.addEventListener('submit', _ => {
  let question = questionH3.innerText
  let response = responseInput.value
  if (responseInput.getAttribute('type') === 'radio') {
    response = responseInput.dataset.value
  }
  let questionObj = {'question': question, 'response': response}
  socket.emit('submit_question', questionObj)
})
