const success = (res, message, data = {}) => {
    let successResponse = {
        success: true,
        message: message,
        status: 200,
        data: data
    }
    res.json(successResponse);
}

const error = (res, message, data = {}) => {
    let errorResponse = {
        success: false,
        message: message,
        status: 401,
        data: data
    }
    res.json(errorResponse);
}


module.exports = {
    success,
    error
}