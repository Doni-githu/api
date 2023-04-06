import express from "express"
import mongoose, { get } from "mongoose"
import Product from "./routes/Products.js"
import Auth from "./routes/auth.js"
import * as dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173"
}))


app.use(Auth)
app.use(Product)
const startApi = () => {
    const PORT = process.env.PORT || 8000
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.URI, { useNewUrlParser: true, })
        .then(() => console.log("MongoDB is connected"))
        .catch((err) => console.log("MongoDB can't connect" + ' ' + err))
    app.listen(PORT, () => {
        console.log(`Server run on port ${PORT}`);
    })
}

startApi()