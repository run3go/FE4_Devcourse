"use client";
import { fetchPostDetail } from "@/lib/api/post.api";
import { formatDate } from "date-fns";
import { Calendar, Clock, Tag } from "lucide-react";
import { readingTime } from "reading-time-estimator";
import Avatar from "../ui/Avatar";

// Simple markdown parser
const parseMarkdown = (markdown: string): string => {
  let html = markdown
    // Headers
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-xl font-bold text-white mt-6 mb-4">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold text-white mt-10 mb-6">$1</h1>'
    )
    // Inline code
    .replace(
      /`([^`]+)`/gim,
      '<code class="bg-[#161B22] text-[#c9d1d9] px-1.5 py-0.5 rounded">$1</code>'
    )
    // Code blocks
    .replace(
      /```(\w+)?\n([\s\S]*?)```/gim,
      '<pre class="bg-[#161B22] text-[#c9d1d9] p-4 rounded-md overflow-x-auto mb-6"><code>$2</code></pre>'
    )
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    // Lists
    .replace(
      /^\s*\d+\.\s(.*)$/gim,
      '<li class="ml-6 list-decimal text-[#c9d1d9] mb-2">$1</li>'
    )
    .replace(
      /^\s*-\s(.*)$/gim,
      '<li class="ml-6 list-disc text-[#c9d1d9] mb-2">$1</li>'
    )
    // Paragraphs
    .replace(
      /^(?!<h|<ul|<li|<pre|<ol)(.+)/gim,
      '<p class="text-[#c9d1d9] mb-4 leading-relaxed">$1</p>'
    );

  // Process lists
  html = html.replace(
    /<li class="ml-6 list-decimal text-\[#c9d1d9\] mb-2">/gim,
    (match, offset, string) => {
      if (offset === 0 || string.substring(offset - 5, offset) !== "</li>") {
        return '<ol class="list-decimal mb-6 pl-4">' + match;
      }
      return match;
    }
  );

  html = html.replace(
    /<li class="ml-6 list-disc text-\[#c9d1d9\] mb-2">/gim,
    (match, offset, string) => {
      if (offset === 0 || string.substring(offset - 5, offset) !== "</li>") {
        return '<ul class="list-disc mb-6 pl-4">' + match;
      }
      return match;
    }
  );

  html = html.replace(/<\/li>\n(?!<li)/gim, "</li></ol>\n");
  html = html.replace(/<\/li>\n(?!<li)/gim, "</li></ul>\n");

  return html;
};
type PostUnique = NonNullable<Awaited<ReturnType<typeof fetchPostDetail>>>;
export default function BlogContent({
  title,
  content,
  profiles,
  created_at,
  tags,
}: PostUnique) {
  const arrayTags = tags?.split(",");
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center">
            <Avatar src={profiles?.avatar_url || ""} alt={"수야"} size="md" />
            <span className="ml-2 text-[#c9d1d9]">
              {profiles?.username || ""}
            </span>
          </div>

          <div className="flex items-center text-[#8b949e]">
            <Calendar size={16} className="mr-1" />
            <span>{formatDate(new Date(created_at), "yyyy-MM-dd HH:mm")}</span>
          </div>

          <div className="flex items-center text-[#8b949e]">
            <Clock size={16} className="mr-1" />
            <span>{readingTime(content!).text}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {arrayTags &&
            arrayTags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-[#161B22] text-[#58a6ff] px-2.5 py-1 rounded-full text-xs"
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </div>
            ))}
        </div>
      </header>

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content!) }}
      />
    </article>
  );
}
