import { DataTypes } from "sequelize";
import sequelize from "../configs/database";


export const Career = sequelize.define(
  "Career",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },{
    tableName: 'Careers',
    timestamps: false
  }
)