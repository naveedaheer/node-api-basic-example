// mongoose.connect('mongodb://naveedaheer:123456@ds129723.mlab.com:29723/db_naveedaheer')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.port || 5000;
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db_aheerdoctor');


var Patient = require('./app/models/patient');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log("requesting something using router");
    next();
})

router.get('/', function (req, res) {
    res.json({ message: 'Hello World! welcome to aheer API, naveedaheer.com' });
});

router.route('/patients')
.post(function (req, res) {
    var patient = new Patient();
    patient.name = req.body.name;
    patient.age = req.body.age

    patient.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'Patient Added Successfully'});
    });
})
.get(function(req, res){
    Patient.find(function(err, patients){
        if(err){
            res.send(err)
        }
        res.json(patients);
    });
});

router.route('/patients/:patientId')
.get(function(req, res){
    Patient.findById(req.params.patientId, function(err, patient){
        if(err){
            res.send(err);
        }
        res.json(patient);
    });
});

app.use('/api', router);
app.listen(port);
console.log('Server is running on port : ' + port);