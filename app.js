var express = require('express');
var app = express();
var useragent = require('useragent');

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
  var agent = useragent.parse(req.headers['user-agent']);
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  res.json({
    ip: ip,
    lang: req.headers['accept-language'].split(',')[0],
    os: agent.os.family
  });
});
