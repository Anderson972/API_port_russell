const jwt       = require('jsonwebtoken');
const user      = require('../models/user');
const SECRET_KEY= process.env.SECRET_KEY


exports.checkJWT = (req, res, next) => {

   const token = req.session.token



    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded)=> {
            if (err) {
                return res.redirect('/');
            } else {
                req.decoded = decoded;

                const expiresIn = 24*60*60;
                const newToken = jwt.sign({
                    user: decoded.user
                },
                SECRET_KEY,
                {
                    expiresIn: expiresIn
                });

                req.session.token = newToken

                next();
            }
        });
    }else {
        console.log("pas de token")
        return res.redirect('/');
    }
};