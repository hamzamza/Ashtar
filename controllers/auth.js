import User from "../models/Users.js"
import bcrypt from 'bcryptjs'
import er from "../errors/createError.js"
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    console.log(req.body.username);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        if (hash) {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            })
            res.status(200).json(newUser)
        }
        else {
            throw new Error()
        }
    } catch (error) {
        throw er.createError(error.stack, 400)
    }
}


const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordCorrect) {
                return next(er.createError("user doesn't existe", 404))
            }
            {
                const { _v , _id, password , maps ,  ...otherDetails } = user._doc
                const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
                return res.status(200).json({ details: { ...otherDetails },  token})
            }
        }
        return next(er.createError("user doesn't existe", 404))
    } catch (error) {
        return next(er.createError("user doesn't existe", 404))
    }
}

export default { register, login }