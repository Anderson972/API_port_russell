const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Reservation = new schema ({
    catwayNumber    :{
        type        : Number,
        trim        : true,
        required     : [true, "le numéro de catway est obligatoire"],
        min         : [1, "le numero doit etre positif"]
    },
    clientName      :{
        type        : String,
        trim        : true,
        minlength   : [3, 'Minimun 3 caractères'],
        maxlength   : [30, 'Maximum 30 caractères'],
        required     : [true, "Le nom du client est obligatoire"]
    },
    boatName        :{
        type        : String,
        trim        : true,
        required     : [true, "Le nom du bateau est obligatoire"],
        minlength   : [3, 'Minimun 3 caractères'],
        maxlength   : [30, 'Maximum 30 caractères'],
        unique      : true
    },
    startDate       :{
        type        : Date,
        required     : [true, "la date de debut de reservation est obligatoire"],
        min         : [Date.now, "La date est trop ancienne"]
    },
    endDate         :{
        type        : Date,
        required    : [true, "la date de fin de reservation est obligatoire"],
        validate    : {
            validator : function (value) {
                if(!this.startDate) return true
                return value > this.startDate
            },
            message : "La date de fin doit etre ulterieure à la date de debut"
        }
    }
});

module.exports = mongoose.model('Reservation', Reservation);