const Catway = require('../models/catway');


//Ajout d'un catway
exports.add = async (req, res, next) => {
    const temp = ({
        catwayNumber    : req.body.catwayNumber,
        catwayType      : req.body.catwayType,
        catwayState     : req.body.catwayState
    });
    try {
        const catway = await Catway.create(temp)
        return res.status(201).json(catway)
    } catch (error) {
        console.error("erreur lors de l\'ajout", error)
        return res.status(500).json(error)
    }
};
//récupere la liste des catways
exports.getAll = async (req, res, next) => {
    
    try {
        if (req.accepts('html')) {
            return next()
        }
        const catways = await Catway.find()
        if (catways.length === 0){
            return res.status(404).json({message : "aucun catway trouvé"})
        }
        return res.status(200).json(catways)
    } catch (error) {
        console.error("erreur lors de la requete", error)
        return res.status(500).json({message : "erreur serveur"})
    }
};
//récupere un catway par son ID
exports.getById = async (req, res, next) => {

    let id = req.params.id
    try {
        if (req.accepts('html')) {
            return next()
        }
        const catway = await Catway.findOne({catwayNumber : id})
        if(catway){
            return res.status(200).json(catway)
        }
        return res.status(404).json({message : "Catway non trouvé"})
    } catch (error) {
        console.error("erreur lor de la requete",error)
        return res.status(500).json({message : "erreur serveur"})
    }
};
//Modiffie un catway
exports.updates = async (req, res, next) => {
    const id = req.params.id
    const {catwayState} = req.body
    try {
        const catway = await Catway.findOne({catwayNumber: id})
        
        if (catway){
            if(catwayState){
                catway.catwayState = catwayState
            }
            await catway.save()
            return res.status(200).json(catway)
        }
        return res.status(404).json({message : "Ce catway n'existe pas"})
    } catch (error) {
        console.error("erreur lors de la requete")
        return res.status(500).json({message : "erreur serveur"})
    }
};
//Supprime un catway de la liste
exports.delete = async (req,res,next) => {
    let id = req.params.id
    try {
        const catway = await Catway.deleteOne({catwayNumber : id})
        return res.status(200).json({message : "Ce catway a été supprimé."})
    } catch (error) {
        console.error("erreur lors de la requete", error)
        return res.status(500).json({message : "erreur serveur"})
    }
};