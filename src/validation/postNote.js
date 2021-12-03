import Joi from "joi";

export const validateNewNote = (note) => {
  const requirements = Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).max(500).required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string(),
  })

  return requirements.validate(note)
}