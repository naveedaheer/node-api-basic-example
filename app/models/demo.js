var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 8080;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'Hello World! this is testing message' });
});

app.use('/api', router);

app.listen(port);
console.log('Server is running on port : ' + port);