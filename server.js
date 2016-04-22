// Author : Jonny Hofmann (i_like__bananas)

// Includes Modules
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var five = require("johnny-five");
var config = require("./config.json");

app.listen(config.webPort);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on("connection", (socket) => {
    socket.emit("relayInfo", {"open" : relayOpen});
    socket.on("closeRealay", () => {
        relay.close();
        relayOpen = false;
        socket.emit("relayInfo", {"open" : relayOpen});
    });
    socket.on("openRelay", () => {
        relay.open();
        relayOpen = true;
        socket.emit("relayInfo", {"open" : relayOpen});
    })
})

// Johnny five
var relayOpen = true;
var board = new five.Board({
    port: "COM4"
});
var relay;
board.on("ready", () => {
    relay = new five.Relay(10);
    console.log("board ready");
});
