import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  // App
  PORT: Joi.number().required(),
  PREFIX: Joi.string().optional().default(''),

  // Db
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
});
