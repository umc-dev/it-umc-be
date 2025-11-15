import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  // 'salt rounds' menentukan seberapa kompleks proses hashing.
  // 10 atau 12 adalah standar yang baik.
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
