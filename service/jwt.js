import jwt from "jsonwebtoken"


const generateJWTTOKEN = userId => {
    const accessTOKEN = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return accessTOKEN
}

const getJWTTOKEN = async token => {
    const userId = await jwt.decode(token, { complete: true })
    return userId
}


export { generateJWTTOKEN, getJWTTOKEN }