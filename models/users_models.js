const mongoose = require('mongoose');
const Joi = require("@hapi/joi")


//creating  the for schema of our collection
let usersSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
      },
      lastname: {
        type:String,
        required:true,
        minLength:2,
        maxLength:250
      },
      email: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
      },
      areacode: {
        type:String,
        required:true,
        minLength:1,
        maxLength:4
      },
      phone: {
        type:String,
        required:true,
        minLength:9,
        maxLength:9
      },
      date:{type:Date,default:Date.now()}
})

//connecting the schema above to the Collection in db
exports.usersModel = mongoose.model("contacts",usersSchema);


const validUser = (_user) => {

    let JoiSchema = Joi.object({
      id:Joi.string(),
      firstname:Joi.string().min(2).max(99).required(),
      lastname:Joi.string().min(2).max(99).required(),
      email:Joi.string().min(2).max(99).required(),
      areacode:Joi.string().min(1).max(4).required(),
      phone:Joi.string().min(9).max(9).required()
    })
  
    return JoiSchema.validate(_user);
  }
  
  exports.validUser = validUser;



