import db from "../database/db";
import { Worker } from "./workers";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function getAvailableWorkers(): Worker[] {
  return db.getAllSync<Worker>(
    `
    SELECT

      w.id,
      w.worker_number,
      w.full_name,
      w.work_id,
      w.status,
      wt.name AS work_name

    FROM workers w

    INNER JOIN work_types wt
      ON wt.id = w.work_id

    LEFT JOIN attendance a
      ON a.worker_id = w.id
      AND a.date = ?

    WHERE

      w.status='Active'

      AND

      (
        a.id IS NULL
        OR
        a.time_out IS NULL
      )

    ORDER BY w.worker_number;
    `,
    [getToday()],
  );
}
