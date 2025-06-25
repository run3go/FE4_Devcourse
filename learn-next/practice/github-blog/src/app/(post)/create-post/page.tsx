"use client";

import BlogWrite from "@/components/blog/BlogWrite";

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-[#0D1117] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-8">Create New Post</h1>
        <BlogWrite />
      </div>
    </div>
  );
}
