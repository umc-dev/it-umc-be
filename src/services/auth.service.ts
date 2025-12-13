import UnauthorizedException from "../exceptions/UnauthorizedException";
import adminRepository from "../repositories/admin.repository";
import adminAccountRepository from "../repositories/adminAccount.respository";
import { AuthPayload, AuthResponse } from "../types/auth.type";
import { generateToken } from "../utils/jwt";
import { comparePassword } from "../utils/password";

const authService = {
  async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    const admin = await adminRepository.getAdminByEmail(email);

    if (!admin) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    if (!admin.password) {
      throw new UnauthorizedException("Please login with Google");
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const authPayload: AuthPayload = {
      id: admin.id,
      email: admin.email,
    };

    const token = generateToken(authPayload);

    return {
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        avatar: admin.avatar,
      },
      token,
    };
  },

  async loginWithGoogle(params: {
    provider: "google";
    providerAccountId: string;
    email: string;
    name?: string;
    avatar?: string;
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
  }): Promise<AuthResponse> {
    // Whitelist
    const admin = await adminRepository.getAdminByEmail(params.email);

    if (!admin) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const existingAccount = await adminAccountRepository.findByProvider(
      params.provider,
      params.providerAccountId,
    );

    if (!existingAccount) {
      await adminAccountRepository.createAccount({
        provider: params.provider,
        providerAccountId: params.providerAccountId,
        adminId: admin.id,
        access_token: params.access_token,
        refresh_token: params.refresh_token,
        expires_at: params.expires_at,
      });
    }

    const authPayload: AuthPayload = {
      id: admin.id,
      email: admin.email,
    };

    const token = generateToken(authPayload);

    const { password, ...safeAdmin } = admin;

    return {
      admin: safeAdmin,
      token,
    };
  },
};

export default authService;
