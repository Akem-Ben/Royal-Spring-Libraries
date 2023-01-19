import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const databaseConnector = async()=>{
    try{
        const conn = await mongoose.connect(`mongodb://localhost:27017/Royal_Spring_Libraries`,()=>{
            console.log(`Database is connected`)
        })
    }catch(err){
        console.log(err)
    }
}