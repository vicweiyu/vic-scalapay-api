import { DataTypes } from 'sequelize';

import db from '../common/db';

const User = db.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: 'username',
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      field: 'password',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'last_name',
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'mobile_number',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'address',
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_locked',
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_deleted',
      defaultValue: 0,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users',
  }
);

export default User;
