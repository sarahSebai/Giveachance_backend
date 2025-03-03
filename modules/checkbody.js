function checkBody(body, champ) {
    let isValid = true;
  //Si le front nous renvoie pas tous les élèments que le backend attend , ou bien il nous renvoie un champ vide ==> erreur   ,
    
  for (const element of champ) {
      if (!body[element] || body[champ] === '') {
        isValid = false;
      }
    }
  
    return isValid;
  }
  
  module.exports = { checkBody };
  