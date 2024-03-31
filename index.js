import express from 'express'
import Approuter from './src/routes/index.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use(Approuter)

app.listen(PORT,()=>{
    console.log('App is listening to Port '+ PORT)
})