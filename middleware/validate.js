export const validate = (req, res, next) => {
    const { name } = req.query
    if (name === "Vi") {
        return res.status(200).json({ message: `Welcome to Todo API ${name}` });
    }
    next()
}
export const validateTodo = (req, res, next) => {
    const { text } = req.body;
    if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res
          .status(400)
          .json({ message: "Todo is required and must be a string" });
    }
    next()
}
