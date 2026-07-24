import { AuthAdmin } from "./admin.type";

// Interface untuk auth payload
export interface AuthPayload {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "DOSEN" | "EDITOR";
}

export interface AuthResponse {
  admin: AuthAdmin;
  token: string;
}
