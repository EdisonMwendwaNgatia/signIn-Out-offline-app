import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("mbogatuu.db");

export function initializeDatabase() {
  const version =
    db.getFirstSync<{ user_version: number }>("PRAGMA user_version;")
      ?.user_version ?? 0;

  if (version < 1) {
    db.execSync(`

      CREATE TABLE users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        username TEXT UNIQUE NOT NULL,

        password TEXT NOT NULL,

        role TEXT NOT NULL

      );

    `);

    db.runSync(
      `INSERT INTO users(username,password,role)
       VALUES(?,?,?)`,
      ["supervisor", "4321", "supervisor"],
    );

    db.runSync(
      `INSERT INTO users(username,password,role)
       VALUES(?,?,?)`,
      ["gate", "1234", "gateperson"],
    );

    db.execSync(`PRAGMA user_version = 1;`);
  }

  if (version < 2) {
    db.execSync(`

      CREATE TABLE work_types(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT UNIQUE NOT NULL

      );

      CREATE TABLE workers(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        worker_number TEXT UNIQUE NOT NULL,

        full_name TEXT NOT NULL,

        work_id INTEGER NOT NULL,

        status TEXT DEFAULT 'Active',

        FOREIGN KEY(work_id)
        REFERENCES work_types(id)

      );

    `);

    const works = [
      "Tea Picking",

      "Weeding",

      "Pruning",

      "Spraying",

      "Fertilizer Application",

      "Harvesting",
    ];

    works.forEach((work) => {
      db.runSync(
        `INSERT INTO work_types(name)
         VALUES(?)`,
        [work],
      );
    });

    const workers = [
      ["MB001", "John Mwangi", 1],

      ["MB002", "Mary Wanjiru", 2],

      ["MB003", "Peter Otieno", 3],

      ["MB004", "James Kariuki", 1],

      ["MB005", "Grace Akinyi", 4],

      ["MB006", "Samuel Kiptoo", 1],

      ["MB007", "Lucy Njeri", 5],

      ["MB008", "David Kamau", 6],

      ["MB009", "Ann Chebet", 1],

      ["MB010", "Brian Mutiso", 2],
    ];

    workers.forEach((worker) => {
      db.runSync(
        `INSERT INTO workers
        (worker_number,full_name,work_id)

        VALUES(?,?,?)`,

        worker,
      );
    });

    db.execSync(`PRAGMA user_version = 2;`);
  }

  if (version < 3) {
    db.execSync(`

      CREATE TABLE attendance(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        worker_id INTEGER NOT NULL,

        gateperson_id INTEGER NOT NULL,

        date TEXT NOT NULL,

        time_in TEXT,

        time_out TEXT,

        attendance_status TEXT NOT NULL,

        FOREIGN KEY(worker_id)
        REFERENCES workers(id),

        FOREIGN KEY(gateperson_id)
        REFERENCES users(id),

        UNIQUE(worker_id,date)

      );

    `);

    db.execSync(`PRAGMA user_version = 3;`);
  }
}

export default db;
