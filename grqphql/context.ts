import getErrorMessage from '../util/getErrorMessage';

const { UserInputError } = require('apollo-server');
const { JWT_SECRET } = require('../util/config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const context = async ({ req }: { req: any }) => {
  try {
    const token = req.headers.authorization || '';

    if (token.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(token.substring(7), JWT_SECRET);
      const currentUser = await User.findByPk(decodedToken.id);
      return { currentUser };
    }

    return {};
  } catch (error) {
    throw new UserInputError(getErrorMessage(error), {
      invalidArgs: req.headers.authorization,
    });
  }
};

export default context;
