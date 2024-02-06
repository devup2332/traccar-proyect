import moment from "moment";
import { conn } from "../db";

export const GET = async () => {
  const eventos = await conn.query(`
    SELECT * FROM tc_events WHERE type = "geofenceEnter"
`);

  const paraderos = await conn.query(`
    SELECT * FROM paraderos_info
`);
  const newZones: string[] = [];
  for (const e of eventos as any) {
    const { eventtime, geofenceid, id } = e;
    const idMax = Math.max(
      ...(eventos as any)
        .filter((e: any) => e.geofenceid === geofenceid)
        .map((e: any) => e.id),
    );
    if (geofenceid === 8) {
      if (idMax < id) continue;
      const initalDate = moment(eventtime)
        .subtract(5, "hours")
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      await conn.query(
        `UPDATE paraderos_info SET hora_estimada = "${initalDate}",hora_llegada = "${initalDate}" WHERE id=${geofenceid} `,
      );
      let index = 0;
      let backup = "";
      for (const p of paraderos as any) {
        const { id } = p;
        let m = null;
        if (index === 0) {
          m = moment(eventtime)
            .add((paraderos as any)[index + 1]?.intervalo || 0, "minutes")
            .subtract(5, "hours");
        } else {
          m = moment(backup)
            .add((paraderos as any)[index + 1]?.intervalo || 0, "minutes")
            .subtract(5, "hours");
        }

        const d = m?.toISOString().slice(0, 19).replace("T", " ")!;
        backup = d;
        newZones.push(d);

        await conn.query(
          `UPDATE paraderos_info SET hora_estimada = "${d}" WHERE id=${id + 1} `,
        );

        index++;
      }
    } else {
      const idMax = Math.max(
        ...(eventos as any)
          .filter((e: any) => e.geofenceid === 8)
          .map((e: any) => e.id),
      );
      if (idMax > id) continue;
      const d = moment(eventtime)
        .subtract(5, "hours")
        .toISOString()
        .replace("T", " ")
        .slice(0, 19);
      const d1 = new Date(eventtime).getTime();
      const d2 = new Date(newZones[geofenceid - 9]).getTime();
      const result = Math.round((d1 - d2) / 1000 / 60);
      let status = null;
      if (result <= 0) status = "a tiempo";
      if (result > 0 && result < 20) status = "tarde";
      if (status === null) continue;

      await conn.query(
        `UPDATE paraderos_info SET hora_llegada = "${d}",estado = "${status}",diferencia_horas = ${result} WHERE id=${geofenceid} `,
      );
    }
  }

  const newInfo = await conn.query(`
    SELECT * FROM paraderos_info
`);
  const res = (newInfo as any).filter((n: any) => n.estado);
  return Response.json({
    message: "Ok",
    data: res[res.length - 1] || [],
  });
};
