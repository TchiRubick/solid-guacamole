'use server';

import { hashPassword } from '@/lib/password';
import { setSessionTokenCookie } from '@/lib/session-cookies';
import { getScopedI18n } from '@/locales/server';
import { createMassOrganizationUser } from '@/models/organization-user/$create-masse';
import { createSession } from '@/models/session';
import { checkExisting, create } from '@/models/user';
import { existEmailInvitation } from '@/models/user-organization-invite/$exist-email-invitation';
import { signupSchema } from '@/validator/signup.validator';
import type { z } from 'zod';

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

  const existsInvitations = await existEmailInvitation(validatedInput.email);

  await createMassOrganizationUser(
    existsInvitations.map((invitation) => ({
      userId: user.id,
      organizationId: invitation.organizationId,
    }))
  );

  const session = await createSession(user.id, null);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
