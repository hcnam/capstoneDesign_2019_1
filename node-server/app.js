var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var movieDAO = require('./models/dao/movieDAO');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

app.use(cookieParser())
app.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365	// 쿠키 유효기간 1년
	},
}));

app.use(function(req, res, next){
  if(req.session.user){
    // 로그인을 했을때
    res.locals.user = req.session.user
    return next();
  }else{
    // 로그인을 안 했을때
    res.locals.user = ''
    return next();
  }
})

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  movieDAO.getMovieList(function(err, mvlists){
    res.render('index', {mvlist : mvlists})
  })
});

// test pages
var test = require('./router/test')
app.use('/test', test)

var test = require('./router/detail')
app.use('/detail', test)

var user = require('./router/user')
app.use('/user', user)

// error 처리...
// err 파라미터가 있으면 다른 미들웨어는 건너 뛰고 바로 이 미들웨어로 온다.
app.use(function (err, req, res, next) {
	console.error(err);
	res.end("<h1>ERROR!</h1>")
});

app.listen(3000, function () {
  console.log('3000번 포트 구동중..');
});

