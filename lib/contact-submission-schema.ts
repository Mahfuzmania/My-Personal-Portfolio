import { z } from "zod";

export const contactSubmissionStatusSchema = z.enum(["new", "reviewed", "replied", "archived"]);

const attachmentSchema = z.object({
  id: z.string().min(4),
  storageName: z.string().min(4),
  originalName: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().int().nonnegative(),
  createdAt: z.string().datetime({ offset: true }),
  path: z.string().min(1),
});

export const createContactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(255),
  subject: z.string().trim().min(3).max(160).optional(),
  company: z.string().trim().max(140).optional(),
  message: z.string().trim().min(30).max(5000),
  ipHash: z.string().min(8),
  userAgentHash: z.string().min(8),
});

export const updateContactSubmissionStatusSchema = z.object({
  status: contactSubmissionStatusSchema,
});

export const contactSubmissionSchema = z.object({
  id: z.string().min(6),
  name: z.string().min(2).max(120),
  email: z.string().email().max(255),
  subject: z.string().max(160).optional().nullable(),
  company: z.string().max(140).optional().nullable(),
  message: z.string().min(30).max(5000),
  status: contactSubmissionStatusSchema,
  ipHash: z.string().min(8),
  userAgentHash: z.string().min(8),
  attachments: z.array(attachmentSchema).default([]),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});
