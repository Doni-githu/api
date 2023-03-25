import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { generateJWTTOKEN, getJWTTOKEN } from "../service/jwt.js";
const router = Router()

router.post('/api/user', async (req, res) => {
    req.headers['content-type'] = 'text/json'
    const { firstName, lastName, email, password } = req.body.user

    const condidate = await User.findOne({ email: email })
    if (condidate) {
        res.status(510)
        return
    }
    console.log("Condidate not");

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


router.get("/api/user/:token", async (req, res) => {
    const user = await getJWTTOKEN(req.params.token)
    console.log(user);
})

export default router

