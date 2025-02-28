var express = require('express');
var router = express.Router();
const {checkbody} = require ('../modules/checkbody.js');
const Developer = require('../models/devSchema.js');
const uid2= require('uid2')
const bcrypt= require ('bcrypt')


/* Post: Pour Dev et Recruteur  */
router.post('/signup', function(req, res, next){

    const {username,firstname, lastname, email, password, ProfilType} = req.body

const hash= bcrypt.hashSync(password,10)

    if (!checkbody(req.body, ['username','firstname', 'lastname', 'email', 'password', 'ProfilType'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }


    if (ProfilType==='Developer'){
const newDeveloper = new Developer({
        username:username,
        firstname: firstname,
        lastname: lastname,
        email:email , 
        password: hash, 
        token: uid2(32)
})
    newDeveloper.save()
    .then((devInfo)=>{
        console.log(devInfo);
        res.json({ result:true , Infos: devInfo})
        
    })
    }

});







module.exports = router;
