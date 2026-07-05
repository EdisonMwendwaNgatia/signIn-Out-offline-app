import { SQLiteDatabase } from "expo-sqlite";

export function seedUsers(db: SQLiteDatabase) {
  db.runSync(
    `INSERT INTO users(username,password,role)
     VALUES (?,?,?)`,
    ["supervisor", "4321", "supervisor"],
  );

  db.runSync(
    `INSERT INTO users(username,password,role)
     VALUES (?,?,?)`,
    ["gate", "1234", "gateperson"],
  );
}

export function seedWorkTypes(db: SQLiteDatabase) {
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
       VALUES (?)`,
      [work],
    );
  });
}

export function seedWorkers(db: SQLiteDatabase) {
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
      `
      INSERT INTO workers(
        worker_number,
        full_name,
        work_id
      )
      VALUES (?,?,?)
      `,
      worker,
    );
  });
}
