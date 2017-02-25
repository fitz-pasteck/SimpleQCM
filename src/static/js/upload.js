let form = document.querySelector('form')
let fileInput = document.querySelector('#file')
let renderQcm = document.querySelector('#qcm')

let qcmData = []

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

let displayQuestionnaire = fileName => {
  let fileFolder = fileName.split('.')[0]

  let headers = new Headers()
  headers.append('Content-Type', 'application/json')

  fetch(`/questionnaire/${fileFolder}`, {
    method: 'GET',
    headers: headers
  })
  .then(res => res.json())
  .then(res => {
    qcmData = res
  })

  if (qcmData[0]) {
    for (let question of qcmData) {
      let test = question
    }
  }
}

form.addEventListener('submit', e => {
  e.preventDefault()
  sendData('/upload', {'questionnaire': fileInput.files[0]})
  displayQuestionnaire(fileInput.files[0].name)
})
