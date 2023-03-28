import express from "express"
import mongoose from "mongoose"
import Product from "./routes/Products.js"
import Auth from "./routes/auth.js"
import * as dotenv from "dotenv"
dotenv.config()
const api = express()
api.use(express.json())
api.use(express.urlencoded({ extended: true }));




api.use(Auth)
api.use(Product)


const startApi = () => {
    const PORT = process.env.PORT ?? 8000
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.URI, { useNewUrlParser: true, })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("MongoDB can't connect " + err))
    api.listen(PORT, () => {
        console.log(`Server run on port ${PORT}`);
    })
}

startApi()