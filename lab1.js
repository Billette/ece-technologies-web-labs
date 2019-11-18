const http = require('http');
const url = require('url');
const qs = require('querystring');

const serverHandle = function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname 
    const params = qs.parse(route.query)
  

    if(path === '/'){

        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('You should put in your URL the "/hello?name=" and your name')

    } else if (path === '/hello' && 'name' in params) {

        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('Hello ' + params['name'] + '\n')

        if(params.name === 'Maxime') {
            res.write('Maxime is a awesome guy !');
        }

    } else {

        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Error 404')
    }

    res.end();
}

// Pour voir les params : http://localhost:8080/coucou?name=maxime&id=20032

const server = http.createServer(serverHandle);
server.listen(8080);