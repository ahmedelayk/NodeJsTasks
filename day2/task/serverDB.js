//#region Requires
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let PORT = process.env.PORT || 7050;
//#endregion

//#region mongoose configuration
mongoose.connect('mongodb://0.0.0.0:27017/School')
let schoolSchema = mongoose.Schema;
let studentsSchema = new schoolSchema({
  id: Number,
  first_name: String,
  last_name: String,
  date_of_birth: String,
  gender: String,
  status: String,
  entry_academic_period: String,
  hs_city: String,
  hs_state: String,
  hs_zip: Number
})
let students = mongoose.model("students", studentsSchema)
//#endregion


//#region Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// make assets folder static
app.use(express.static(__dirname + '/assets'))
//#endregion

//#region Requests
mongoose.connection.on('error', () => { console.log('Error') });
mongoose.connection.once('open', () => {
  console.log('connection success to database');
  app.get('/', async (req, res) => {
    let data = await students.find();
    let first = data[0];
    let keys = Object.keys(Object.entries(first)[2][1]);
    // console.log(keys);
    res.render('home.ejs', { keys, data })
  });
  // add new student
  app.post('/', async (req, res) => {
    // console.log(req.body)
    let newStuudent = new students(req.body)
    await newStuudent.save();
    res.send('post done')
  });
  // update student by id
  app.put('/', async (req, res) => {
    console.log(req.body)
    await students.findByIdAndUpdate({ _id: "644b3bbef6eb0b78cc180f33" }, req.body);
    res.send('put done')
  });
});


//#endregion


app.listen(PORT, () => {
  console.log(`Listening on port http://www.localhost:${PORT}`)
})