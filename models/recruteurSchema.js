const mongoose = require('mongoose');

const recruteurSchema = mongoose.Schema({

    username:{
        type:String,
        required:true,
     },
     lastname:{
        type:String,
        required:true,
     },
     firstname:{
       type:Number,
       required:true,
     },
    likedDev:{
    type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'developers'}],
    required:false,
  } ,
  email:{
    type:String,        
    required:true
  },
  password:{
    type:String,
    required:true,
  }
});

const Recruteur = mongoose.model('recruteurs', recruteurSchema);

module.exports = Recruteur;