import { DataTypes } from "sequelize";
import sequelize from "../configs/database";



export const User = sequelize.define(
  "User",
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createDate: {
      type: DataTypes.DATE
    },
    fullName: {
      type: DataTypes.STRING(100)
    },
    birthday: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Famale', 'Other')
    },
    phone: {
      type: DataTypes.STRING(15)
    },
    address: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.ENUM('Applicant', 'Employer', 'Admin')
    },
    adminUserID: {
      type: DataTypes.INTEGER
    }
  },{
    tableName: "User",
    timestamps: false
  }
)