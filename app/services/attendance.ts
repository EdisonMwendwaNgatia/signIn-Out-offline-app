import db from "../database/db";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getCurrentTime() {
  const now = new Date();

  return now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAttendanceStatus() {
  const now = new Date();

  const limit = new Date();

  limit.setHours(7, 30, 0, 0);

  return now > limit ? "Late" : "Present";
}

// ======================================
// SIGN IN
// ======================================

export function signInWorker(workerId: number, gatepersonId: number) {
  const today = getToday();

  const exists = db.getFirstSync(
    `
    SELECT id
    FROM attendance
    WHERE worker_id=?
      AND date=?;
    `,
    [workerId, today],
  );

  if (exists) {
    throw new Error("Worker already has an attendance record today.");
  }

  db.runSync(
    `
    INSERT INTO attendance(
      worker_id,
      gateperson_id,
      date,
      time_in,
      attendance_status
    )
    VALUES(?,?,?,?,?)
    `,
    [workerId, gatepersonId, today, getCurrentTime(), getAttendanceStatus()],
  );
}

// ======================================
// SIGN OUT
// ======================================

export function signOutWorker(workerId: number) {
  const today = getToday();

  const record = db.getFirstSync(
    `
    SELECT id
    FROM attendance
    WHERE worker_id=?
      AND date=?;
    `,
    [workerId, today],
  );

  if (!record) {
    throw new Error("Worker has not signed in today.");
  }

  db.runSync(
    `
    UPDATE attendance

    SET time_out=?

    WHERE worker_id=?
      AND date=?;
    `,
    [getCurrentTime(), workerId, today],
  );
}

// ======================================
// MARK ABSENT
// ======================================

export function markWorkerAbsent(workerId: number, gatepersonId: number) {
  const today = getToday();

  const exists = db.getFirstSync(
    `
    SELECT id
    FROM attendance
    WHERE worker_id=?
      AND date=?;
    `,
    [workerId, today],
  );

  if (exists) {
    throw new Error("Worker already has an attendance record today.");
  }

  db.runSync(
    `
    INSERT INTO attendance(
      worker_id,
      gateperson_id,
      date,
      attendance_status
    )
    VALUES(?,?,?,?)
    `,
    [workerId, gatepersonId, today, "Absent"],
  );
}

// ======================================
// GET SIGNED-IN WORKERS
// ======================================

export function getSignedInWorkersToday(): number[] {
  const today = getToday();

  const rows = db.getAllSync<{ worker_id: number }>(
    `
    SELECT worker_id

    FROM attendance

    WHERE date=?

      AND attendance_status != 'Absent'

      AND time_out IS NULL;
    `,
    [today],
  );

  return rows.map((row) => row.worker_id);
}

// ======================================
// GET ABSENT WORKERS
// ======================================

export function getAbsentWorkersToday(): number[] {
  const today = getToday();

  const rows = db.getAllSync<{ worker_id: number }>(
    `
    SELECT worker_id

    FROM attendance

    WHERE date=?

      AND attendance_status='Absent';
    `,
    [today],
  );

  return rows.map((row) => row.worker_id);
}
