import { DataTypes } from "sequelize";
import sequelize from "../configs/database";
import { Recruitment } from "./recruitment.model";



export const Category = sequelize.define(
  "Category",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    recruitmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  },{
    tableName: "Category",
    timestamps: false
  }
)

