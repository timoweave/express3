var express = require('express');
var http = require('http');
var path = require('path');
var body_parser = require('body-parser');

var app = express();
// var server = http.createServer(app);

app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, "/public")));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

var epic_button_count = -1;

app.get('/', function(request, response){
    response.render('index', { epic_button_count: epic_button_count});
});

var server = app.listen(6789, function(){
    console.log('listening on port 6789')
});

var socket_server = require('socket.io');

var io = require('socket.io')(server);

console.log('attempt to use sockets');

io.sockets.on('connection', function(socket) {

    console.log(socket);
    console.log('we are using sockets!');

    socket.on("increase_epic_button", function(data) {
        console.log("got increase_epic_button");

        epic_button_count = epic_button_count + 1;
        var data = {epic_button_count: epic_button_count};
        socket.broadcast.emit("update_epic_button", data);
        socket.emit("update_epic_button", data);
    });

    socket.on("reset_epic_button", function(data) {
        console.log("got reset_epic_button");

        epic_button_count = 0;
        var data = {epic_button_count: epic_button_count};
        socket.broadcast.emit("update_epic_button", data);
        socket.emit("update_epic_button", data);
    });
});

