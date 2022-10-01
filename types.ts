import { User } from './models';

export type CreateUserArgs = {
  username: string;
  name: string;
  email: string;
};

export type LoginArgs = {
  username: string;
  password: string;
};

export type JwtUser = {
  username: string;
  id: string;
};

export interface AppContext {
  getUser: () => Promise<User | null>;
}
