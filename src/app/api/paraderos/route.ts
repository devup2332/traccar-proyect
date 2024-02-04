import { generatePool } from "../db";

export const GET = async () => {
  const conn = await generatePool();
  const [response] = await conn.query("SELECT * FROM paraderos_info");
  return Response.json({
    status: 200,
    paraderos: response,
  });
};
