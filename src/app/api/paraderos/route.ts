import { conn, createConnectionMysql } from "../db";

export const GET = async () => {
  const response = await conn.query(
    "SELECT id,name,description,time_available as date,ROUND(ST_Area(ST_GeomFromText(area,0)) * 1000000000) as area FROM tc_geofences",
  );
  console.log({ response });

  return Response.json({
    status: 200,
    paraderos: response,
  });
};
