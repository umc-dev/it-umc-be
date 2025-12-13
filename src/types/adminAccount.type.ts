export interface AdminAccount {
  id: string;
  provider: string;
  providerAccountId: string;
  adminId: string;
  access_token?: string | null;
  refresh_token?: string | null;
  expires_at?: number | null;
}

// DTO untuk create
export interface AdminAccountCreateDTO {
  provider: string;
  providerAccountId: string;
  adminId: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
}
