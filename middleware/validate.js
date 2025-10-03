export const validate = (req, res, next) => {
    const { name } = req.query
    if (name === "Vi") {
        return res.status(200).json({ message: `Welcome to Todo API ${name}` });
    }
    next()
}
