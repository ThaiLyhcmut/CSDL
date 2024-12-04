import { DataTypes } from "sequelize";
import sequelize from "../configs/database";



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