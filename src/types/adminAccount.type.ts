export interface AdminAccount {
  id: string;
  provider: string;
  providerAccountId: string;
  adminId: string;
}

// DTO untuk create
export interface AdminAccountCreateDTO {
  provider: string;
  providerAccountId: string;
  adminId: string;
}
