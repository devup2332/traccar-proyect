export const environments = {
  DB_HOST: process.env.DB_HOST || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_DATABASE: process.env.DB_DATABASE || "",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "",
};
