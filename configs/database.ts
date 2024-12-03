import { Sequelize } from "sequelize";


const sequelize = new Sequelize(
  process.env.MYSQL_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Kết nối database thành công');
}).catch((error) => {
  console.error('Kết nối database thất bại', error);
});

export default sequelize