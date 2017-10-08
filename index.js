var express = require('express');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.listen(3000, function() {
    console.log('Server started');
});

var array = ["Android", "iOS", "Linux"];

app.get('/', function(req, res){
    res.render('home');
})

app.get('/getNotes', function(req, res){
    res.send(array);
});

app.post('/add', parser, function(req, res){
    var newNote = req.body.note;
    array.push(newNote);
    res.send(array);
});

app.post('/deleteNote', parser, function(req, res){
    var id = req.body.idDelete;
    array.splice(id, 1);
    res.send(array);
});

app.post('/update', parser, function(req, res){
    var id = req.body.idUpdate;
    array[id] = req.body.contentUpdate;
    res.send(array);
});