import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { InterviewStatusEnum } from './enums';
import { OrganizationTable } from './organization';

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
  interviewId: t
    .serial('interview_id') // Ajout du champ pour la relation avec InterviewTable
    .notNull()
    .references(() => InterviewTable.id, { onDelete: 'cascade' }),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
}));

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
    .notNull()
    .$defaultFn(() => new Date()),
  expiresAt: t
    .timestamp('expires_at', { withTimezone: true, mode: 'date' })
    .notNull(),
  status: InterviewStatusEnum('status').default('sent').notNull(),
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

export const InterviewRelations = relations(
  InterviewTable,
  ({ one, many }) => ({
    organization: one(OrganizationTable, {
      fields: [InterviewTable.organizationId],
      references: [OrganizationTable.id],
    }),
    candidate: one(CandidateTable, {
      fields: [InterviewTable.candidateId],
      references: [CandidateTable.id],
    }),
    questions: many(QuestionTable), // Ajout de la relation vers QuestionTable
  })
);

export const QuestionRelations = relations(QuestionTable, ({ one }) => ({
  organization: one(OrganizationTable, {
    fields: [QuestionTable.organizationId],
    references: [OrganizationTable.id],
  }),
  interview: one(InterviewTable, {
    // Ajout de la relation vers InterviewTable
    fields: [QuestionTable.interviewId],
    references: [InterviewTable.id],
  }),
}));
