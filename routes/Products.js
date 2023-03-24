import { Router } from "express";
import Product from "../models/Products.js"

const router = Router()

router.get('/api/todos', async (req, res) => {
    const products = await Product.find().lean()
    req.headers['content-type'] = 'text/json'
    res.status(200).send(products)
})

export default router