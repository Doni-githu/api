import express from "express"
import mongoose from "mongoose"
import HomeProduct from "./routes/Products.js"
import Auth from "./routes/auth.js"
import * as dotenv from "dotenv"
import token from "./middleware/token.js"
dotenv.config()
const app = express()
app.use(express.json())



app.use(token)

app.use(HomeProduct)
app.use(Auth)


const startApp = () => {
    const PORT = 8000
    mongoose.set('strictQuery', true)
    mongoose.connect("mongodb+srv://ddonierov96:omc8iyDZ58OddMi7@doni.odgzc3z.mongodb.net/?retryWrites=true&w=majority")
        .then((res) => console.log("MongoDB connected"))
    app.listen(PORT, () => {
        console.log(`Server run on port ${PORT}`);
    })
}

startApp()