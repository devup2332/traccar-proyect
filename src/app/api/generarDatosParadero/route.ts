import { generatePool } from "../db";
import moment from "moment";

export const POST = async () => {
  const pool = await generatePool();
  const [eventos] = await pool.query(`
    SELECT * FROM tc_events WHERE type = "geofenceEnter"
`);

  const [paraderos] = await pool.query(`
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
      if (idMax !== id) return;
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

        await pool.query(
          `UPDATE paraderos_info SET hora_estimada = "${d}" WHERE id=${id + 1} `,
        );

        index++;
      }
    } else {
      const d = moment(eventtime).subtract(5, "hours").toISOString();
      const result =
        ((new Date(eventtime).getTime() -
          new Date(newZones[id - 9]).getTime()) *
          1000) /
        60;
      let status = null;
      status = result >= 20 ? null : null;
      status = result <= 0 ? "a tiempo" : null;
      status = result > 0 && result < 20 ? "tarde" : null;
      // console.log({
      //   newZones,
      //   status,
      //   result,
      //   date1: new Date(newZones[id - 9]).getTime(),
      // });
      if (!status) return;

      await pool.query(
        `UPDATE paraderos_info SET hora_llegada = "${d}",estado = ${status},diferencia_horas = ${result} WHERE id=${id} `,
      );
    }
  }

  const [newInfo] = await pool.query(`
    SELECT * FROM paraderos_info
`);
  const res = (newInfo as any).filter((n: any) => n.estado);
  return Response.json({
    message: "Ok",
    data: res[res.length - 1],
  });
};
