import { DataTypes } from "sequelize";
import sequelize from "../configs/database";


export const Employer = sequelize.define(
  "Employer",
  {
    employerId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    comanyId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },{
    tableName: 'Employer',
    timestamps: false
  }
)