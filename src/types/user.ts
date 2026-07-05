export type UserRole = "supervisor" | "gateperson";

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}
