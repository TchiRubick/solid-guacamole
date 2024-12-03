'use server';

import { hashPassword } from '@/lib/password';
import { setSessionTokenCookie } from '@/lib/session-cookies';
import { getScopedI18n } from '@/locales/server';
import { createSession } from '@/models/session';
import { checkExisting, create } from '@/models/user';
import { signupSchema } from '@/validator/signup.validator';
import type { z } from 'zod';
import { getOneOrganizationByUserId } from '@/models/organization/$getOne';

type SigninInput = z.infer<ReturnType<typeof signupSchema>>;

export const signup = async (input: SigninInput) => {
  const tError = await getScopedI18n('server-error');
  const tSignup = await getScopedI18n('signup-form');
  const validatedInput = signupSchema(tError).parse(input);

  const existingUser = await checkExisting(
    validatedInput.username,
    validatedInput.email
  );

  if (existingUser) {
    throw tSignup('user-already-exists');
  }

  const passwordHash = await hashPassword(validatedInput.password);

  const [user] = await create({
    ...validatedInput,
    password: passwordHash,
  });

  if (!user) {
    throw tSignup('failed-to-create-user');
  }

  const organization = await getOneOrganizationByUserId(user.id);

  if (!organization) {
    throw new Error('Organization not found');
  }

  const session = await createSession(user.id, organization.organizationId);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
