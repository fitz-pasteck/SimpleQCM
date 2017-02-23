import * as http from 'http'

let app = http.createServer((req, res) => {
  let tab = [1, 2, 3, 4]

  tab.forEach(e => {
    console.log(e, ...tab)
  })

  res.end('Hey!')
})

app.listen(3000)
