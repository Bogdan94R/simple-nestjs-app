import * as bcrypt from 'bcrypt';

export const comparePassword = (
  data: string | Buffer,
  encrypted: string,
): Promise<boolean> => {
  return bcrypt.compare(data, encrypted);
};

export const hash = async (value: string, rounds?: number): Promise<string> => {
  const bcryptSalt = await bcrypt.genSalt(rounds || 10);
  return bcrypt.hash(value, bcryptSalt);
};
