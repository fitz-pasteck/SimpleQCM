// Import de modules
const parser = require('body-parser')
const express = require('express')
const fs = require('fs')
const http = require('http')
const multer = require('multer')
const path = require('path')
const socketIO = require('socket.io')

const utils = require('./static/js/utils')

// Coeur de l'application
let app = express()
let server = http.createServer(app)
let io = socketIO.listen(server)

// Configuration de l'application
app.use(parser.urlencoded())
app.use(parser.json())

// Route static
app.use('/static', express.static(path.join(__dirname, 'static')))

// Définition du moteur de yemplate
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

let upload = multer({dest: path.join(__dirname, 'tmp_uploads')})

// Variables de serveur
server.users = []

// Routes
app.route('/')
.get((req, res) => {
  let pathFile = path.join(__dirname, 'questionnaire', 'qcm.json')
  if (!fs.existsSync(pathFile)) {
    res.render('index', {title: 'Accueil', error: 'no-file'})
  }
  res.render('index', {title: 'Accueil'})
})
.post((req, res) => {
  res.redirect('/play')
})

app.route('/play')
.get((req, res) => {
  let pathFile = path.join(__dirname, 'questionnaire', 'qcm.json')
  if (fs.existsSync(pathFile)) {
    let qcm = JSON.parse(fs.readFileSync(pathFile, 'UTF-8'))
    let rand = utils.randomInt(0, qcm.length)
    res.render('play', {title: 'Questionnaire', question: qcm[rand], questionId: rand})
  } else {
    res.redirect('/')
  }
})
.post((req, res) => {
  res.redirect('/play')
})

app.get('/upload', (req, res) => {
  let qcm = []
  let pathFile = path.join(__dirname, 'questionnaire', 'qcm.json')
  if (fs.existsSync(pathFile)) {
    qcm = JSON.parse(fs.readFileSync(pathFile, 'UTF-8'))
  }
  res.render('upload', {title: 'Dépot de questionnaire', qcm: qcm})
})
app.post('/upload', upload.single('questionnaire'), (req, res) => {
  if (req.file) {
    let arrayFile = req.file.originalname.split('.')
    let extension = arrayFile[arrayFile.length - 1].toLowerCase()
    if (extension === 'json') {
      let newPath = path.join(__dirname, 'questionnaire', 'qcm.json')
      let tmpQcm = fs.readFileSync(req.file.path, 'UTF-8')
      fs.unlinkSync(req.file.path)
      fs.writeFileSync(newPath, tmpQcm)
    }
  }
})

server.listen(3000)

// Utilisation du socket
io.sockets.on('connection', socket => {
  socket.on('add_user', user => {
    if (!server.users.includes(user)) server.users.push(user)
    console.log(server.users)
    console.log(`L'étudiant ${user} s'est connecté.`)
  })

  socket.on('submit_question', question => {
  })
})
