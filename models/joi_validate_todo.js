import Joi from "joi";

export const todoSchema = Joi.object({
  text: Joi.string().min(1).max(255).required(),
  done: Joi.boolean().default(false),
});

export const nameSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
});