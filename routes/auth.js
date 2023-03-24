import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { generateJWTTOKEN } from "../service/jwt.js";
const router = Router()

router.post('/api/user', async (req, res, next) => {
    req.headers['content-type'] = 'text/json'
    const { firstName, lastName, email, password } = req.body

    const candidate = await User.findOne({ email })
    if (candidate) {
        res.send({
            error:{
                message: 'Email taken'
            }
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
    const token = await generateJWTTOKEN(user._id)
    res.send({ ...user, token: token })
    next()
})


export default router