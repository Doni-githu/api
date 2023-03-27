import { Router } from "express";
import Product from "../models/Products.js"
import { getJWTTOKEN } from "../service/jwt.js";

const router = Router()

router.get('/api/todos', async (req, res) => {
    const products = await Product.find().lean()
    req.headers['content-type'] = 'text/json'
    res.status(200).send(products)
})

router.post('/api/todo/add', async (req, res) => {
    const { title, description, image, price } = req.body.product
    const token = getJWTTOKEN(req.headers.authorization)
    const product = await Product.create({ ...req.body.product, user: token.payload.userId })
    res.send(product)
})


export default router