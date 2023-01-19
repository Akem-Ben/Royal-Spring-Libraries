import mongoose, {Schema} from 'mongoose'

export interface IAdmin {
    _id: string,
    fullname: string,
    email: string,
    password: string,
    salt: string,
    phone: string,
    address: string,
    role: string,
}

export const adminSchema = new Schema ({
    fullname: {
        type: String
    },
    email: {
        type: String,
        require: [true, `Please input your email`],
        unique: true
    },
    password: {
        type: String,
        require: [true, `Please input your password`]
    },
    salt: {
        type: String,
    },
    phone: {
        type: String,
        require: [true, `Please input phone number`]
    },
    address: {
        type: String
    },
    role: {
        type: String
    }
},
{
    timestamps: true
})

const Admin = mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin