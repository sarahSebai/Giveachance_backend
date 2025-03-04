var express = require('express');
var router = express.Router(); // méthode  express pour créer des routes
const {checkBody} = require ('../modules/checkbody.js');
const Developer = require('../models/devSchema.js');
const Recruteur =require('../models/recruteurSchema')
const uid2= require('uid2')
const bcrypt= require ('bcrypt')


/* Route d'inscription pour les développeurs */
router.post('/signup/dev', function(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
    
    // Vérification des champs requis
    if (!checkBody(req.body, ['username', 'firstname', 'lastname', 'email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const hash = bcrypt.hashSync(password, 10); // Hashage du mot de passe

    // Vérifier si le username existe déjà en base de données (insensible à la casse)
    Developer.findOne({ username: { $regex: new RegExp(username, 'i') } })
    .then(devInfo => {
        if (devInfo) {
            // Si l'utilisateur existe, on lui demande de se connecter
            res.json({ result: false, error: 'Username found, please sign in' });
        } else {
            // Création d'un nouvel utilisateur
            const newDeveloper = new Developer({
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hash,
                token: uid2(32) // Génération d'un token unique
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
    });
});

/* Route de connexion pour les développeurs */
router.post('/signin/dev', function(req, res) {
    const { username, password } = req.body;
    
    // Vérification des champs requis
    if (!checkBody(req.body, ['username', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    // Rechercher l'utilisateur en base de données
    Developer.findOne({ username: username })
    .then(data => {
        if (data && bcrypt.compareSync(password, data.password)) {
            // Si les identifiants sont valides, on renvoie les infos de l'utilisateur
            res.json({ result: true, infos: data }); 
        } else {
            // Si les identifiants sont incorrects, on affiche un message d'erreur
            res.json({ result: false, error: 'Please sign up' }); 
        }
    })
    .catch(error => {
        res.json({ result: false, error: error.message });
    });
});

/* Route d'inscription pour les recruteurs */
router.post('/signup/recruteur', function(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
    
    // Vérification des champs requis
    if (!checkBody(req.body, ['username', 'firstname', 'lastname', 'email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const hash = bcrypt.hashSync(password, 10);

    // Vérifier si le username existe déjà
    Recruteur.findOne({ username: { $regex: new RegExp(username, 'i') } })
    .then(recruteurInfo => {
        if (recruteurInfo) {
            res.json({ result: false, error: 'User found, please sign in' });
        } else {
            // Création d'un nouveau recruteur
            const newRecruteur = new Recruteur({
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hash,
                token: uid2(32)
            });

            // Sauvegarde en base de données
            newRecruteur.save()
            .then(recruteurInfo => {
                res.json({ result: true, Infos: recruteurInfo });
            });
        }
    })
    .catch(error => {
        console.error("Error creating user:", error.message);
    });
});

/* Route de connexion pour les recruteurs */
router.post('/signin/recruteur', function(req, res) {
    const { username, password } = req.body;
    
    if (!checkBody(req.body, ['username', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    // Recherche du recruteur en base de données
    Recruteur.findOne({ username: username })
    .then(data => {
        if (data && bcrypt.compareSync(password, data.password)) {
            res.json({ result: true, infos: data }); 
        } else {
            res.json({ result: false, error: 'Username not found, please sign up' }); 
        }
    })
.catch((error)=>{
  
res.json({result:false, error: error.message})
})

  })



 










  
module.exports = router;


