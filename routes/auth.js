import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { generateJWTTOKEN, getJWTTOKEN } from "../service/jwt.js";
const router = Router()

router.post('/api/users', async (req, res) => {
    req.headers['content-type'] = 'text/json'
    const { firstName, lastName, email, password } = req.body.user

    const candidate = await User.findOne({ email })

    if (candidate) {
        res.status(404).send({
            message: 'Email taken'
        })
        return
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const dataUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword
    }
    const user = await User.create(dataUser)
    const token = generateJWTTOKEN(user._id)
    res.send({ ...user, token: token })
})

router.get('/api/user', async (req, res) => {
    const token = getJWTTOKEN(req.headers.authorization)
    if (token) {
        const user = await User.findById(token.payload.userId)
        res.send(user)
    }
})


router.post('/api/login', async (req, res) => {
    req.headers['content-type'] = 'text/json'
    const { email, password } = req.body.user
    console.log(res.locals.user);
    const existUser = await User.findOne({ email })
    if (!existUser) {
        res.status(404).send({
            message: 'User not found'
        })
        return;
    }

    const PasswordIsEqual = await bcrypt.compare(password, existUser.password)
    if (!PasswordIsEqual) {
        res.status(403).send({
            message: 'Password is wrong'
        })
        return;
    }
    const token = generateJWTTOKEN(existUser._id)
    res.send({ ...existUser, token: token })
})


export default router