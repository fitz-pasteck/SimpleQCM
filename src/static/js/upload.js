let form = document.querySelector('form')
let fileInput = document.querySelector('#file')
let renderQcm = document.querySelector('#qcm')

let readQcm = _ => {
  let fileName = fileInput.files[0].name.split('.')
  let extension = fileName[fileName.length - 1]
  if (fileInput.files.length && extension === 'json') {
    let reader = new FileReader()

    reader.onload = (e) => {
      let jsonQcm = JSON.parse(e.target.result)
      for (let question of jsonQcm) {
        // On crée un conteneur pour une question
        let articleQuestion = document.createElement('article')
        let attQuestion = document.createAttribute('id')
        attQuestion.value = `Question-${jsonQcm.indexOf(question) + 1}`
        articleQuestion.setAttributeNode(attQuestion)

        // On crée un conteneur pour afficher la question
        let questionText = document.createElement('h2')
        let attQText = document.createAttribute('class')
        attQText.value = 'question-text'
        questionText.setAttributeNode(attQText)
        questionText.innerHTML = question.question
        articleQuestion.appendChild(questionText)

        // On crée une div pour afficher le temps d'une question
        let divTime = document.createElement('div')
        let attTime = document.createAttribute('class')
        attTime.value = 'time'
        divTime.setAttributeNode(attTime)
        divTime.innerHTML = `${question.time} secondes`
        articleQuestion.appendChild(divTime)

        switch (question.type) {
          case 'choice':
            let ulRes = document.createElement('ul')
            let attUl = document.createAttribute('class')
            attUl.value = 'ul-response'
            ulRes.setAttributeNode(attUl)
            ulRes.innerHTML = 'Réponses : '
            for (let response of question.choices) {
              let liRes = document.createElement('li')
              let attli = document.createAttribute('class')
              attli.value = 'list-response'
              liRes.setAttributeNode(attli)
              if (question.responses.includes(response)) {
                liRes.innerHTML = `<b>${response}</b>`
              } else {
                liRes.innerHTML = response
              }
              ulRes.appendChild(liRes)
            }
            articleQuestion.appendChild(ulRes)
            break
          case 'free':
            let pRes = document.createElement('p')
            let attPRes = document.createAttribute('class')
            attPRes.value = 'free-response'
            pRes.setAttributeNode(attPRes)
            pRes.innerHTML = `Réponse(s) possible(s) : ${question.responses.join(', ')}`
            articleQuestion.appendChild(pRes)
            break
          default:
            break
        }

        // On ajoute les éléments créés juste au dessus au DOM
        renderQcm.appendChild(articleQuestion)
      }
    }
    reader.readAsBinaryString(fileInput.files[0])
  } else {
    renderQcm.innerHTML = 'Le fichier doit être un fichier json.'
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
  // On supprime les élément déjà créés dans le DOM au cas où on re-upload un qcm
  while (renderQcm.firstChild) {
    renderQcm.removeChild(renderQcm.firstChild)
  }
  sendData('/upload', {'questionnaire': fileInput.files[0]})
  readQcm()
})
