'server only';

import { db } from '@/packages/db';

export const userByEmail = (email: string) =>
  db.query.UserTable.findFirst({
    where: (q, { eq, or }) => or(eq(q.email, email)),
  });
