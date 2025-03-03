var express = require('express');
var router = express.Router();
const Developer = require ('../models/devSchema.js')
const {checkBody} = require ('../modules/checkbody.js');

/* GET home page. */
router.put('/Dev/:id', function(req, res, next) {

const {id}=req.params

const { presentation,github,twitter,linkedin,softskills,hardskillstechnologies,qualification,disponibilities,location,typecontrat,speciality} = req.body


if (!checkBody(req.body, ['presentation', 'softskills', 'hardskillstechnologies', 'qualification','disponibilities', 'location', 'typecontrat', 'speciality'])) {
  res.json({ result: false, error: 'Missing or empty fields' });
  return;
}

Developer.findByIdAndUpdate(id, {$set:{ //recherche multiple
  'info.presentation':presentation,
  'info.reseaux.linkedin':linkedin,
  'info.reseaux.github':github,
  'info.reseaux.twitter':twitter,
  'info.softskills':softskills,
  'info.hardskillstechnologies':hardskillstechnologies,
  'info.qualification':qualification,
  'info.disponibilities':disponibilities,
  'info.location':location,
  'info.typecontrat':typecontrat,
  'info.speciality':speciality}
}, 

  
{new : true}) //pour update le document, 

.then(data => { 

  res.json({result:true, 'updated profil': data})
  
})

});




module.exports = router;
