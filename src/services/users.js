const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY


exports.add = async (req, res, next) => {
    const temp = ({
        username    : req.body.username,
        email       : req.body.email,
        password    : req.body.password
    })
    try {
        if (req.accepts('html')) {
            return next()
        }
        const user = await User.create(temp)
        return res.status(201).json(user)
    } catch (error) {
        console.error("Erreur lors de la creation de l'utilisateur", error)
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.getAll = async (req, res, next) => {

    try {
        if (req.accepts('html')) {
            return next()
        }
        const users = await User.find()
        if (users.length === 0) {
            return res.status(404).json({message : "aucun utilisateur trouvé"})
        }
        return res.status(200).json(users)
    } catch (error) {
        console.error("erreur lors de la recherche")
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.getByMail = async (req, res, next) => {
    const email = req.params.email

    try {
        if (req.accepts('html')) {
            return next()
        }
        const user = await User.findOne({email : email.toLowerCase()})
        if (user) {
            console.log(user)
            return res.status(200).json(user)
        }
        return res.status(404).json({message : "Aucun utilisateur trouvé avec cet email"})
    } catch (error) {
        console.error("erreur lors de la recherche")
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.updates = async (req, res, next) => {
    const email = req.params.email
    const temp = ({
        username    : req.body.username,
        email       : req.body.email,
        password    : req.body.password
    })

    try {
        const user = await User.findOne({email : email})
        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!user[key]) {
                    user[key] = temp[key]
                }
            });

            await user.save();
            return res.status(200).json(user)
        }
        return res.status(404).json({message : "Aucun utilisateur trouvé avec cet email"})
    } catch (error) {
        console.error("erreur lors de la modification de l'utilitateur")
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.delete = async (req, res, next) => {
    const email = req.params.email
    
    try {
        const user = await User.findOne({email : email})
        if (user) {
            await User.deleteOne({email : email})
            return res.status(200).json({message : "utilisateur supprimé"})
        }
        return res.status(404).json({message : "Aucun utilisateur trouvé avec cet email"})

    } catch (error) {
        console.error("erreur lors de la suppression de l'utilitateur")
        return res.status(500).json({message : "erreur serveur"})
    }
};

exports.authenticate = async (req, res, next) =>{
    const {email, password} = req.body;
    try{

        const user = await User.findOne({email: email}, '+password');

        if (user){
            bcrypt.compare(password, user.password, function(err, response){

                if(err){
                    throw new Error(err);
                }
                if(response){
                    delete user._doc.password;

                    const expiresIn = 24 * 60 * 60;
                    const token    = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });
                    
                    req.session.token = token


                    return res.redirect('/dashboard');
                }

                return res.render('index', {
                    title   : "Accueil - se connecter",
                    errors  : "mot de passe incorrect"
                });
            });
        } else{
            return res.render('index', {
                title       : 'Accueil - se connecter',
                errors      : 'Utilisateur non trouvé',
                mail        : email,
                isInvalid   : true
            });
        }
    }catch(error) {
        console.error('erreur authenticate', error)
        return res.status(500).json(error);
    }
};

exports.logout = async (req, res, next) => {
    req.session.destroy()
    return res.redirect('/')
};