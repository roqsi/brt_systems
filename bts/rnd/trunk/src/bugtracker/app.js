
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/bugs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.buglist(db));
app.get('/buglist', routes.buglist(db));
app.get('/newbug', routes.newbug);
app.post('/addbug', routes.addbug(db));
app.get('/:id/editbug', routes.editbug(db));
app.get('/:id/delete', routes.deletebug(db));
app.post('/:id/edit', routes.edit(db));
app.post('/getJiraTemplate', routes.getJiraTemplate);
app.post('/getDevTrackTemplate', routes.getDevTrackTemplate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
