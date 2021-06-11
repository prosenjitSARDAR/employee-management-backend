const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');



module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, 'SECRET');

        Admin.find({ _id: decode.id, email: decode.email }).then(user => {
            if (user) {
                req.currentUser = user[0];
                next()
            } else {
                throw new Error({
                    "message": "Authentication Faild",
                    "status": 401
                })
            }
        }).catch(e => {
            let err = {
                "message": "Authentication Faild",
                "status": 401
            }
            return res.status(401).send(err);

        })

    } catch (error) {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };
        res.status(401).send(result);
    }

}