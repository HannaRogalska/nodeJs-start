import { todoSchema, nameSchema } from "../models/joi_validate_todo.js";

export const validate = (req, res, next) => {
    const { name } = req.query;
    const { error } = nameSchema.validate({ name: name });
    if (error) {
         return res.status(400).json({ message: error.details[0].message });
    }
  if (name === "Vim") {
    return res.status(200).json({ message: `Welcome to Todo API ${name}` });
  }
  next();
};
export const validateTodo = (req, res, next) => {
  
    const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
