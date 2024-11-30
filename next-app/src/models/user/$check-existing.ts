'server only';

import { db } from '@/packages/db';

export const checkExisting = async (username: string, email: string) =>
  db.query.UserTable.findFirst({
    where: (q, { eq }) => eq(q.username, username) || eq(q.email, email),
  });
