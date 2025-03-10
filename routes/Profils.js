var express = require('express');
var router = express.Router(); // Création d'un routeur Express pour gérer les routes liées aux profils des développeurs

const Developer = require ('../models/devSchema.js'); // Importation du modèle Developer pour interagir avec la base de données MongoDB

// Route GET permettant de récupérer tous les profils des développeurs si le token fourni est valide
router.get('/profils/:token', function(req, res, next) {
    
    const { token } = req.params; // Récupération du token depuis les paramètres de l'URL

    // Vérification si le token existe bien en base de données
    Developer.findOne({ token: token }) // Recherche d'un développeur possédant ce token
    .then(data => {
        if (data) { 
            // Si un développeur avec ce token est trouvé, on récupère tous les profils de développeurs
            Developer.find()
            .then(listeprofils => {
                res.json({ result: true, profils: listeprofils }); // Envoi de la liste des profils des développeurs en réponse
            });
        } else {
            res.json({ result: false, message: 'please signIn' }); // Si aucun développeur ne correspond au token, on demande à se connecter
        }
    })
    .catch(error => {
        res.json({ error: error.message }); // Gestion des erreurs en cas de problème avec la base de données
    });
});

module.exports = router; 