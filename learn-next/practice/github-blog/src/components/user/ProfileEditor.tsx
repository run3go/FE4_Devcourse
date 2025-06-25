"use client";
import Input from "@/components/ui/Input";
import { Camera, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import { ArrowLeft, Building, Github } from "lucide-react";

type User = {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  organization?: string;
  followers: number;
  githubUrl?: string;
};

export default function ProfileEditor() {
  const user = {
    id: "2",
    username: "oliviasmith",
    displayName: "Olivia Smith",
    avatar:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Frontend developer passionate about React and TypeScript",
    organization: "Vercel",
    followers: 48,
    githubUrl: "https://github.com",
  };

  const [formData, setFormData] = useState({
    displayName: user.displayName,
    username: user.username,
    bio: user.bio,
    organization: user.organization || "",
    githubUrl: user.githubUrl || "",
    avatar: user.avatar,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          avatar: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const onUpdateProfile = (user: User) => {
    console.log("update", user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !formData.displayName.trim() ||
      !formData.username.trim() ||
      !formData.bio.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (
      formData.githubUrl &&
      !formData.githubUrl.startsWith("https://github.com/")
    ) {
      setError("GitHub URL must start with https://github.com/");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser: User = {
        ...user,
        displayName: formData.displayName,
        username: formData.username,
        bio: formData.bio,
        organization: formData.organization,
        githubUrl: formData.githubUrl,
        avatar: formData.avatar,
      };

      onUpdateProfile(updatedUser);
      router.push("/");
    } catch (err) {
      console.log(err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] py-8">
      <div className="max-w-2xl mx-auto ">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-[#58a6ff] hover:underline transition-colors "
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </button>{" "}
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        <div className="bg-[#161B22] rounded-lg border border-[#30363d] p-6">
          {error && (
            <div className="bg-[#f8514921] border border-[#f85149] text-[#f85149] rounded-md p-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#c9d1d9] mb-4">
                Profile Picture
              </label>
              <div className="flex items-center gap-6">
                <Avatar
                  src={formData.avatar}
                  alt={formData.displayName}
                  size="xl"
                />
                <div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      icon={<Camera size={16} />}
                      className="pointer-events-none"
                    >
                      Change Photo
                    </Button>
                  </label>
                  <p className="text-xs text-[#8b949e] mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                type="text"
                name="displayName"
                label="Display Name *"
                placeholder="Enter your display name"
                value={formData.displayName}
                onChange={handleChange}
                icon={<User size={16} />}
                fullWidth
              />

              <Input
                type="text"
                name="username"
                label="Username *"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                icon={<User size={16} />}
                fullWidth
              />
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#c9d1d9] mb-2">
                Bio *
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="block w-full px-4 py-2 bg-[#0D1117] text-[#c9d1d9] border border-[#30363d] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-[#8b949e] mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Organization and GitHub */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Input
                type="text"
                name="organization"
                label="Organization"
                placeholder="Enter your organization"
                value={formData.organization}
                onChange={handleChange}
                icon={<Building size={16} />}
                fullWidth
              />

              <Input
                type="url"
                name="githubUrl"
                label="GitHub URL"
                placeholder="https://github.com/username"
                value={formData.githubUrl}
                onChange={handleChange}
                icon={<Github size={16} />}
                fullWidth
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push("/")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={
                  !formData.displayName.trim() ||
                  !formData.username.trim() ||
                  !formData.bio.trim()
                }
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-[#161B22] rounded-lg border border-[#30363d] p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Profile Visibility
          </h3>
          <p className="text-[#8b949e] text-sm">
            Your profile information will be visible to all visitors of your
            blog. Make sure you`re comfortable sharing this information
            publicly.
          </p>
        </div>
      </div>
    </div>
  );
}
