// Author : Jonny Hofmann (i_like__bananas)

// Includes Modules
var express = require("express");
var app = express();
var server = require("http").Server(app);
var socket = require("socket.io")(server);
var fs = require("fs");
var path = require("path");
var five = require("johnny-five");

var config;

// Read the config file and start the server
fs.readFile("config.json", "utf8", (err, data) => {
    if(err){
        console.log("Config file read error");
    } else {
        if (data["port"]){
            console.log("Port not defined in config file");
        } else {
        data = JSON.parse(data);
        server.listen(data["webPort"]);
        console.log("Server started on port %d", data["webPort"]);

    }
    }
});

// express routes
app.get("/on", (req, res) => {
    res.send("relay on");
    relay.open();
    console.log("relay on");

});
app.get("/off", (req, res) => {
    res.send("relay off");
    relay.close();
    console.log("relay stoped");
})

// Johnny five
var board = new five.Board({
    port: "COM4"
});
var relay;
board.on("ready", () => {
    relay = new five.Relay(10);
    console.log("board ready");
});
