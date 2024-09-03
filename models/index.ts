'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config';

const basename = path.basename(__filename);
const db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password,{
   ...config,
   dialect: 'postgres',
   dialectModule: require('pg'),
  });

const initializeModels = async () => {
  const modelFiles = fs
    .readdirSync(__dirname)
    .filter((file: string) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
        file.indexOf('.test.ts') === -1
      );
    });

  await Promise.all(
    modelFiles.map(async (file: string) => {
      const modelModule = await import(path.join(__dirname, file));
      const model = modelModule.default(sequelize, DataTypes);
      db[model.name] = model;
    })
  );

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

export default initializeModels();
