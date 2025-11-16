import UnauthorizedException from "../exceptions/UnauthorizedException";
import adminRepository from "../repositories/admin.repository";
import { AuthPayload, AuthResponse } from "../types/auth.type";
import { generateToken } from "../utils/jwt";
import { comparePassword } from "../utils/password";

const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const admin = await adminRepository.getAdminByEmail(email);

    if (!admin) {
      throw new UnauthorizedException("Invalid Credentials");
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
      token,
    };
  },
};

export default authService;
