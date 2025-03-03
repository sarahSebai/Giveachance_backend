var express = require('express');
var router = express.Router(); // méthode  express pour créer des routes
const {checkBody} = require ('../modules/checkbody.js');
const Developer = require('../models/devSchema.js');
const Recruteur =require('../models/recruteurSchema')
const uid2= require('uid2')
const bcrypt= require ('bcrypt')


/* Post: Pour Dev  */
  router.post('/signup/dev', function(req, res) {
    // console.log(req.body);
      
    const { username, firstname, lastname, email, password } = req.body;
  
    if (!checkBody(req.body, ['username', 'firstname', 'lastname', 'email', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
  
    const hash = bcrypt.hashSync(password, 10);
  
    Developer.findOne({ username: {$regex:new RegExp(username,'i')}})


      .then(devInfo => { 
        if(devInfo){
            //sign in
            res.json({result:false , error:"username found,  please sign in"})
            
      }
      else{
        //signup
        
    
        const newDeveloper = new Developer({
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hash,
          token: uid2(32)
        });

        newDeveloper.save()
          .then(function(devInfo) {
            console.log(devInfo);
            res.json({ result: true, Infos: devInfo });
          })

      }
       
      })
      .catch((error)=>{
        console.error("Error creating user:", error.message);
        
      })

    
  })

  router.post('/signin/dev', function(req,res){

    const { username, password } = req.body;
  
    if (!checkBody(req.body, ['username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }



    //console.log(req.body);
    Developer.findOne({username:username })
    
    .then(data => {
     // console.log(data, 'top');
      
        if (data && bcrypt.compareSync(password, data.password)) {
         // console.log(data);
            res.json({ result: true, infos: data}); 
          } else{
           // console.log(data);
            
            res.json({ result: false, error : ' please sigun up ' }); 
          }
    })
    .catch((error)=>{
  
      res.json({result:false, error: error.message})
      })
  })

  router.post('/signup/recruteur', function(req, res) {
    // console.log(req.body);
      
    const { username, firstname, lastname, email, password } = req.body;
  
    if (!checkBody(req.body, ['username', 'firstname', 'lastname', 'email', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
  
    const hash = bcrypt.hashSync(password, 10);
  
    Recruteur.findOne({ username: {$regex:new RegExp(username,'i')}})


      .then(recruteurInfo => { 
        if(recruteurInfo){
            //sign in
            res.json({result:false , error:"user found please sign in"})
            
      }
      else{
        //signup
        
    
        const newRecruteur = new Recruteur({
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hash,
          token: uid2(32)
        });

        newRecruteur.save()
          .then(function(recruteurInfo) {
            console.log(recruteurInfo);
            res.json({ result: true, Infos: recruteurInfo });
          })

      }
       
      })
      .catch((error)=>{
        console.error("Error creating user:", error.message);
        
      })

    
  })

  router.post('/signin/recruteur', function(req,res){

    const { username, password } = req.body;
  
    if (!checkBody(req.body, ['username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    //console.log(req.body);
    // Recruteur.findOne({ $and: [{ username: username },{password:password}] })
     Recruteur.findOne({ username: username})
    
    .then(data => {
     console.log(data, 'top');
      
        if (data && bcrypt.compareSync(password, data.password)) {
         // console.log(data);
            res.json({ result: true, infos: data}); 
          } else{
           // console.log(data);
            
            res.json({ result: false, error : ' username not found please sign up ' }); 
          }
    })
.catch((error)=>{
  
res.json({result:false, error: error.message})
})

  })



 










  
module.exports = router;

