var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exec = require('child_process').exec;
var keywordDAO = require('./models/dao/keywordDAO');

http.listen(4000, function () {
  console.log('port 4000 is active now!');
});

io.on('connection', function (socket) {
  var instanceId = socket.id;
  socket.on('msg', function (data) {
    console.log('\n'+instanceId+'\'s requiest : ' + data.comment+'\n');
    var commentForAnalysis = data.comment.replaceAll(' ','_').replaceAll('\n','_').replaceAll('\t','_')
    //var pattern = /<tag>(.*?)<\/tag>/g
    child = exec("python3 ./scripts/sementic.py "+ commentForAnalysis, function (error, sementic_result, stderr) {
      console.log('sementic score: ' + sementic_result);
      //console.log('sementic analysis err : ' + stderr);
      var score = sementic_result *1;
      var evaluation
            if(score > 0.5){
              evaluation = true;
            }else{
              evaluation = false;
            }
      if (error !== null) {
          console.log('exec error: ' + error);
      }
      child = exec("python3 ./scripts/analysis1.py "+ commentForAnalysis, function (error, konlp_result, stderr) {
        var konlp_data = konlp_result.split('\n')
        console.log("KoNLP: "+konlp_data)
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        child = exec("python3 ./scripts/analysis2.py "+ commentForAnalysis, function (error, khaiii_result, stderr) {
          var khaiii_data = khaiii_result.split('\n')
          console.log("khaiii: "+khaiii_data)
          if (error !== null) {
              console.log('exec error: ' + error);
          }          
          var result_arr = sumkeyword(konlp_data,khaiii_data);  
          console.log(result_arr)

          result_arr.forEach(element => {
            parameters = [element, data.mvno, evaluation, element, data.mvno, evaluation]
            keywordDAO.insertKeyword(parameters, function(err, result){
              //console.log(err)
              params = [data.ID, data.pw, data.mvno, evaluation, data.comment]
              console.log(element + 'inserted/updated to DB')
            });
          });
          params = [data.ID, data.pw, data.mvno, data.comment]
          keywordDAO.insertComment(params, function(){
            console.log(data.comment+'inserted to comment Table in DB')
          });
        });
      });
    }); 
  })
});

String.prototype.replaceAll = function(org, dest) {
  return this.split(org).join(dest);
}

var sumkeyword = function (data1, data2){
  var result = [];
  data2.forEach(function (item, index, array) {
    if(item!=''){
      if(item!='영화'){
        result.push(item)
      }
    }
  });
  data1.forEach(function (item, index, array) {
    var dup = 0;
    if(item!=''){
      if(item!='영화'){
        result.forEach(element => {
          if(item == element){
            dup = 1
          }
        });
        if(dup == 0){
          result.push(item)
        }
      }
    }
  });
  return result;
}