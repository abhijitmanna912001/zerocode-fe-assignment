import bcrypt from "bcryptjs";

export const hashPassword = async (plainText) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainText, salt);
};

export const comparePassword = async (plainText, hashedPassword) => {
  return await bcrypt.compare(plainText, hashedPassword);
};
