import { pgEnum } from 'drizzle-orm/pg-core';

export const UserRoleEnum = pgEnum('user_role', ['customer', 'admin']);

export const InterviewStatusEnum = pgEnum('interview_status', [
  'sent',
  'pending',
  'done',
  'viewed',
  'canceled',
]);
