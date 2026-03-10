import { hash } from "@node-rs/argon2";

const rawPassword = process.argv[2];

if (!rawPassword || rawPassword.length < 8) {
  console.error("Usage: node scripts/generate-password-hash.mjs <password-at-least-8-chars>");
  process.exit(1);
}

const hashConfig = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

const hashed = await hash(rawPassword, hashConfig);
console.log(hashed);
