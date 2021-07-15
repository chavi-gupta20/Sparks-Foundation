
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const ejs = require('ejs');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine', 'ejs');
const port = 3000;
mongoose.connect('mongodb+srv://chavi_new:<password>@cluster0.pt5tr.mongodb.net/sparks', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to the server");
});

var customer = require('./models/customer');

app.get('/', (req, res) => {
  res.sendFile(__dirname +"/index.html")
})

app.get('/customers',(req,res) =>{
  //Here fetch data using mongoose query like
  customer.find({}, function(err, users) {
  if (err) throw err;
  // object of all the users
  res.render('customer',{details:users});
});
})
var transaction=require('./routes/transaction.js');
app.use("/transfer",transaction);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
