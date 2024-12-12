import { DataTypes } from "sequelize";
import sequelize from "../configs/database";
import { Recruitment } from "./recruitment.model";



export const Company = sequelize.define(
  "Company",
  {
    taxId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    location: {
      type: DataTypes.STRING
    }
  },{
    tableName: "Company",
    timestamps: false
  }
)

