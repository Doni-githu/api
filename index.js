import express from "express"
import mongoose from "mongoose"
import Product from "./routes/Products.js"
import Auth from "./routes/auth.js"
import * as dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));




app.use(Auth)
app.use(Product)


const startApp = () => {
    const PORT = process.env.PORT ?? 8000
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.URI,
        {
            useNewUrlParser: true,
        }
    )
        .then(() => console.log("MongoDB connected"))
    app.listen(PORT, () => {
        console.log(`Server run on port ${PORT}`);
    })
}

startApp()