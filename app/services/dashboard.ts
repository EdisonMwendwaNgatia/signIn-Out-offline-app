import db from "../database/db";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function getDashboardSummary() {
  const today = getToday();

  const total =
    db.getFirstSync<{ total: number }>(`SELECT COUNT(*) as total FROM workers`)
      ?.total ?? 0;

  const signedIn =
    db.getFirstSync<{ total: number }>(
      `
      SELECT COUNT(*) as total
      FROM attendance
      WHERE date=?
      AND time_in IS NOT NULL
      AND time_out IS NULL
      `,
      [today],
    )?.total ?? 0;

  const signedOut =
    db.getFirstSync<{ total: number }>(
      `
      SELECT COUNT(*) as total
      FROM attendance
      WHERE date=?
      AND time_out IS NOT NULL
      `,
      [today],
    )?.total ?? 0;

  const absent =
    db.getFirstSync<{ total: number }>(
      `
      SELECT COUNT(*) as total
      FROM attendance
      WHERE date=?
      AND attendance_status='Absent'
      `,
      [today],
    )?.total ?? 0;

  const late =
    db.getFirstSync<{ total: number }>(
      `
      SELECT COUNT(*) as total
      FROM attendance
      WHERE date=?
      AND attendance_status='Late'
      `,
      [today],
    )?.total ?? 0;

  return {
    total,
    pending: total - signedOut - signedIn - absent,
    signedIn,
    signedOut,
    absent,
    late,
  };
}
