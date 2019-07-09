var con = require('../connecton');

var keywordDAO = {
    test : (param, callback) => {
        var sql = 'select * from movieshow where No = ?'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },
    insertKeyword : (param, callback) => {
        var sql = `insert into keyword(Keyword, Count, Movie, evaluation)
                   values (?, 1, ?, ?)
                   on duplicate key update
                   keyword = ?, Count = Count+1, Movie = ?, evaluation = ?`
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },
    insertComment : (param, callback) => {
        var sql = `insert into Comment(ID, pw, Movie, evaluation, Comment)
                   values (?,?,?,?,?)`
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    }, 
}

module.exports = keywordDAO;