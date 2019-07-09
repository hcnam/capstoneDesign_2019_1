var express = require('express')
var router = express.Router()

var userDAO = require('../models/dao/movieDAO');

router.get('/', function(req, res, next){
    userDAO.userList(function(err, result){
        if(err) return next(err)
        console.log(result)
    })
})

router.post('/login', function(req, res){
    userDAO.userSelectOne(req.body.id, function(err, result){
        if(err) return next(err)
        if(!result || result.pw !== req.body.pw){
            res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
            res.end(`<script>
                        alert("존재하지 않는 계정입니다.")
                        location.href = '/user/login'
                    </script>`)
        }else{
            // 로그인 성공시
            req.session.user = result
            res.redirect('/')
        }
    })
})

router.get("/detail", function (req, res, next) {
    userDAO.userDetail(req.query.no, (err, result) => {
        if(err) return next(err)
        res.render('userDetail', {userDetail : result})
    })
});

router.post("/signup", function (req, res, next) {
    var param = []
    for(var key in req.body){
        param.push(req.body[key])
    }
    userDAO.userAdd(param, function(err, result){
        if(err) return next(err)
        res.redirect('/user/login')
    })
});

module.exports = router