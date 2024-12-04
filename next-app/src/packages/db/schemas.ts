import { relations } from 'drizzle-orm';
import { pgEnum, pgTable } from 'drizzle-orm/pg-core';

// Enums for roles and statuses
export const UserRole = pgEnum('user_role', ['customer', 'admin']);
export const InterviewStatus = pgEnum('interview_status', [
  'sent',
  'pending',
  'done',
  'viewed',
  'canceled',
]);

// User Table Schema
export const UserTable = pgTable('user', (t) => ({
  id: t
    .varchar('id')
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

// Organization Table Schema
export const OrganizationTable = pgTable('organization', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.varchar('name').notNull(),
  description: t.varchar('description'),
  ownerId: t
    .varchar('user_id')
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

// Organization User Table Schema
export const OrganizationUserTable = pgTable('organization_user', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: t
    .varchar('user_id')
    .notNull()
    .references(() => UserTable.id),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

// Relations for Organization
export const OrganizationRelations = relations(
  OrganizationTable,
  ({ one }) => ({
    owner: one(UserTable, {
      fields: [OrganizationTable.ownerId],
      references: [UserTable.id],
    }),
  })
);

// Relations for Organization User
export const OrganizationUserRelations = relations(
  OrganizationUserTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [OrganizationUserTable.userId],
      references: [UserTable.id],
    }),
    organization: one(OrganizationTable, {
      fields: [OrganizationUserTable.organizationId],
      references: [OrganizationTable.id],
    }),
  })
);

// Session Table Schema
export const SessionTable = pgTable('session', (t) => ({
  id: t.varchar('id').primaryKey(),
  userId: t
    .varchar('user_id')
    .notNull()
    .references(() => UserTable.id),
  organizationId: t
    .varchar('organization_id')
    .references(() => OrganizationTable.id),
  expiresAt: t
    .timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    })
    .notNull(),
}));

// Relations for Session
export const SessionRelations = relations(SessionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SessionTable.userId],
    references: [UserTable.id],
  }),
  organization: one(OrganizationTable, {
    fields: [SessionTable.organizationId],
    references: [OrganizationTable.id],
  }),
}));

// Image Table Schema
export const ImageTable = pgTable('image', (t) => ({
  id: t.serial('id').primaryKey(),
  url: t.varchar('url').notNull(),
  type: t.varchar('type'),
}));

// Question Table Schema
export const QuestionTable = pgTable('question', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: t.varchar('value').notNull(),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

// Answer Table Schema
export const AnswerTable = pgTable('answer', (t) => ({
  id: t
    .varchar('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: t.varchar('value').notNull(),
  questionId: t
    .varchar('question_id')
    .notNull()
    .references(() => QuestionTable.id),
  interviewId: t
    .serial('interview_id')
    .notNull()
    .references(() => InterviewTable.id),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

// Candidate Table Schema
export const CandidateTable = pgTable('candidate', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.varchar('name').notNull(),
  email: t.varchar('email').notNull(),
  phone: t.varchar('phone').notNull(),
  address: t.varchar('address').notNull(),
  title: t.varchar('title').notNull(),
  resume: t.varchar('image'),
  observation: t.text('observation'),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id),
}));

// Interview Table Schema
export const InterviewTable = pgTable('interview', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.varchar('name').notNull(),
  description: t.varchar('description'),
  candidateId: t
    .serial('candidate_id')
    .notNull()
    .references(() => CandidateTable.id),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id),
  password: t.varchar({ length: 255 }).notNull(),
  token: t.varchar({ length: 255 }).notNull(),
  createdAt: t
    .timestamp('created_at', {
      withTimezone: true,
      mode: 'date',
    })
    .notNull(),
  expiresAt: t
    .timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    })
    .notNull(),
  status: InterviewStatus().default('sent').notNull(),
}));

// Relations for Interview
export const InterviewRelations = relations(InterviewTable, ({ one }) => ({
  organization: one(OrganizationTable, {
    fields: [InterviewTable.organizationId],
    references: [OrganizationTable.id],
  }),
  candidate: one(CandidateTable, {
    fields: [InterviewTable.candidateId],
    references: [CandidateTable.id],
  }),
}));

// Add Question Relations
export const QuestionRelations = relations(QuestionTable, ({ one, many }) => ({
  organization: one(OrganizationTable, {
    fields: [QuestionTable.organizationId],
    references: [OrganizationTable.id],
  }),
  answers: many(AnswerTable),
}));

// Add Answer Relations
export const AnswerRelations = relations(AnswerTable, ({ one }) => ({
  question: one(QuestionTable, {
    fields: [AnswerTable.questionId],
    references: [QuestionTable.id],
  }),
  interview: one(InterviewTable, {
    fields: [AnswerTable.interviewId],
    references: [InterviewTable.id],
  }),
}));
