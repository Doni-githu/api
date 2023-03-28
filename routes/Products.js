import { Router } from "express";
import Product from "../models/Products.js"
import { getJWTTOKEN } from "../service/jwt.js";

const router = Router()

router.get('/api/todos', async (req, res) => {
    const products = await Product.find().lean()
    req.headers['content-type'] = 'text/json'
    res.status(200).send(products.reverse())
})

router.get('/api/todo/detail/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.send(product)
})

router.post('/api/todo/add', async (req, res) => {
    const token = getJWTTOKEN(req.headers.authorization)
    const product = await Product.create({ ...req.body.product, user: token.payload.userId })
    res.send(product)
})

router.post('/api/todo/edit/:id', async (req) => {
    console.log(req.body.article);
    // await Product.findByIdAndUpdate(req.params.id, req.body.article, { new: true })
})

router.delete('/api/todo/delete/:id', async (req, res) => {
    await Product.findByIdAndRemove(req.params.id, { new: true })
})


export default router