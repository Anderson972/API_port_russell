const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Catway = new schema ({
    catwayNumber    :{
        type        : Number,
        trim        : true,
        unique      : true,
        require     : [true, "le numéro de catway est obligatoire"],
        min         : [1, "le numero doit etre positif"]
    },
    catwayType      :{
        type        : String,
        require     : [true, "Veuillez choisir entre 'short' et 'long'"],
        enum        : {
            values   : ['short','long'],
            message : '"{VALUE}" n\'est pas valide'
        },
        trim        : true
    },
    catwayState     :{
        type        : String,
        require     : [true, "Quelle est l\'etat de la passerelle ?"],
        trim        : true,
        maxlength   : [500, 'Maximun 500 caractères']
    }
});

module.exports = mongoose.model('Catway', Catway);