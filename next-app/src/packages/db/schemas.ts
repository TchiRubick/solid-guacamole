import { relations } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';

export const UserRole = pgEnum('user_role', ['customer', 'admin']);

export const UserTable = pgTable('user', (t) => ({
  id: t
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: t.varchar({ length: 255 }).notNull(),
  password: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull(),
  address: t.varchar({ length: 255 }),
  phone: t.varchar({ length: 255 }),
  city: t.varchar({ length: 255 }),
  country: t.varchar({ length: 255 }),
  zipCode: t.varchar({ length: 255 }),
  emailVerified: t.timestamp({ mode: 'date', withTimezone: true }),
  image: t.varchar({ length: 255 }),
  role: UserRole().default('customer'),
}));

export const SessionTable = pgTable('session', (t) => ({
  id: t.text('id').primaryKey(),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => UserTable.id),
  expiresAt: t
    .timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    })
    .notNull(),
}));

export const ImageTable = pgTable('image', (t) => ({
  id: t.serial('id').primaryKey(),
  url: t.text('url').notNull(),
  type: t.text('type'),
}));

export const SessionRelations = relations(SessionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SessionTable.userId],
    references: [UserTable.id],
  }),
}));

export const QuestionTable = pgTable('question', (t) => ({
  id: t.serial('id').primaryKey(),
  value: t.text('value').notNull(),
}));
