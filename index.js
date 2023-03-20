import express from "express"
import mongoose from "mongoose"
import Product from "./models/Products.js"
const app = express()

app.get('/todos', async (req, res) => {
    const products = await Product.find().lean()
    res.status(200).json(products).s
})

const startApp = () => {
    const PORT = process.env.PORT ?? 8000
    mongoose.connect("mongodb+srv://ddonierov96:omc8iyDZ58OddMi7@doni.odgzc3z.mongodb.net/?retryWrites=true&w=majority")
        .then(res => console.log("MongoDB connected"))
    app.listen(PORT, () => {
        console.log(`Server run on port ${PORT}`);
    })
}

startApp()