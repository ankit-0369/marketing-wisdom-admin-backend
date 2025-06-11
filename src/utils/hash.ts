import bcrypt from "bcryptjs";

export const hashPassword = async (plain: string) => {
  return await bcrypt.hash(plain, 12);
};

export const comparePassword = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};
