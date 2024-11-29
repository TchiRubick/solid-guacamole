'server only';

import { db } from '@/packages/db';

export const userByIdentifier = (identifier: string) =>
  db.query.UserTable.findFirst({
    where: (q, { eq, or }) =>
      or(eq(q.email, identifier), eq(q.username, identifier)),
  });
