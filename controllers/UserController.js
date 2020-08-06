const { User } = require('../models')
const { UserService } = require('../services')
const { comparePasswords, createToken } = require('../utils')

module.exports = {
    findAll: (request, response)=>{
        User.find()
            .then((respDB)=> response.status(200).json(respDB))
            .catch((err)=> console.log(err));
    },
    findOne: (request, response)=>{
        User.findById(request.params.id)
            .then((respDB)=> response.status(200).json(respDB))
            .catch((err)=> console.log(err));
    },
    // para pruebas este jala mejor
    create: async (request, response)=>{
        const { body } = request;
            try {
                const userExists = await UserService.findOneByEmail(body.email)
                if (userExists) response.status(400).json({message: 'Email taken'}) 
                else {
                    const newUser = new User(body);
                    const user = await newUser.save();
                    response.status(201).json(user)
                }
            } catch (error){
                response.satatus(400).json(error)
            }
    },
    // para cuando corres el sistema
    signup: async (request, response)=>{
        const { body } = request;
        try {
            const userExists = await UserService.findOneByEmail(body.email)
            if (userExists) response.status(400).json({message: 'Email taken'}) 
            else {
                const newUser = new User(body);
                const user = await newUser.save();
                user.password = undefined
                response.status(201).json({message: 'Successfull Created'})
            }
        } catch (error){
            response.satatus(400).json(error)
        }
    },
    login: async (request, response)=>{
        const { email, password} = request.body;
        try {
            const user = await UserService.findOneByEmail(email);
            if(!user) response.status(400).json({message: 'Email not valid'})
            const isValid = comparePasswords(password, user.password)
            if (!isValid) response.status(400).json({message: 'Invalid Password'})
            const token = createToken(user);
            if (!token) response.status(500).json({message: 'Error creating token'})
            response.status(200).json({message: 'Successfull login', token})
        } catch (error) {
            response.status(400).json(error)
        }
    },

    edit: (request, response)=>{
        const { body } = request;
        User.findByIdAndUpdate(request.params.id, body, {new: true})
            .then((respDB)=> response.status(201).json(respDB))
            .catch((error)=> response.status(400).json(error))
    },
    eliminate: (request, response)=>{
        User.findByIdAndDelete(request.params.id)
            .then((respDB)=> response.status(200).json(respDB))
            .catch((err)=> console.log(err));
    },
};


// MODELO ANTERIOR
// const getAllUsers = (request, response)=>{
//     User.find()
//         .then((respDB)=> response.status(200).json(respDB))
//         .catch((err)=> console.log(err));
// }

// module.exports = { getAllUsers }