var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		meetupController = require('./server/controllers/meetupController');

mongoose.connect('mongodb://localhost:27017/mean-demo');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});

//REST API
app.get('/api/meetups', meetupController.list);
app.post('/api/meetups', meetupController.create);

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/static', express.static(__dirname + '/static'));

app.listen(1515, function() {
	console.log('I\'m listening');
});