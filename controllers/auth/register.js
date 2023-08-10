const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { HttpError, ctrlWrapper } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'User with such email already exists');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    message: 'New user is Registered',
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
