const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../models/user");

const { HttpError } = require("../helpers");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res
      .status(201)
      .json({ email: newUser.email, subscription: newUser.subscription });
  } catch (err) {
    next(err);
    // res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
    // res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
