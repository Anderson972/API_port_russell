const Reservation = require('../models/reservation');
const Catway = require('../models/catway');



//Ajout de reservation
exports.add = async (req, res, next) => {
    const temp = ({
        catwayNumber    : req.body.catwayNumber,
        clientName      : req.body.clientName,
        boatName        : req.body.boatName,
        startDate       : req.body.startDate,
        endDate         : req.body.endDate
    })
    try {
        if (req.accepts('html')) {
            return next()
        }
        const reservation = await Reservation.create(temp)
        return res.status(201).json(reservation)
    } catch (error) {
        console.error("erreur lors de la réservation", error)
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.getAll = async (req, res, next) => {
    
    const id = parseInt(req.params.id)

    try {
        if (req.accepts('html')) {
            return next()
        }
        const catway = await Catway.findOne({catwayNumber : id})
        if (catway){
            const reservations = await Reservation.find({catwayNumber : id}) 
            if (reservations.length === 0) {
                return res.status(404).json({message : "Réservation non trouvée"})
            }
            return res.status(200).json(reservations)

        }
        return res.status(404).json({message : "Catway non trouvé"})
    } catch (error) {
        console.error("erreur lors de la recherche de réservation",error)
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.getById = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const idReservation = req.params.idReservation

    try {
        if (req.accepts('html')) {
            return next()
        }
        const catway = await Catway.findOne({catwayNumber : id})
        if(catway) {
            const reservation = await Reservation.findById(idReservation)
            if (reservation) {
                return res.status(200).json(reservation)
            };
            return res.status(404).json({message : "Réservation non trouvée"})
        }
        return res.status(404).json({message : "Catway non trouvé"})
    } catch (error) {
        console.error("erreur lors de la recherche de réservation",error)
        return res.status(500).json({message : "erreur serveur"})
    };
};

exports.updates = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const idReservation = req.params.idReservation
    const temp = ({
        catwayNumber    : req.body.catwayNumber,
        clientName      : req.body.clientName,
        boatName        : req.body.boatName,
        startDate       : req.body.startDate,
        endDate         : req.body.endDate
    })

    try {
        const catway = await Catway.findOne({catwayNumber : id})
        if (catway) {
            const reservation = await Reservation.findById(idReservation)
            if (reservation) {
                Object.keys(temp).forEach((key) => {
                    if (!!temp[key]) {
                        reservation[key] = temp[key]
                    };
                });
                await reservation.save()
                return res.status(201).json(reservation)
            };
            return res.status(404).json({message : "Réservation non trouvé"})
        }
        return res.status(404).json({message : "Catway non trouvée"})
    } catch (error) {
        console.error("erreur lors de la modification de réservation",error)
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.delete = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const idReservation = req.params.idReservation

    try {
        const catway = await Catway.findOne({catwayNumber : id})
        if (catway) {
            const reservation = await Reservation.findById(idReservation)
            if (reservation) {
                await Reservation.deleteOne({_id : idReservation})
                return res.status(200).json({ message: "Réservation supprimée"})
            }
            return res.status(404).json({message : "Réservation non trouvé"})
        }
        return res.status(404).json({message : "Catway non trouvée"})
    } catch (error) {
        console.error("erreur lors de la suppression de réservation",error)
        return res.status(500).json({message : "erreur serveur"})
    }
};