import { QuestionTable } from '@/packages/db/schemas';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const zInsertQuestion = createInsertSchema(QuestionTable, {
  value: z.string().min(1),
});

export type InsertQuestion = z.infer<typeof zInsertQuestion>;
