let form = document.querySelector('form')
let fileInput = document.querySelector('#file')

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

let getQuestionnaire = name => {

}

form.addEventListener('submit', e => {
  e.preventDefault()
  sendData('/upload', {'questionnaire': fileInput.files[0]})
})
