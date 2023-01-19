import Joi from 'joi'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const adminRegisterSchema = Joi.object().keys({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.any().equal(Joi.ref('password')).
    required().label('Confirm Password').messages({"any.only":"{{#label}} does not match"}),
    phone:Joi.string().required(),
    address: Joi.string().required()
})

export const option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
}

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string)=>{
    return await bcrypt.hash(password,salt)
}