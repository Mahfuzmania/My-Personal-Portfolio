import { hash, verify } from "@node-rs/argon2";

const hashConfig = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

export async function hashPassword(rawPassword: string) {
  return hash(rawPassword, hashConfig);
}

export async function verifyPassword(rawPassword: string, hashedPassword: string) {
  return verify(hashedPassword, rawPassword, hashConfig);
}
