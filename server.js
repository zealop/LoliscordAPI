"use strict";
exports.__esModule = true;
var PORT = process.env.PORT || 8000;
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);

var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
    transports: ['websocket'],
    allowUpgrades: false
});

server.listen(PORT, null, function () {
    console.log("Listening on port " + PORT);
});
app.get("/", function (req, res, next) {
    res.send("Loliscord API is working");
});

/**
 * Users will connect to the signaling server, after which they'll issue a "join"
 * to join a particular channel. The signaling server keeps track of all sockets
 * who are in a channel, and on join will send out 'addPeer' events to each pair
 * of users in a channel. When clients receive the 'addPeer' even they'll begin
 * setting up an RTCPeerConnection with one another. During this process they'll
 * need to relay ICECandidate information to one another, as well as SessionDescription
 * information. After all of that happens, they'll finally be able to complete
 * the peer connection and will be streaming audio/video between eachother.
 */
io.on('connection', (socket) => {
    console.log("[" + socket.id + "] connection accepted");
    socket.on('disconnect', () => {
        console.log("[" + socket.id + "] disconnected");
        io.emit('removePeer', socket.id);
    });
    //Get all socketIDclea
    const peers = [];
    io.sockets.adapter.rooms.forEach( (v, k) => {
        peers.push(k);
    });
    
    if(peers.length > 1) {
        //new comer is impolite
        io.to(socket.id).emit('newPeer', peers, false);
        socket.broadcast.emit('newPeer', peers, true);
    }

    socket.on('relaySDP', (sender, receiver, desc) => {
        console.log(`[${sender}] relaying SDP to [${receiver}]`);
        io.to(receiver).emit('SDP', sender, desc);
    });

    socket.on('relayICE', (sender, receiver, candidate) => {
        console.log(`[${sender}] relaying ICE description to [${receiver}]`); 
        io.to(receiver).emit('ICE', sender, candidate);
    });
    
});

