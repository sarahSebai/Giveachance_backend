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
    Developer.findOne({ email: { $regex: new RegExp(email, 'i') } })
    .then(devInfo => {
        if (devInfo) {
            // Si l'utilisateur existe, on lui demande de se connecter
            res.json({ result: false, error: 'User found, please sign in' });
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
// router.post('/signin/dev', function(req, res) {
//     const { username, password } = req.body;
    
//     // Vérification des champs requis
//     if (!checkBody(req.body, ['username', 'password'])) {
//         res.json({ result: false, error: 'Missing or empty fields' });
//         return;
//     }

//     // Rechercher l'utilisateur en base de données
//     Developer.findOne({ username: username })
//     .then(data => {
//         if (data && bcrypt.compareSync(password, data.password)) {
//             // Si les identifiants sont valides, on renvoie les infos de l'utilisateur
//             res.json({ result: true, infos: data }); 
//         } else {
//             // Si les identifiants sont incorrects, on affiche un message d'erreur
//             res.json({ result: false, error: 'Please sign up' }); 
//         }
//     })
//     .catch(error => {
//         res.json({ result: false, error: error.message });
//     });
// });

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
    Recruteur.findOne({ email: { $regex: new RegExp(email, 'i') } })
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
// router.post('/signin/recruteur', function(req, res) {
//     const { username, password } = req.body;
    
//     if (!checkBody(req.body, ['username', 'password'])) {
//         res.json({ result: false, error: 'Missing or empty fields' });
//         return;
//     }

//     // Recherche du recruteur en base de données
//     Recruteur.findOne({ username: username })
//     .then(data => {
//         if (data && bcrypt.compareSync(password, data.password)) {
//             res.json({ result: true, infos: data }); 
//         } else {
//             res.json({ result: false, error: 'Username not found, please sign up' }); 
//         }
//     })
// .catch((error)=>{
  
// res.json({result:false, error: error.message})
// })

//   })



// Route POST pour la connexion d'un utilisateur  
  router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    let role = "dev";// On suppose par défaut que l'utilisateur est un développeur
    let user = null;// Variable pour stocker l'utilisateur trouvé 

Developer.findOne({ email })// On cherche d'abord dans la collection des développeurs  
    .then((dev) => {
        if (dev) {
            user = dev; // Si un développeur est trouvé, on le stocke dans 'user' 
            return bcrypt.compare(password, dev.password);// On compare le mot de passe  
        }
        role = "recruteur";// Si aucun développeur n'est trouvé, on suppose que c'est un recruteur  
        return Recruteur.findOne({ email });// On cherche dans la collection des recruteurs  
    })
    .then((recruteur) => {
        if (!user && recruteur) {// Si 'user' n'a pas encore été trouvé mais un recruteur existe  
            user = recruteur; // On stocke le recruteur dans 'user' 
            return bcrypt.compare(password, recruteur.password);// Vérification du mot de passe  
        } else if (!user) {// Si aucun utilisateur (dev ou recruteur) n'est trouvé  
            return res.json({ result: false, message: "Utilisateur non trouvé" });
        }
        return true; // Si user est déjà défini, on passe directement à l'étape suivante
    })
    .then((data) => {
        if (!data) {
            return res.json({ result: false, message: "Mot de passe incorrect" });

        } else {
            res.json({ result: true, user, role });// Connexion réussie, on renvoie l'utilisateur et son rôle  
        }

    })
    .catch((error) => {
        res.status(500).json({ result: false, message: error.message });
    });
});



 










  
module.exports = router;


