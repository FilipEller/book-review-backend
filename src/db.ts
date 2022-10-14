import { Sequelize } from 'sequelize';
import { NODE_ENV } from './util/config';
const config = require('../config/config');

const sequelize = new Sequelize(config[NODE_ENV]);

export { sequelize };
