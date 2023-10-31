import jwt from "jsonwebtoken";
import err from "../errors/createError.js"


const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return  next( err.createError(`you are not authorized `, 501))
      }
    const token = authorizationHeader.replace('Bearer ', '');

    if (!token) {
        return next(err.createError(`you'r not authontoficated!`, 500))
    }
    jwt.verify(token, process.env.JWT, (error, user) => {
        if (error) {
            throw err.createError(`token is not valid`, 500)
        }
        console.log("--------------------");
        console.log(user);
        req.user  = user 
        req.userId = user.id
        next()
    })
}
const verifyUser = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user.id == req.params.id  ) {
                return next()
            }
           return  next( err.createError(`ure not the owner for this token`, 504))
        })
    }
    catch (error) {
        next(error)
    }
}

export default { verifyUser, verifyToken }