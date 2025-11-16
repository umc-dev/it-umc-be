// Interface untuk auth payload
export interface AuthPayload {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
}
