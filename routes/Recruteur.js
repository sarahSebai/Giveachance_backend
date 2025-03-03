var express = require('express');
var router = express.Router();
const Recruteur = require('../models/recruteurSchema.js'); // Importation du modèle Recruteur
const Developer = require('../models/devSchema.js'); // Importation du modèle Developer

// Route permettant à un recruteur authentifié d'afficher tous les profils des développeurs
router.get('/profils/:token', function(req, res, next) {

    const { token } = req.params; // Récupération du token envoyé dans l'URL

    // Vérifie si le token correspond à un recruteur existant dans la base de données
    Recruteur.findOne({ token: token })
        .then(data => {
            if (data) {
                // Si le recruteur est trouvé, on récupère la liste de tous les développeurs
                Developer.find()
                    .then(listeprofils => {
                        res.json({ result: true, profils: listeprofils }); // Envoi de la liste des développeurs
                    })
            } else {
                // Si aucun recruteur avec ce token n'est trouvé, on demande de se connecter
                res.json({ result: false, message: 'please signIn' });
            }
        })
        .catch(error => {
            // Gestion des erreurs si la requête échoue
            res.json({ error: error.message });
        });
});

module.exports = router; 