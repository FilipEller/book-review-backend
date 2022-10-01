import getErrorMessage from '../util/getErrorMessage';
import { UserInputError } from 'apollo-server';
import { JWT_SECRET } from '../util/config';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { JwtUser, AppContext } from '../types';

const getToken = (authorization: string): string => {
  if (authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  } else {
    return '';
  }
};

const decodeToken = (encodedToken: string): JwtUser => {
  return jwt.verify(encodedToken, JWT_SECRET) as JwtUser;
};

const context = async ({ req }: { req: any }): Promise<AppContext> => {
  const getUser = async () => {
    try {
      const authorization = req.headers?.authorization || '';
      const encodedToken = getToken(authorization);
      const token = decodeToken(encodedToken);
      if (token) {
        const { id } = token;
        return User.findByPk(id);
      } else {
        return null;
      }
    } catch (error: unknown) {
      throw new UserInputError(getErrorMessage(error), {
        invalidArgs: req.headers.authorization,
      });
    }
  };
  return { getUser };
};

export default context;
