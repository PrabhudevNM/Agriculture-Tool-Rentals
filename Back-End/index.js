import express from 'express'
import cors from 'cors'
import dotenv  from 'dotenv'
dotenv.config()
import configureDB from './config/db.js'
configureDB()
import {checkSchema} from 'express-validator'
import usersCltr from './app/Controllers/user-cltr.js'
import { userLoginSchema, userRegisterSchema } from './app/Validators/user-validator.js'
import authenticationUser from './app/Middlewares/authentication.js'
import productCltr from './app/Controllers/product-cltr.js'
import upload from "./app/Middlewares/multer.js"
import bookingCltr from './app/Controllers/booking-cltr.js'
import authorizeUser from './app/Middlewares/authorization.js'
import paymentsCltr from './app/Controllers/payment-cltr.js'
import cloudinary from "cloudinary"


//multer
import path from 'path'
import { fileURLToPath } from 'url';

//express
const app=express()
app.use(cors())
app.use(express.json())
const port=process.env.PORT || 5000

//multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
  });


//users api
app.post('/api/users/register',upload.single('file'),checkSchema(userRegisterSchema),usersCltr.register)
app.post('/api/users/login',checkSchema(userLoginSchema),usersCltr.login)
app.get('/api/users/account',authenticationUser,usersCltr.account)

// app.post('/api/users/uploadPic',authenticationUser,upload.single('file'),usersCltr.register)

//for profile
app.post('/api/users/create-photo',authenticationUser,upload.single('file'), usersCltr.create);
app.get('/api/users/show-photo',authenticationUser,usersCltr.show)
app.put('/api/users/update-photo',authenticationUser,upload.single('file'),usersCltr.update)
app.delete('/api/users/delete-photo',authenticationUser,usersCltr.removePhoto)

//admin accessing about user
app.get('/api/admin-lsitUsers',authenticationUser,authorizeUser(['admin','moderator']),usersCltr.listUsers)
app.delete('/api/admin-deleteUsers/:id',authenticationUser,authorizeUser(['admin']),usersCltr.destroy)
app.put('/api/users/admin-change-role/:id', authenticationUser,authorizeUser(['admin']), usersCltr.changeRole)


//admin accessing about product
app.get('/api/users/product-admin',authenticationUser,authorizeUser(['admin']),productCltr.list)
app.post('/api/users/create-product-admin',authenticationUser,authorizeUser(['admin']),upload.single('file'),productCltr.create)
app.put('/api/users/edit-product-admin/:id',authenticationUser,authorizeUser(['admin']),upload.single('file'),productCltr.updateByAdmin)
app.delete('/api/users/delete-product-admin/:id',authenticationUser,authorizeUser(['admin']),productCltr.delete)

//admin accessing about booking
app.get('/api/admin-listBookings',authenticationUser,authorizeUser(['admin']),bookingCltr.list)

//product api
app.get('/api/users/product',authenticationUser,productCltr.list)
//single user products
app.get('/api/users/myproduct',authenticationUser,productCltr.MyProductList)
app.post('/api/users/product',authenticationUser,upload.single('file'),productCltr.create)
app.get('/api/users/product/:id',authenticationUser,productCltr.show)
app.put('/api/users/product/:id',authenticationUser,upload.single('file'),productCltr.updateByUser)
app.delete('/api/users/product/:id',authenticationUser,productCltr.delete)
// app.delete('/api/products/category/:category',authenticationUser,productCltr.delete)


//for booking
app.post('/api/createBooking',authenticationUser,bookingCltr.create)
app.get('/api/showBooking',authenticationUser,bookingCltr.show)

//payment
app.post('/api/create-checkout-session',authenticationUser,paymentsCltr.pay)
app.put('/api/payments/:id',paymentsCltr.edit)

app.listen(port,()=>{
    console.log('port running on',port)
})
