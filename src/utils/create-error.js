const createError = (message, statuscode) => {
    const error = new Error(message);
    return error;
};

module.exports = createError;