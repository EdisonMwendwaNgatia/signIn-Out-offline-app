import db from "../database/db";

export interface Worker {
  id: number;
  worker_number: string;
  full_name: string;
  work_id: number;
  work_name: string;
  status: string;
}

export function getWorkers(): Worker[] {
  return db.getAllSync<Worker>(`
    SELECT
      workers.id,
      workers.worker_number,
      workers.full_name,
      workers.work_id,
      workers.status,
      work_types.name AS work_name
    FROM workers
    INNER JOIN work_types
      ON workers.work_id = work_types.id
    ORDER BY workers.worker_number;
  `);
}
