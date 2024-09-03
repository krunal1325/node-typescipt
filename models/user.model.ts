import { Model, DataTypes, Sequelize, ModelCtor, ModelStatic, ScopeOptions, WhereAttributeHash } from 'sequelize';

export type DeviceType = 'iOS' | 'android';

export const DEVICE_TYPES: DeviceType[] = ['iOS', 'android'];

export interface IUser {
  user_id: string;
  first_name: string;
  last_name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

class UserAttributes extends Model<IUser> implements IUser {
  public user_id!: string;
  public first_name!: string;
  public last_name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

export default (sequelize: Sequelize): typeof UserAttributes => {
  UserAttributes.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "users",
      paranoid: true,
      scopes: {},
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );

  return UserAttributes;
};

export { UserAttributes };
