"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
});
sequelize.authenticate().then(() => {
    console.log('Kết nối database thành công');
}).catch((error) => {
    console.error('Kết nối database thất bại', error);
});
exports.default = sequelize;
