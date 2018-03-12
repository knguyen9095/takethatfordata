const admin = require('firebase-admin');
const path = require('path');
const cert = require('./db-credentials.json');
var algoliasearch = require('algoliasearch');
var client = algoliasearch('CPXKNGPIA3','5c48ad9a063387024679616778114894');
var index = client.initIndex('team_players')

index.setSettings({
  searchableAttributes: [
  'name',
  'location',
  'unordered(school)']
})

admin.initializeApp({
  credential: admin.credential.cert(cert),
  databaseURL: `https://${cert.project_id}.firebaseio.com`,
});

const db = admin.database();
var ref = db.ref("/test");

/*
//set data in firebase 
ref.set({
  test1: {
    test2: "data"
	}
});*/
//read data from firebase 
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
  }, function (error) {
    console.log("Error: " + error.code);
});


var express = require('express');
var app = express();
var port = 8080;
app.use(express.static(path.join(__dirname, 'public')))

// start the server
var server = app.listen(port, function() {
  console.log('app started');
  var host = server.address().address
  var port = server.address().port
   
  console.log("Example app listening at http://%s:%s", host, port)
});


// route our app
/*
app.get('/', function(req, res) {
  res.send('hello world! testing?');
});
*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/about.html'));
});

app.get('/create_account', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
});

app.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/signin.html'));
});

app.get('/reset', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/reset.html'));
});

app.get('/create_team', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/create.html'));
});

app.get('/create_players', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/addplayers.html'));
});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

app.get('/input', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/add.html'));
});

app.get('/view', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/view.html'));
});
app.get('/newseason', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/newseason.html'));
});

app.get('/newgame', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/newgame.html'));
});

app.get('/games', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/games.html'));
});

app.get('/editgame', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/editgame.html'));
});


app.get('/stats', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/playerstat.html'));
});

app.get('/viewstats', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/viewstats.html'));
});

app.get('/search', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/search.html'));
});


