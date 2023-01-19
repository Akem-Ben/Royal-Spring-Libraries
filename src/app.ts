import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'
import adminRouter from './routes/Admin'
import {databaseConnector} from './config/database'

const app = express()

dotenv.config()

databaseConnector()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(logger('dev'))
app.use(express.static(path.join(process.cwd(),'./public')))
app.use(cors())

app.use('/admin', adminRouter)


app.listen(process.env.PORT,()=>{
    console.log(`App paying attention on port ${process.env.PORT}`)
    })
    
    export default app