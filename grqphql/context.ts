import getErrorMessage from '../util/getErrorMessage';

import { UserInputError } from 'apollo-server';
import { JWT_SECRET } from '../util/config';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const context = async ({ req }: { req: any }) => {
  try {
    const token = req.headers?.authorization || '';
    if (token.toLowerCase().startsWith('bearer ')) {
      const decodedToken: any = jwt.verify(token.substring(7), JWT_SECRET);
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
