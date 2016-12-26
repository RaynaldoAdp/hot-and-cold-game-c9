var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var server = http.Server(app);

app.use(bodyParser.json());

app.use(express.static('build'));


MongoClient.connect('mongodb://localhost/', function(err, db) {
    if (err) {
        console.error(err);
        db.close();
        return;
    }
    console.log('Connected to MongoDB database');
    
    var collection = db.collection('Item');
    
    app.get('/items', function(req,res) {
        collection.findOne({$query:{},$orderby:{number: 1}}, function(err, items){
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.json(items);
        });
    });
    
    app.post('/items', function(req, res) {
        collection.insert(req.body, function(err, item){
            if(err){
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });
    });
    
});


server.listen(process.env.PORT || 8080);