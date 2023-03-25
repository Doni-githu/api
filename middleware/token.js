import { getJWTTOKEN } from "../service/jwt.js"
import User from "../models/User.js"
export default async function (req, res, next) {
    if (req.headers.authorization) {
        const token = await getJWTTOKEN(req.headers.authorization)
        const userId = token.payload.userId
        const user = await User.findById(userId)
        res.locals.user = user
    }
    next()
}
