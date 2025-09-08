// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sana_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

// RBAC users table, linked to Clerk user via `clerkUserId`
export const users = createTable(
  "user",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    clerkUserId: d.varchar({ length: 191 }).notNull().unique(),
    // Role: 'admin' | 'editor' | 'viewer'
    role: d.varchar({ length: 20 }).notNull().default("viewer" as const),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("user_clerk_id_idx").on(t.clerkUserId)],
);

// CMS: blog posts (separate from example `posts` above)
export const cmsPosts = createTable(
  "cms_post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar({ length: 256 }).notNull(),
    slug: d.varchar({ length: 256 }).notNull().unique(),
    excerpt: d.varchar({ length: 512 }),
    content: d.jsonb().$type<unknown>(),
    status: d.varchar({ length: 20 }).notNull().default("draft" as const),
    publishedAt: d.timestamp({ withTimezone: true }),
    authorId: d.integer().references(() => users.id),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("cms_posts_slug_idx").on(t.slug)],
);

// CMS: static pages
export const cmsPages = createTable(
  "cms_page",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar({ length: 256 }).notNull(),
    slug: d.varchar({ length: 256 }).notNull().unique(),
    content: d.jsonb().$type<unknown>(),
    visible: d.boolean().default(true).notNull(),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("cms_pages_slug_idx").on(t.slug)],
);

// CMS: taxonomy
export const categories = createTable(
  "cms_category",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 128 }).notNull(),
    slug: d.varchar({ length: 128 }).notNull().unique(),
    description: d.varchar({ length: 512 }),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  }),
  (t) => [index("cms_categories_slug_idx").on(t.slug)],
);

export const tags = createTable(
  "cms_tag",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 128 }).notNull(),
    slug: d.varchar({ length: 128 }).notNull().unique(),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  }),
  (t) => [index("cms_tags_slug_idx").on(t.slug)],
);

export const postCategories = createTable(
  "cms_post_category",
  (d) => ({
    postId: d.integer().notNull().references(() => cmsPosts.id),
    categoryId: d.integer().notNull().references(() => categories.id),
  }),
  (t) => [index("cms_post_category_unique_idx").on(t.postId, t.categoryId)],
);

export const postTags = createTable(
  "cms_post_tag",
  (d) => ({
    postId: d.integer().notNull().references(() => cmsPosts.id),
    tagId: d.integer().notNull().references(() => tags.id),
  }),
  (t) => [index("cms_post_tag_unique_idx").on(t.postId, t.tagId)],
);

// CMS: media assets
export const media = createTable(
  "cms_media",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    provider: d.varchar({ length: 64 }).notNull().default("local" as const),
    url: d.varchar({ length: 2048 }).notNull(),
    publicId: d.varchar({ length: 256 }),
    width: d.integer(),
    height: d.integer(),
    mimeType: d.varchar({ length: 128 }),
    size: d.integer(),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  }),
  (t) => [index("cms_media_url_idx").on(t.url)],
);

// CMS: settings key/value
export const settings = createTable(
  "cms_setting",
  (d) => ({
    key: d.varchar({ length: 128 }).primaryKey(),
    value: d.jsonb().$type<unknown>(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  () => [],
);
