express = require('express')
app = express()
path = require('path')
metrics = require('./metrics')

app.set('port', 1337)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/metrics.json', (req, res) => {
    metrics.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
})

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

app.get(
    '/hello/:name', 
    (req, res) => res.render('hello.ejs', {name: req.params.name})
  )

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)