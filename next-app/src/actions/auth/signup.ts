'use server';

import { hashPassword } from '@/lib/password';
import { setSessionTokenCookie } from '@/lib/session-cookies';
import { createSession } from '@/models/session';
import { checkExisting, create } from '@/models/user';
import { z } from 'zod';

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(31, 'Username must be less than 31 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and dashes'
    ),
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(4, 'City must be at least 4 characters'),
  country: z.string().min(4, 'Country must be at least 4 characters'),
  zipCode: z.string().min(2, 'Zip code must be at least 2 characters'),
});

export const signup = async (input: z.infer<typeof signupSchema>) => {
  const validatedInput = signupSchema.parse(input);

  const existingUser = await checkExisting(
    validatedInput.username,
    validatedInput.email
  );

  if (existingUser) {
    throw 'User already exists';
  }

  const passwordHash = await hashPassword(validatedInput.password);

  const [user] = await create({
    ...validatedInput,
    password: passwordHash,
  });

  if (!user) {
    throw 'Failed to create user';
  }

  const session = await createSession(user.id);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
