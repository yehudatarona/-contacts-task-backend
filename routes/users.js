const express = require('express');
const router = express.Router();
const { usersModel,validUser} = require("../models/users_models")

// testing connection to db for fun
usersModel.find({})
    .then(data => {
        console.log("then", data);
    })
    .catch(err => {
        console.log(err);
    })

/* GET home page. */
// all toys in the db domain/toys

router.get('/', (req, res, next) => {
    usersModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});


 // to get the amount of toys all in the db

  router.get('/countContacts',(req,res) => {
    usersModel.countDocuments({})
    .then(data => {
      res.json({doucuments:data})
    })
  })
  

router.get('/single/:id', (req, res, next) => {

    usersModel.findOne({_id:req.params.id})
    .then(data => {
      res.json(data)
      
    })
    .catch(err => {
      res.status(400).json(err)
    })
  });


 
  router.post("/add",async(req,res) => {
    let dataBody = req.body;
    let user = await validUser(dataBody);
    if(user.error){
      res.status(400).json(user.error.details[0])
    }
    else{
      try{
        let updateData = await usersModel.insertMany([req.body]);
        res.json(updateData)
        
      }
      catch(err){
        console.log(err);
        res.status(400).json({ message: "error insert new user, already in data" })
      }
    }
  })

  // router.post("/edit",async(req,res) => {
  //   let dataBody = req.body;
  //   let toy = await validUser(dataBody);
  //   if(toy.error){
  //     res.status(400).json(toy.error.details[0])
  //   }
  //   else{
  //     try{
  //       let updateData = await usersModel.updateOne({_id:req.body.id},req.body);
  //       res.json(updateData)
        
  //     }
  //     catch{
  //       res.status(400).json({ message: "error cant find id" })
  //     }
  //   }
  // })

  // router.post("/del",(req,res) => {
  //   let delId = req.body.del
  //   usersModel.deleteOne({_id:delId})
  //   .then(data => {
  //     if(data.deletedCount > 0 ){
  //       res.json({message:"deleted"});
  //     }
  //     else{
  //       res.status(400).json({error:"error id not found"});
  //     }
  //   })
  // })

 

module.exports = router;
