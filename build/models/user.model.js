"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../configs/database"));
exports.User = database_1.default.define("User", {
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    createDate: {
        type: sequelize_1.DataTypes.DATE
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    birthday: {
        type: sequelize_1.DataTypes.DATE
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('Male', 'Famale', 'Other')
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(15)
    },
    address: {
        type: sequelize_1.DataTypes.TEXT
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('Applicant', 'Employer', 'Admin')
    },
    adminUserID: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: "User",
    timestamps: false
});
