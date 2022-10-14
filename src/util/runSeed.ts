import { runSeed } from './seed';
import { sequelize } from '../db';


const run = async () => {
  await sequelize.sync({ force: true });
  await runSeed();
  sequelize.close();
  process.exit(0);
};

run();
