import BlogDetail from "@/components/blog/BlogDetail";
import { fetchPostDetail } from "@/lib/api/post.api";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPostDetail(id);

  if (!post) {
    return notFound();
  }

  return <BlogDetail post={post} />;
}
