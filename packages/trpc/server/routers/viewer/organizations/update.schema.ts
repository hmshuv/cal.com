import { z } from "zod";

import { resizeBase64Image } from "@calcom/lib/server/resizeBase64Image";
import { teamMetadataSchema } from "@calcom/prisma/zod-utils";

export const ZUpdateInputSchema = z.object({
  name: z.string().optional(),
  orgId: z
    .string()
    .regex(/^\d+$/)
    .transform((id) => parseInt(id))
    .or(z.number())
    .optional(),
  bio: z.string().optional(),
  logo: z
    .string()
    .transform(async (val) => await resizeBase64Image(val))
    .optional()
    .nullable(),
  calVideoLogo: z
    .string()
    .optional()
    .nullable()
    .transform((v) => v || null),
  slug: z.string().optional(),
  hideBranding: z.boolean().optional(),
  hideBookATeamMember: z.boolean().optional(),
  brandColor: z.string().optional(),
  darkBrandColor: z.string().optional(),
  theme: z.string().optional().nullable(),
  timeZone: z.string().optional(),
  weekStart: z.string().optional(),
  timeFormat: z.number().optional(),
  metadata: teamMetadataSchema.unwrap().optional(),
});

export type TUpdateInputSchema = z.infer<typeof ZUpdateInputSchema>;
