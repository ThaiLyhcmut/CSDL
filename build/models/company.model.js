"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../configs/database"));
exports.Company = database_1.default.define("Company", {
    taxId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    location: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "Company",
    timestamps: false
});
