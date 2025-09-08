import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.cms.posts.bySlugPublished({ slug: params.slug });
  if (!post) return { title: "غير موجود" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await api.cms.posts.bySlugPublished({ slug: params.slug });
  if (!post) notFound();

  function renderContent(content: unknown) {
    // Expecting a Tiptap-like JSON. Render a small subset (paragraphs, headings, bullet list)
    try {
      const c = content as any;
      if (!c || typeof c !== "object") return null;
      const nodes = Array.isArray(c.content) ? c.content : [];
      return (
        <div className="prose dark:prose-invert max-w-none">
          {nodes.map((n: any, i: number) => {
            if (n.type === "paragraph") {
              const text = (n.content ?? [])
                .filter((t: any) => t.type === "text")
                .map((t: any) => t.text)
                .join("");
              return <p key={i}>{text}</p>;
            }
            if (n.type === "heading") {
              const lvl = Math.min(Math.max(Number(n.attrs?.level ?? 2), 1), 6);
              const text = (n.content ?? [])
                .filter((t: any) => t.type === "text")
                .map((t: any) => t.text)
                .join("");
              const Tag = (`h${lvl}` as unknown) as keyof JSX.IntrinsicElements;
              return <Tag key={i}>{text}</Tag>;
            }
            if (n.type === "bulletList") {
              const items = (n.content ?? []).filter((li: any) => li.type === "listItem");
              return (
                <ul key={i}>
                  {items.map((li: any, j: number) => {
                    const text = (li.content?.[0]?.content ?? [])
                      .filter((t: any) => t.type === "text")
                      .map((t: any) => t.text)
                      .join("");
                    return <li key={j}>{text}</li>;
                  })}
                </ul>
              );
            }
            return null;
          })}
        </div>
      );
    } catch {
      return null;
    }
  }

  return (
    <article className="page-container space-y-6">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>
        {post.excerpt && (
          <p className="text-gray-600 mt-2">{post.excerpt}</p>
        )}
      </header>
      <section>{renderContent(post.content)}</section>
    </article>
  );
}
