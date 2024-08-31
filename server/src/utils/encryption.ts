import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const saltRounds = 2;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (
  inputPassword: string,
  storedHashedPassword: string
) => {
  const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
  return isMatch;
};
