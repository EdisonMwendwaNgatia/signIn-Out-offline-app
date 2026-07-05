import db from "../database/db";
import { Worker } from "./workers";

export interface AttendanceRecord {
  id: number;
  date: string;
  time_in: string | null;
  time_out: string | null;
  attendance_status: string;
}

export function getWorkers(): Worker[] {
  return db.getAllSync<Worker>(`
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

    ORDER BY w.worker_number ASC;
  `);
}

export function getAttendanceHistory(
  workerId: number,
  fromDate?: string,
  toDate?: string,
): AttendanceRecord[] {
  if (fromDate && toDate) {
    return db.getAllSync<AttendanceRecord>(
      `
      SELECT
        id,
        date,
        time_in,
        time_out,
        attendance_status

      FROM attendance

      WHERE worker_id=?

      AND date BETWEEN ? AND ?

      ORDER BY date ASC;
      `,
      [workerId, fromDate, toDate],
    );
  }

  return db.getAllSync<AttendanceRecord>(
    `
    SELECT
      id,
      date,
      time_in,
      time_out,
      attendance_status

    FROM attendance

    WHERE worker_id=?

    ORDER BY date ASC;
    `,
    [workerId],
  );
}
