import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email(),
  isFavourit: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});
