import jwt from "jsonwebtoken"


const generateJWTTOKEN = userId => {
    const accessTOKEN = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return accessTOKEN
}

const getJWTTOKEN = token => {
    const userId = jwt.decode(token, { complete: true })
    return userId
}


export { generateJWTTOKEN, getJWTTOKEN }