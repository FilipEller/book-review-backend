import getErrorMessage from '../util/getErrorMessage';

import { UserInputError } from 'apollo-server';
import { JWT_SECRET } from '../util/config';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const getToken = (authorization: string) => {
  if (authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken: any = jwt.verify(
      authorization.substring(7),
      JWT_SECRET
    );
    return decodedToken;
  } else {
    return null;
  }
};

const context = async ({ req }: { req: any }) => {
  const getUser = async () => {
    try {
      const authorization = req.headers?.authorization || '';
      const token = getToken(authorization);
      if (token) {
        const { id } = token;
        return User.findByPk(id);
      } else {
        return null;
      }
    } catch (error) {
      throw new UserInputError(getErrorMessage(error), {
        invalidArgs: req.headers.authorization,
      });
    }
  };
  return { getUser };
};

export default context;
