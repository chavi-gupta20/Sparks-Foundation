var express = require("express");
var router = express.Router();
var customer = require('../models/customer');

router.get("/",function(req,res){
    res.render("transfer")
})

router.post("/",function(req,res){
    console.log("Form submitted");
    console.log(req.body.email1);
    var num = Number(req.body.amount);
    customer.find({},function(err,docs){
        docs.forEach(function(cust){
            if(cust.email==req.body.email1)
            {
                console.log("Sender found");
                var amount1 = cust.amount-num;
                customer.updateOne({email:req.body.email1},{amount:amount1},function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        console.log("successfully updated");
                    }
                })
            }
            if(cust.email==req.body.email2)
            {
                console.log("receiver found");
                var amount2= cust.amount+num;
                customer.updateOne({email:req.body.email2},{amount:amount2},function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        console.log("successfully updated");
                        res.redirect("/customers")
                    }
                })
            }
        })
    })
})

module.exports = router;