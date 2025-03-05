var express = require('express');
var router = express.Router(); // Importation d'Express et création du routeur
const Developer = require ('../models/devSchema.js'); // Importation du modèle Developer
const {checkBody} = require ('../modules/checkbody.js'); // Importation de la fonction checkBody pour vérifier les champs requis

/* Route PUT pour mettre à jour le profil d'un développeur */
router.put('/Dev/:id', function(req, res, next) {

    const {id} = req.params; // Récupération de l'ID du développeur depuis les paramètres de l'URL
    
    // Récupération des données envoyées dans le body de la requête
    const { presentation, github, twitter, linkedin, softskills, hardskillstechnologies, qualification, disponibilities, location, typecontrat, speciality } = req.body;

    // Vérification que tous les champs requis sont bien fournis
    if (!checkBody(req.body, ['presentation', 'softskills', 'hardskillstechnologies', 'qualification', 'disponibilities', 'location', 'typecontrat', 'speciality'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    // Recherche du développeur par son ID et mise à jour des champs fournis
    Developer.findByIdAndUpdate(id, {
        $set: { // Utilisation de $set pour mettre à jour uniquement les champs spécifiés
            'info.presentation': presentation,
            'info.reseaux.linkedin': linkedin,
            'info.reseaux.github': github,
            'info.reseaux.twitter': twitter,
            'info.softskills': softskills,
            'info.hardskillstechnologies': hardskillstechnologies,
            'info.qualification': qualification,
            'info.disponibilities': disponibilities,
            'info.location': location,
            'info.typecontrat': typecontrat,
            'info.speciality': speciality
        }
    },
    { new: true }) // L'option { new: true } permet de retourner le document mis à jour
    
    .then(data => { 
        res.json({ result: true, 'updated profil': data }); // Envoi de la réponse avec le profil mis à jour
    })
    .catch(error => {
        res.json({ result: false, error: error.message }); // Gestion des erreurs en cas de problème
    });

});

module.exports = router; // Exportation du routeur pour être utilisé ailleurs dans l'application

