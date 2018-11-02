var express = require('express');
var app = express();
const http = require('http');
const serv = http.Server(app);
const io = require('socket.io')(serv, {});
const { exec } = require('child_process');
let {PythonShell} = require('python-shell')
let options = {mode: 'binary', args: [], pythonOptions: ['-u'], pythonPath: "D:/Programming/Python/PythonFile/python.exe"}
app.use(express.static('public'));

app.get('/', function(request, response) {
  console.log(`Pinged ${Date()}`)
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/authorise', function(req, res) {
  options.args[0] = req.query.name
  let pyshell = new PythonShell('python/authorisation.py', options);

  pyshell.stdout.on('data', function (message) {
    return res.sendFile(__dirname + '/views/authorised.html');
  });
  pyshell.end(function (err,code,signal) {
    res.sendFile(__dirname + '/views/unauthorised.html');
  });

})
app.use('/', express.static(__dirname + '/views'));
app.use('/files', express.static(__dirname + '/files'));
let db = require('./database/db.json')


io.on('connection', (socket) => {

  socket.on('newsong', function(data) {
      let keys = Object.keys(db["nasheeds"]);
      let vals = Object.values(db["nasheeds"]);
      let index = Math.floor(Math.random()*keys.length);
      socket.emit('newone', keys[index], vals[index]);


  })

socket.on('something', data=> {})
})

serv.listen(3000, function(){
    console.log('listening on *:3000');
  });