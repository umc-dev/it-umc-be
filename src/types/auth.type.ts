import { AuthAdmin } from "./admin.type";

// Interface untuk auth payload
export interface AuthPayload {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
}

export interface AuthResponse {
  admin: AuthAdmin;
  token: string;
}
