const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bcrypt = require('bcrypt')

const User = new schema ({

    username    :{
        type        : String,
        trim        : true,
        required     : [true,"un nom d'utilisateur est requis"],
        unique      : true,
        minlength   :[3, "Minimum 3 caractères"],
        maxlength   :[30, "Maximun 30 caractères"],
        match       :[/^[a-zA-Z0-9_.-]+$/, `Caractères autorisés : "_ , - , . "`]
    },
    email        :{
        type        : String,
        trim        : true,
        require     : [true, "L\'email est obligatoire"],
        unique      : true,
        lowercase   : true,
        match       : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,'Email invalide'],

    },
    password    :{
        type        : String,
        trim        : true,
        /* minlength   : [8, "Minimun 8 caractères"], */
        maxlength   : [128, "Maximun 128 caractères"],
        select      : false,
        match       : [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial']
    }
})

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
   return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  
});

module.exports = mongoose.model('User', User);