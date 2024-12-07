import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { InterviewStatusEnum } from './enums';
import { OrganizationTable } from './organization';

export const CandidateTable = pgTable('candidate', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.varchar('name').notNull(),
  email: t.varchar('email').notNull(),
  phone: t.varchar('phone').notNull(),
  address: t.varchar('address').notNull(),
  title: t.varchar('title').notNull(),
  resume: t.varchar('resume'),
  observation: t.text('observation'),
  organizationId: t
    .varchar('organization_id')
    .notNull()
    .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
}));

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
  password: t.varchar('password', { length: 255 }).notNull(),
  token: t.varchar('token', { length: 255 }).notNull(),
  createdAt: t
    .timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull(),
  expiresAt: t
    .timestamp('expires_at', { withTimezone: true, mode: 'date' })
    .notNull(),
  status: InterviewStatusEnum('status').default('sent').notNull(),
}));

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

// Relations
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

export const QuestionRelations = relations(QuestionTable, ({ one, many }) => ({
  organization: one(OrganizationTable, {
    fields: [QuestionTable.organizationId],
    references: [OrganizationTable.id],
  }),
  answers: many(AnswerTable),
}));

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
