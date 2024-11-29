import type { TError } from '@/locales/server';
import { z } from 'zod';

export const signinValidator = (t: TError) =>
  z.object({
    email: z.string().min(1, t('min-email-length')).email(),
    password: z
      .string()
      .min(6, t('min-password-length'))
      .max(255, t('max-password-length')),
  });
