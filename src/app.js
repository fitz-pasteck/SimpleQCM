// Import de modules
import * as parser from 'body-parser'
import * as express from 'express'
import * as http from 'http'
import { join } from 'path'
import * as io from 'socket.io'

// Coeur de l'application
let app = express()
let server = http.createServer(app)
let io = io.listen(server)

// Configuration de l'application
app.set('view engine', 'pug')
app.use(parser.urlencoded())
app.use(parser.json())
app.use('/static', express.static(join(__dirname, '/static')))

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
})

app.route('/upload')
.get((req, res) => {
  res.render('upload', {title: 'Dépot de questionnaire'})
})
.post((req, res) => {
})

app.listen(3000)

// Utilisation du socket
io.sockets.on('connection', (socket) => {
})
