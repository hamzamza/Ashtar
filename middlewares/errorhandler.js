import er from "../errors/createError.js"



const errorHandlerMiddleware = async (err, req, res, next) => {
 
    if (err instanceof er.CustomError) {
        return res.status(err.status).json({ msg: err.message, status: err.status });
    }
     return res.status(400).end(err);
};

export default errorHandlerMiddleware;
