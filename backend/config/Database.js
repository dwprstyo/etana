import { Sequelize } from "sequelize";

const db = new Sequelize("etana_db", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

export default db;