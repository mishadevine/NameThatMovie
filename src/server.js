var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();


app.get('*', function(req, res, next) {
 if(path.extname(req.path).length > 0) {
   next()
 }
  else {
    req.url = '/index.html'
    next()
  }
})

app.use(express.static('public'))


var server = app.listen(process.env.PORT || 9000, function(){
  console.log('Magic is happening on PORT: ', server.address().port);
})
