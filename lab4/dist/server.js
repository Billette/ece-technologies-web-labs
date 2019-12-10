"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyparser = require("body-parser");
var metrics_1 = require("./metrics");
var app = express();
var port = process.env.PORT || '8081';
var path = require("path");
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('./partials/description.ejs');
});
app.get('/hello/:name', function (req, res) {
    res.render('hello.ejs', { name: req.params.name });
});
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send('ok');
    });
});
app.get('/metrics/all', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err)
            throw err;
        res.status(201).json(result);
    });
});
app.get('/metrics/:id', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err)
            throw err;
        res.status(201).json(result);
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
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
