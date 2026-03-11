import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type SavedAttachment = {
  id: string;
  storageName: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  createdAt: string;
};

const baseDir = process.env.CONTACT_ATTACHMENT_DIR
  ? path.resolve(process.cwd(), process.env.CONTACT_ATTACHMENT_DIR)
  : path.join(process.cwd(), "data", "contact-uploads");

export async function ensureContactUploadDir() {
  await fs.mkdir(baseDir, { recursive: true });
}

export function getAttachmentPath(storageName: string) {
  return path.join(baseDir, storageName);
}

function sanitizeFilename(name: string) {
  const fallback = randomUUID();
  const safe = name
    .normalize("NFKD")
    .replace(/[^\w.\-]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 100);
  return safe || fallback;
}

function getExtension(name: string) {
  const ext = path.extname(name).toLowerCase();
  return ext.length > 0 ? ext : ".bin";
}

export async function saveUploadedFile(file: File) {
  await ensureContactUploadDir();
  const safeName = sanitizeFilename(file.name || "attachment");
  const storageName = `${Date.now()}-${randomUUID()}-${safeName}`;
  const filePath = getAttachmentPath(storageName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return {
    id: randomUUID(),
    storageName,
    originalName: safeName,
    mimeType: file.type || "application/octet-stream",
    size: buffer.byteLength,
    path: filePath,
    createdAt: new Date().toISOString(),
  } as SavedAttachment;
}

export async function removeUploadedFile(storageName: string) {
  const filePath = getAttachmentPath(storageName);
  await fs.rm(filePath, { force: true });
}
