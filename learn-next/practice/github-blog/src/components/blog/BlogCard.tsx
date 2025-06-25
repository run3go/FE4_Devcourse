"use client";
import { fetchPosts } from "@/lib/api/post.api";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { readingTime } from "reading-time-estimator";
import Avatar from "../ui/Avatar";

type PostUnique = NonNullable<Awaited<ReturnType<typeof fetchPosts>>>[number];
export default function BlogCard({
  id,
  title,
  created_at,
  profiles,
  content,
}: PostUnique) {
  const { text } = readingTime(content, 10);
  return (
    <Link href={`/post/${id}`}>
      <div className="bg-[#0D1117] rounded-lg overflow-hidden border border-[#30363d] hover:border-[#58a6ff] transition-all duration-300 cursor-pointer">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-white hover:text-[#58a6ff] transition-colors">
              {title}
            </h2>
            <div className="flex items-center text-[#8b949e] text-sm">
              <Calendar size={14} className="mr-1" />
              <span>{format(new Date(created_at), "yyyy.MM.dd HH:mm")}</span>
            </div>
          </div>
          <p className="text-[#c9d1d9] mb-6 line-clamp-3">{content}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar
                src={profiles?.avatar_url || ""}
                alt={profiles?.username || ""}
                size="sm"
              />
              <span className="ml-2 text-[#8b949e] text-sm">
                {profiles?.username}
              </span>
            </div>
            <div className="flex items-center text-[#8b949e] text-sm">
              <Clock size={14} className="mr-1" />
              <span>{text}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
