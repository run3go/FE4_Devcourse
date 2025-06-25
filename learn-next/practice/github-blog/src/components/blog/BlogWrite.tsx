"use client";

import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import MDEditor from "@uiw/react-md-editor";
import { Tag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function BlogWrite() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && tag.trim()) {
      e.preventDefault();
      if (!tags.includes(tag)) {
        setTags((tags) => [...tags, tag.trim()]);
      }
      setTag("");
    }
  };
  const handleDeleteTag = (targetTag: string) => {
    setTags((tags) => tags.filter((tag) => tag !== targetTag));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    startTransition(async () => {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title,
            content,
            profile_id: user?.id,
            tags: tags.join(","),
          },
        ])
        .select();
      if (data) {
        alert("등록되었습니다.");
        router.push("/");
      }
      if (error) {
        alert("오류가 발생했습니다");
      }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-[#161B22] rounded-lg border border-[#30363d] p-6 mb-6">
          <Input
            type="text"
            label="Title"
            placeholder="Enter post title"
            fullWidth
            className="mb-6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
              Content
            </label>
            <div data-color-mode="dark">
              <MDEditor
                height={400}
                preview="edit"
                value={content}
                onChange={(value) => setContent(value || "")}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#21262D] text-[#c9d1d9] px-2 py-1 rounded-full text-sm"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-[#8b949e] hover:text-white"
                    onClick={() => handleDeleteTag(tag)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="text"
              placeholder="Add tags (press Enter)"
              icon={<Tag size={16} />}
              fullWidth
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              disabled={isPending}
              className="disabled:bg-gray-500 disabled:cursor-not-allowed"
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              className="disabled:bg-gray-500 disabled:cursor-not-allowed"
              type="submit"
            >
              Publish Post
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
