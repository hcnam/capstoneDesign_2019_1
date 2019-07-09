var express = require('express')
var router = express.Router()
var path = require('path')
var io = require('socket.io-client')
var movieDAO = require('../models/dao/movieDAO');

router.use(express.static('public'))

router.get("/:movieNo", function(req, res, next){
    movieDAO.getMovieData(req.params.movieNo,function(err, movieData) {
        //console.log(err)
        //console.log(movieData)
        var params = {
            No : movieData[0].No,
            name : movieData[0].name,
            poster : movieData[0].poster,
            stealScene: movieData[0].stealScene,
            genre : movieData[0].genre,
            releaseDate : movieData[0].releasedate,
            country : movieData[0].country,
            runTime : movieData[0].runtime,
            director : movieData[0].director,
            actor : movieData[0].actor,
            story1 : movieData[0].story1,
            important : movieData[0].important,
            story2 : movieData[0].story2
        }
        movieDAO.getkeywordCons(req.params.movieNo,function(err, keywordCons) {
            //console.log(keywordCons)
            movieDAO.getkeywordPros(req.params.movieNo,function(err, keywordPros) {
                //console.log(keywordPros)
                movieDAO.getComment(req.params.movieNo, function(err, comments){
                    //console.log(comments)
                    movieDAO.getPosCount(req.params.movieNo, function(err, posCount){
                        movieDAO.getNegCount(req.params.movieNo, function(err, negCount){
                            count = {
                                cnt_pos : posCount[0].cnt,
                                cnt_neg : negCount[0].cnt
                            }
                            movieDAO.getMovieList(function(err, mvlists){
                                res.render('detail', {movieInfo : params,
                                        kwdCons : keywordCons,
                                        kwdPros : keywordPros,
                                        comment : comments,
                                        cnt : count,
                                        list : mvlists
                                        })
                            }) 
                        })
                    })
                })
            })
        })

    })
})

router.post("/:movieNo/sent", function (req, res, next) {
    var socket = io.connect("http://192.168.0.21:4000")
    //var socket = io.connect("http://192.168.55.130:4000")
    //var socket = io.connect("http://localhost:4000")
    socket.emit("msg",{comment:req.body.comment,
                        mvno: req.params.movieNo,
                        ID : req.body.ID,
                        pw : req.body.pw})
    console.log('send data to back server : '+req.body.comment);
    redirection = '/detail/' + req.params.movieNo
    res.redirect(redirection)
});


module.exports = router