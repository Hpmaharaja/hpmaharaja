var express  = require('express'),
    app      = express(),
    mongoose = require('mongoose'),
    path     = require('path');
var port = process.env.VCAP_APP_PORT || 3000;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Connect Mongo db (hp blog)
mongoose.connect('mongodb://localhost/hpblog');

// Middleware
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Database models
var User = mongoose.model('User', new Schema({
	id: ObjectId,
	name: String,
	email: {type: String, unique: true},
	password: String
	}));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/blog', function(req, res) {
  res.render('blog');
});

app.listen(port, function(req, res) {
  console.log('Server is up and running!');
});
