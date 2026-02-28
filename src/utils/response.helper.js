export const successRes = (req, res, message, status = 200) => {
    res.status(status).send({
        error: false,
        status: status,
        body: message
    });
};

export const errorRes = (req, res, message, status = 500) => {
    res.status(status).send({
        error: true,
        status: status,
        body: message
    });
}