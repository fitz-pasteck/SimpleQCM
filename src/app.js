// Import de modules
const parser = require('body-parser')
const express = require('express')
const fs = require('fs')
const http = require('http')
const multer = require('multer')
const path = require('path')
const socketIO = require('socket.io')

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
  res.render('index', {title: 'Accueil'})
})
.post((req, res) => {
})

app.route('/play')
.get((req, res) => {
  res.render('play', {title: 'Questionnaire'})
})
.post((req, res) => {
  let user = req.body.name
  res.redirect('/play')
})

app.get('/upload', (req, res) => {
  res.render('upload', {title: 'Dépot de questionnaire'})
})
app.post('/upload', upload.single('questionnaire'), (req, res) => {
  // Magic byte: magic.detectFile(pathToFile)
  if (req.file) {
    let arrayFile = req.file.originalname.split('.')
    let extension = arrayFile[arrayFile.length - 1].toLowerCase()

    if (extension === 'json') {
      let newPath = path.join(__dirname, 'questionnaire', req.file.originalname)
      fs.readFile(req.file.path, (err, data) => {
        if (err) throw err
        // Si le fichier a déjà été créé avant on le supprime
        if (fs.existsSync(newPath)) {
          fs.unlinkSync(newPath)
        }
        // On écrit le nouveau QCM
        fs.writeFileSync(newPath, data)
      }, 'utf-8')
    }
    // On supprime le fichier temporaire
    fs.unlinkSync(req.file.path)
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
})
