"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Career = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../configs/database"));
exports.Career = database_1.default.define("Career", {
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'Careers',
    timestamps: false
});
