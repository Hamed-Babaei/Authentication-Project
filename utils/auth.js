import { hash } from "bcryptjs";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export { hashPassword };
