const jwt = require('jsonwebtoken');
// const { response } = require('express');

module.exports = {
    verifyToken: (request, response, next)=>{
        try {
            const { authorization } = request.headers;
            // Bearer Token
            // autorization.split -> ['Bearer'0, token1]
            const token = authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            request.decoded= decoded;
            next();
        } catch (error) {
            response.status(401).json({message: 'Auth error', error});
        }
    }
}
