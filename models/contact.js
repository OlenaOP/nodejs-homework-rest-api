const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: String,
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
  },
  favorite: { type: Boolean, default: false },
  owner: {
    type: Schema.Types.ObjectID,
    ref: "user",
    required: true,
  },
});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addSchema, updateFavoriteSchema };
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
