import { createHash } from "crypto";

const MAX_TEXT_LENGTH = 5000;

export function sanitizeTextInput(value: string, maxLength = MAX_TEXT_LENGTH) {
  if (!value) {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeMultilineInput(value: string, maxLength = MAX_TEXT_LENGTH) {
  return sanitizeTextInput(value.replace(/\r\n/g, "\n"), maxLength);
}

export function hashInput(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeLocale(value: string) {
  return value === "bn" ? "bn" : "en";
}
