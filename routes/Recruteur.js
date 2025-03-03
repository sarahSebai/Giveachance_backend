var express = require('express');
var router = express.Router();
const Recruteur = require ('../models/recruteurSchema.js')

router.get('/profils/:token', function(req, res, next) {

    const {token}=req.params
  
  // check si le token existe vraiement en BDD.
  Recruteur.findOne({token: token})
    .then(data =>{
      if (data){
        //
        Developer.find().then(listeprofils =>{
          res.json({result : true, profils: listeprofils})
        })
      }else{
        res.json({result:false, message:'please signIn'})
      }
    })
  .catch(error =>{
    res.json({error:error.message})
  })
  });
  
  
  
  
  
  module.exports = router;

