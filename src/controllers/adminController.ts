import express, {request, Response} from 'express'
import Admin from '../models/adminModel'
import jwt, {JwtPayload} from 'jsonwebtoken'
import {adminRegisterSchema, GeneratePassword, GenerateSalt, option} from '../utils/utils'

export const CreateSuperAdmin = async(req:JwtPayload, res:Response)=>{
    try{
        const {fullname, email, password, phone, address, confirm_password} = req.body
        const validateInput = adminRegisterSchema.validate(req.body, option)
        if(validateInput.error){
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            })
        }
        const salt = await GenerateSalt()
        const adminPassword = await GeneratePassword(password, salt)
        
        const superAdmin = await Admin.findOne({email})

        if(!superAdmin){
            let mainAdmin = await Admin.create({
                fullname,
                email,
                password:adminPassword,
                phone,
                address,
                salt,
                role: "super-admin"
            })
            const mainSuperAdmin = await Admin.findOne({email})

            return res.status(201).json({
                message: "Super-Admin created successfully",
                name: mainSuperAdmin?.fullname,
                email: mainSuperAdmin?.email,
                role: mainSuperAdmin?.role 
            })
        }
        return res.status(400).json({
            message: "Super-Admin already exists!"
        })
    }catch(error){
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/admin/create-superadmin'
        })
    }
}