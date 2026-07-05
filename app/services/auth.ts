import { User } from "@/types/user";
import db from "../database/db";

export function login(username: string, password: string): User | null {
  const result = db.getFirstSync<User>(
    `SELECT * FROM users
     WHERE username = ?
     AND password = ?`,
    [username, password],
  );

  if (!result) {
    return null;
  }

  return result;
}
