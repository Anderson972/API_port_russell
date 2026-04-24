const mongoose = require('mongoose');
const schema = mongoose.schema;

const Reservation = new schema ({
    catwayNumber    :{
        type        : Number,
        trim        : true,
        unique      : true,
        require     : [true, "le numéro de catway est obligatoire"],
        min         : [1, "le numero doit etre positif"]
    },
    clientName      :{
        type        : String,
        trim        : true,
        minlength   : [3, 'Minimun 3 caractères'],
        maxlength   : [30, 'Maximum 30 caractères'],
        require     : [true, "Le nom du client est obligatoire"]
    },
    boatName        :{
        type        : String,
        trim        : true,
        require     : [true, "Le nom du bateau est obligatoire"],
        minlength   : [3, 'Minimun 3 caractères'],
        maxlength   : [30, 'Maximum 30 caractères'],
        unique      : true
    },
    startDate       :{
        type        : Date,
        require     : [true, "la date de debut de reservation est obligatoire"],
        min         : [Date.now, "La date est trop ancienne"]
    },
    endDate         :{
        type        : Date,
        require     : [true, "la date de fin de reservation est obligatoire"],
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