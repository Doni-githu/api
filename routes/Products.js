import { Router } from "express";
import Product from "../models/Products.js"
import { getJWTTOKEN } from "../service/jwt.js";

const router = Router()

router.get('/api/todos', async (req, res) => {
    const products = await Product.find().lean()
    req.headers['content-type'] = 'text/json'
    res.status(200).send(products.reverse())
})

router.get('/api/todo', async (req, res) => {
    const token = req.headers.authorization
    const jwt = getJWTTOKEN(token)
    const user = jwt.payload.userId.toString()
    const myProducts = await Product.find({ user }).populate('user').lean()
    res.status(200).json(myProducts)
})

router.get('/api/todo/detail/:id', async (req, res) => {
    const token = req.headers.authorization
    const user = getJWTTOKEN(token).payload.userId
    const product = await Product.findById(req.params.id).populate('user').lean()
    res.send(product)
})

router.post('/api/todo/add', async (req, res) => {
    const token = getJWTTOKEN(req.headers.authorization)
    await Product.create({ ...req.body.product, user: token.payload.userId })
    res.status(200).send({ message: "Success create product" })
})

router.put('/api/todo/edit/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body.article, { new: true })
    res.status(201).send({ message: "Success edit your product" })
})

router.delete('/api/todo/delete/:id', async (req, res) => {
    await Product.findByIdAndRemove(req.params.id, { new: true })
    res.status(200).send({ message: "Success delete your product" })
})


export default router