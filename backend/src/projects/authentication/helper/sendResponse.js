const sendResponse = (res, status = 403, message = '', success = true, error = null, data = {}) => {

    const response = { message, success, ...data };

    if (error) response.error = error;

    return res.status(status).json(response);
};

export default sendResponse;