const mongoose = require('mongoose');

const reseauxSchema = mongoose.Schema({
    linkedin: String,
    github:String,
    twitter:String,
})

const infoSchema = mongoose.Schema({
    presentation:{
        type:String,
        required:true,
    },
    reseaux:reseauxSchema
    ,
    softskills:{
        type:[String],
        required:true,
    },
    hardskillstechnologies:{
        type:[String],
        required:true,
    },
    qualification:{
        type:[String],
        required:true,
    },
    disponibilities:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    typecontrat:{
        type:[String],
        required:true

    },
    speciality:{
        type:String,
        required:true
    }

 
 
 });
 


 const devSchema = mongoose.Schema({
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
   email:{
      type:String,
      required:true,
  
   },
   password:{
     type:String,
     required:true
   },
   profilpicture:{
     type:String,
     required:false
   },
   info:
     infoSchema,
     
   
   responseduration:{
     type:Boolean,
     required:false
   },
   

   
   isliked:{
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'recruteur'}],
    required:false
    
   }

   
  
   
   });





   const Developer = mongoose.model('developers', devSchema);


module.exports = Developer;
