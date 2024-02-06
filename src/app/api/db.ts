import mysql from "serverless-mysql";
import { environments } from "./environments";

export const conn = mysql({
  config: {
    host: environments.DB_HOST,
    password: environments.DB_PASSWORD,
    port: environments.DB_PORT,
    database: environments.DB_DATABASE,
    user: environments.DB_USER,
  },
});
