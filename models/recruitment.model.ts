import { DataTypes } from "sequelize";
import sequelize from "../configs/database";


export const Recruitment = sequelize.define(
  "Recruitment",
  {
    recruitmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    createAt: {
      type: DataTypes.DATE,
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255)
    },
    workPosition: {
      type: DataTypes.STRING(100)
    },
    location: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.TEXT()
    },
    experience: {
      type: DataTypes.STRING(50)
    },
    salary: {
      type: DataTypes.DECIMAL(15, 2)
    },
    theNumberOfOpenings: {
      type: DataTypes.INTEGER
    },
    deadline: {
      type: DataTypes.DATE
    }
  },{
    tableName: "Recruitment",
    timestamps: false
  }
)