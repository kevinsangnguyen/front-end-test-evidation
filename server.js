var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, './client')));

// require('./server/config/routes.js')(app);

app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});
