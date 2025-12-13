import { AdminAccountCreateDTO } from "../types/adminAccount.type";
import { db } from "../utils/prisma";

const adminAccountRepository = {
  async findByProvider(provider: string, providerAccountId: string) {
    return await db.adminAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },

      include: {
        admin: true,
      },
    });
  },

  async createAccount(data: AdminAccountCreateDTO) {
    return await db.adminAccount.create({ data });
  },
};

export default adminAccountRepository;
