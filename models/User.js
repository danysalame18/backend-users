const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')

const SALT_WORK_FACTOR = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
    is_active:{
        type: Boolean,
        default: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{
    timestamp: true,
    versionKey: false
});

userSchema.pre('save', function (next) {
    const user = this;
    // revisa si la contraseña es nueva o modificada
    if (!user.isModified('password')) return next();
    // genera un salt
    return bcrypt.genSalt(SALT_WORK_FACTOR, function (errSalt, salt) {
      if (errSalt) return next(errSalt);
      // hash jala el password usado por salt
      return bcrypt.hash(user.password, salt, function (errHash, hash) {
        if (errHash) return next(errHash);
        // anula la contraseña inicial cin cifrar el hash
        user.password = hash;
        return next();
      });
    });
  });


const User = mongoose.model('User', userSchema)
module.exports = User;