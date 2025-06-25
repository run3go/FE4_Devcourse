"use client";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import {
  GitBranch,
  Github,
  Link,
  Menu,
  PenSquare,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useAuth();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <>
      <nav className="bg-[#161B22] text-white sticky top-0 z-50 border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Github className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold">GITHUB BLOG</span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="hover:bg-[#21262D] text-[#c9d1d9] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <div className="relative mx-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-64 pl-10 pr-3 py-1.5 bg-[#0D1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* 로그인 */}
              {user && (
                <div className="flex items-center ml-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-3"
                    onClick={() => router.push("/create-post")}
                    icon={<PenSquare size={16} />}
                  >
                    Write
                  </Button>
                  <GitBranch className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="relative">
                    <button
                      onClick={() => router.push("/profile")}
                      className="flex items-center text-sm focus:outline-none"
                    >
                      <Avatar
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(
                          "user"
                        )}`}
                        alt={"User"}
                        size="sm"
                      />
                    </button>
                  </div>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    size="sm"
                    className="ml-3"
                  >
                    Logout
                  </Button>
                </div>
              )}
              {/* 로그아웃 상태 */}
              {!user && (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-400 hover:bg-[#21262D] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0D1117] pb-3 px-4">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block hover:bg-[#21262D] text-[#c9d1d9] px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <a
                href="/explore"
                className="block hover:bg-[#21262D] text-[#c9d1d9] px-3 py-2 rounded-md text-base font-medium"
              >
                Explore
              </a>
              <a
                href="/trending"
                className="block hover:bg-[#21262D] text-[#c9d1d9] px-3 py-2 rounded-md text-base font-medium"
              >
                Trending
              </a>
            </div>
            <div className="relative mt-3 mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 bg-[#0D1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* 로그인 */}
            <div className="flex items-center justify-between pt-4 border-t border-[#30363d]">
              <div className="flex items-center">
                <Avatar
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(
                    "user"
                  )}`}
                  alt={"User"}
                  size="sm"
                />
                <span className="ml-3 text-[#c9d1d9]">수야</span>
              </div>
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </div>

            <div className="pt-4 flex flex-col space-y-2 border-t border-[#30363d]">
              <Button variant="secondary" fullWidth>
                Login
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={() => router.push("/register")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
