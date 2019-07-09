var con = require('../connection');

var movieDAO = {
    getMovieData : (param, callback) => {
        var sql = 'select * from movieshow where No = ?'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    getkeywordCons : (param, callback) => {
        var sql = 'select * from keyword where Movie = ? and evaluation = 0 order by Count DESC limit 20'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    getkeywordPros : (param, callback) => {
        var sql = 'select * from keyword where Movie = ? and evaluation = 1 order by Count DESC limit 20'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    getComment :  (param, callback) => {
        var sql = 'select * from Comment where Movie = ?'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },    

    getMovieList : (callback) => {
        var sql = 'select * from Movie'
        con.query(sql,function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },
    getPosCount : (param, callback) => {
        var sql = 'select count(No) as cnt from Comment where evaluation = 1 and Movie = ?'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },    
    getNegCount : (param, callback) => {
        var sql = 'select count(No) as cnt from Comment where evaluation = 0 and Movie = ?'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },    
}

module.exports = movieDAO;