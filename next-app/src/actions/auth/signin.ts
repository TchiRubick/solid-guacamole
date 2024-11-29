'use server';

import { verifyPassword } from '@/lib/password';
import { setSessionTokenCookie } from '@/lib/session-cookies';
import { createSession } from '@/models/session';
import { userByIdentifier } from '@/models/user';
import { z } from 'zod';

export const signinSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Identifier must be at least 3 characters')
    .max(255, 'Identifier must be less than 255 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
});

export const signin = async (input: z.infer<typeof signinSchema>) => {
  const validatedInput = signinSchema.parse(input);

  const user = await userByIdentifier(validatedInput.identifier);

  if (!user) {
    throw 'Invalid credentials';
  }

  await verifyPassword(user.password, validatedInput.password);

  const session = await createSession(user.id);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
