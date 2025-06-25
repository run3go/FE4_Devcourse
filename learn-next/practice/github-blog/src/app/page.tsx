import BlogCard from "@/components/blog/BlogCard";
import BlogHeader from "@/components/blog/BlogHeader";
import { fetchPosts } from "@/lib/api/post.api";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const posts = await fetchPosts(q);
  console.log(posts);
  return (
    <>
      <div className="min-h-screen bg-[#0D1117]">
        <BlogHeader />
        {/* Blog Posts List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
              Recently Posts
            </h2>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-[#8b949e]">10 posts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts && posts.map((post) => <BlogCard key={post.id} {...post} />)}
            {!posts && (
              <div className="col-span-2 text-center py-12">
                <h3 className="text-xl font-medium text-white mb-2">
                  No posts found
                </h3>
                <p className="text-[#8b949e]">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
