let form = document.querySelector('form')
let fileInput = document.querySelector('#file')
let renderQcm = document.querySelector('#qcm')

let qcmData = []

let readQcm = _ => {
  if (fileInput.files.length) {
    let reader = new FileReader()
    reader.onload = (e) => {
      renderQcm.innerHTML = e.target.result
    }
    reader.readAsBinaryString(fileInput.files[0])
  }
}

let sendData = (url, data) => {
  var formData = new FormData()

  for (let name in data) {
    formData.append(name, data[name])
  }

  fetch(url, {
    method: 'POST',
    body: formData
  })
}

form.addEventListener('submit', e => {
  e.preventDefault()
  sendData('/upload', {'questionnaire': fileInput.files[0]})
  readQcm()
})
