// Import de modules
const parser = require('body-parser')
const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

// Coeur de l'application
let app = express()
let server = http.createServer(app)
let io = socketIO.listen(server)

// Configuration de l'application
app.use(parser.urlencoded())
app.use(parser.json())
app.use('/static', express.static(path.join(__dirname, '/static')))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

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

app.route('/upload')
.get((req, res) => {
  res.render('upload', {title: 'Dépot de questionnaire'})
})
.post((req, res) => {
})

server.listen(3000)

// Utilisation du socket
io.sockets.on('connection', (socket) => {
  socket.on('add_user', user => {
    if (!server.users.includes(user)) server.users.push(user)
    console.log(server.users)
    console.log(`L'étudiant ${user} s'est connecté.`)
  })
})
