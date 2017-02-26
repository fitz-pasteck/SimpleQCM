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
