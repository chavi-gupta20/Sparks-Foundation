var mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name : String,
    email : String,
    amount : Number
  });
  const customer = module.exports = mongoose.model('customer', customerSchema);