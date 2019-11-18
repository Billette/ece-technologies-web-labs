// Pour voir les params : http://localhost:8080/coucou?name=maxime&id=20032

const http = require('http');
const handles =  require('./handles');

const server = http.createServer(handles.serverHandle);
server.listen(8080);