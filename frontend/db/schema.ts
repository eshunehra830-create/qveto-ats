import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text().notNull().default(""),
  department: text().notNull().default(""),
  location: text().notNull().default(""),
  status: text().notNull().default("Open"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const candidates = pgTable("candidates", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  phone: text().notNull().default(""),
  stage: text().notNull().default("Applied"),
  createdAt: timestamp("created_at").defaultNow(),
});
