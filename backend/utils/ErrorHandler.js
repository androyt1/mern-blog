const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    const message = err.message
    res.status(statusCode).json({
        message: message,
    })
}

export { ErrorHandler }
