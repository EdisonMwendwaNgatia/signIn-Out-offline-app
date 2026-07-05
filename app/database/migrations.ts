import { SQLiteDatabase } from "expo-sqlite";
import { seedUsers, seedWorkTypes, seedWorkers } from "./seed";

export function runMigrations(db: SQLiteDatabase) {
  const version =
    db.getFirstSync<{ user_version: number }>("PRAGMA user_version;")
      ?.user_version ?? 0;

  // ==========================
  // VERSION 1
  // ==========================

  if (version < 1) {
    db.execSync(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      );
    `);

    seedUsers(db);

    db.execSync(`
      PRAGMA user_version = 1;
    `);
  }

  // ==========================
  // VERSION 2
  // ==========================

  if (version < 2) {
    db.execSync(`
      CREATE TABLE work_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE workers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        worker_number TEXT UNIQUE NOT NULL,

        full_name TEXT NOT NULL,

        work_id INTEGER NOT NULL,

        status TEXT DEFAULT 'Active',

        FOREIGN KEY(work_id)
        REFERENCES work_types(id)
      );
    `);

    seedWorkTypes(db);

    seedWorkers(db);

    db.execSync(`
      PRAGMA user_version = 2;
    `);
  }

  // ==========================
  // VERSION 3
  // ==========================

  if (version < 3) {
    db.execSync(`
      CREATE TABLE attendance(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    worker_id INTEGER NOT NULL,

    gateperson_id INTEGER,

    date TEXT NOT NULL,

    time_in TEXT,

    time_out TEXT,

    attendance_status TEXT NOT NULL DEFAULT 'Absent',

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(worker_id) REFERENCES workers(id),

    FOREIGN KEY(gateperson_id) REFERENCES users(id),

    UNIQUE(worker_id,date)

);
    `);

    db.execSync(`
      PRAGMA user_version = 3;
    `);
  }

  console.log("Database migrated successfully.");
}
