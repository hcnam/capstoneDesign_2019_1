var express = require('express')
var router = express.Router()
var path = require('path')
var io = require('socket.io-client')

var server_count = 1


router.get("/", function(req, res, next){
    res.render('test')
})

router.post("/sent", function (req, res, next) {
    //var socket = io.connect("http://192.168.55.130:4000")
    var socket = io.connect("http://localhost:4000")
    socket.emit("msg",{comment:req.body.comment,
                        id: 1})
    console.log('send data to back server : '+req.body.comment);
    res.render('test')
});


module.exports = router