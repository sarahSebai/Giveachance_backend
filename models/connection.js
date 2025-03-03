const mongoose = require('mongoose');

const connectionString ='mongodb+srv://sarahsebai1612:OneDirection1612.@cluster0.2yrjp.mongodb.net/giveachance'

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));