import { AuthAdmin } from "./admin.type";

// Interface untuk auth payload
export interface AuthPayload {
  id: string;
  email: string;
}

export interface AuthResponse {
  admin: AuthAdmin;
  token: string;
}
