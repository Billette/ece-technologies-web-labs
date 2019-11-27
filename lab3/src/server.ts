import express = require('express')
import bodyparser = require('body-parser')
import { MetricsHandler } from './metrics'

const app = express()
const port: string = process.env.PORT || '8080'

import path = require('path')
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.render('./partials/description.ejs')
})

app.get(
    '/hello/:name', 
    (req : any, res: any) => {
        res.render('hello.ejs', {name: req.params.name})
})

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send('ok')
  })
})

app.get('/metrics/', (req:any, res:any) => {
  dbMet.getAll( (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})

app.get('/metrics/:id', (req:any, res:any) => {
  dbMet.getOne(req.params.id, (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})

app.delete('/metrics/:id', (req:any, res:any) => {
  dbMet.deleteOne(req.params.id, (err: Error | null, result:any) => {
    if (err) throw err
    res.status(201).json(result)
  })
})


app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})




/*
app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})
*/