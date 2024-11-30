'use server';

import { verifyPassword } from '@/lib/password';
import { setSessionTokenCookie } from '@/lib/session-cookies';
import { getScopedI18n } from '@/locales/server';
import { createSession } from '@/models/session';
import { userByEmail } from '@/models/user';
import { signinValidator } from '@/validator/signin.validator';
import type { z } from 'zod';

type SigninInput = z.infer<ReturnType<typeof signinValidator>>;

export const signin = async (input: SigninInput) => {
  const tError = await getScopedI18n('server-error');
  const tSignin = await getScopedI18n('signin-form');

  const validatedInput = signinValidator(tError).parse(input);

  const user = await userByEmail(validatedInput.email);

  if (!user) {
    throw tSignin('email-not-found');
  }

  const isPasswordValid = await verifyPassword(
    user.password,
    validatedInput.password
  );

  if (!isPasswordValid) {
    throw tSignin('invalid-credentials');
  }

  const session = await createSession(user.id);

  await setSessionTokenCookie(session.id, session.expiresAt);
};
