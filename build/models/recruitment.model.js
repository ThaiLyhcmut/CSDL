"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recruitment = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../configs/database"));
const category_model_1 = require("./category.model");
exports.Recruitment = database_1.default.define("Recruitment", {
    recruitmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    createAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    employerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    workPosition: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    location: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    description: {
        type: sequelize_1.DataTypes.TEXT()
    },
    experience: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    salary: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2)
    },
    theNumberOfOpenings: {
        type: sequelize_1.DataTypes.INTEGER
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: "Recruitment",
    timestamps: false
});
category_model_1.Category.belongsTo(exports.Recruitment, { foreignKey: 'recruitmentId' });
exports.Recruitment.hasMany(category_model_1.Category, { foreignKey: 'recruitmentId' });
