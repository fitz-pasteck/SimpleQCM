let form = document.querySelector('form')
let nameInput = document.querySelector('input[name="name"]')
let socket = io.connect('http://localhost:3000')

form.addEventListener('submit', _ => {
  socket.emit('add_user', nameInput.value)
})
