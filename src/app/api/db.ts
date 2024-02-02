import mysql from "serverless-mysql";
import mysql2 from "mysql2/promise";
import { environments } from "./environments";

export const conn = mysql({
  config: {
    host: environments.DB_HOST,
    password: environments.DB_PASSWORD,
    port: environments.DB_PORT,
    database: environments.DB_DATABASE,
    user: environments.DB_USER,
    insecureAuth: false,
  },
});

export const createConnectionMysql = async () => {
  return await mysql2.createConnection({
    host: environments.DB_HOST,
    password: environments.DB_PASSWORD,
    port: environments.DB_PORT,
    database: environments.DB_DATABASE,
    user: environments.DB_USER,
  });
};
console.log({ environments });
