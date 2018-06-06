const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session')
const Assessments = require('./server/dbModels')
const mongoose = require('mongoose')
const fs = require('fs');
const util = require('util')
const testRunner = require('./server/mocha/finalRunner')
const writeFileAsync = util.promisify(fs.writeFile)

require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(session({
    name: 'Assessment-proj',
    secret: process.env.SESSION_SECRET, 
    cookie: {
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}))

mongoose.connect(process.env.CONNECTION_STRING)
    .then((res)=>{
        console.log(`db connected`);
    });

//-----------endpoints----------//
app.post(`/api/link/:email/:assessmentID`, (req, res) => {
    // Request will come in with email and assessment id or name
    // We will create the link then return the link with the encrypted email and test id.
})
  
app.get(`/api/assessments`, (req, res) => {
    // Request will pull all Assesments' name and id's from Mongo DB
    // Will return array of objects -- names and id's.
    Assessments.find({}, (err, assessments)=>{
        res.send(assessments)
    })
})

app.get(`/api/questions/:assessmentID`, (req, res) => {
    // get all questions from assessment id or name 
    // format before sending back
    // {
    //     qID: 'Q1',
    //     qText: '',
    //     testText: []
    // }, 
    Assessments.findOne({name: req.params.assessmentName}, (err, assessment)=>{
        res.send(assessment.questions);
    })
})
  
app.post(`/api/post-results`, async (req, res) => {
    const { data, assessmentName, qID } = req.body;
    const path = './test.js';
  
    await writeFileAsync(path, data)
  
    testRunner(path, assessmentName, qID)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err)
      })

    // needs to receive assessmentName, qID, and code 
    // Will pull tests from file
    // will create file from code 
    // will build test suite, run code and return results
    // will send results back to client
})
  
app.post(`/api/submit`, (req,res) => {
    // Will receive result data
    // Will draft and send out email
    // Will return success or fail
})


const port = process.env.PORT || 3010
app.listen(port, ()=>{
    console.log(`This server is listening on port ${port}`)
})