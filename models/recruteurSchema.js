const mongoose = require('mongoose');

const recruteurSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
      },
    username:{
        type:String,
        required:true,
     },
     lastname:{
        type:String,
        required:true,
  
     },
     firstname:{
       type:String,
       required:true,
     },
    likedDev:{
    type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'developers'}],
    required:false,
  } ,
  email:{
    type:String,        
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
 
});

const Recruteur = mongoose.model('recruteur', recruteurSchema);

module.exports = Recruteur;







