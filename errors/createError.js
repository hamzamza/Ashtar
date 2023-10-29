class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.status = statusCode
    }
}
const createError = (msg, statuscode) => {
    return new CustomError(msg, statuscode)
}
export default { createError, CustomError }