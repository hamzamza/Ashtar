import jwt from "jsonwebtoken";
import err from "../errors/createError.js"


const verifyToken = (req, res, next) => {
    const token= req.cookies.access_token
    if (!token) {
        return next(err.createError(`you'r not authontoficated!`, 500))
    }
    jwt.verify(token, process.env.JWT, (error, user) => {
        if (error) {
            throw err.createError(`token is not valid`, 500)
        }
        req.user  = user 
        next()
    })
}
const verifyUser = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user.id == req.params.id  ) {
                return next()
            }
            throw err.createError(`ure not the owner for this token`, 504)
        })
    }
    catch (error) {
        next(error)
    }
}

export default { verifyUser, verifyToken }