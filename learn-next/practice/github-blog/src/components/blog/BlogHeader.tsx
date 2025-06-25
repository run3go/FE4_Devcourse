"use client";
import { ExternalLink, Users } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function BlogHeader() {
  return (
    <div className="w-full bg-[#0D1117] relative overflow-hidden">
      {/* Animated code lines background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="animate-slide-right absolute top-[10%] left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="animate-slide-left absolute top-[25%] left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="animate-slide-right absolute top-[45%] left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="animate-slide-left absolute top-[65%] left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="animate-slide-right absolute top-[85%] left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
          <Avatar
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(
              "user"
            )}`}
            alt={"수야"}
            size="xl"
            className="border-4 border-[#0D1117]"
          />

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">수야</h1>
            <p className="text-[#c9d1d9] max-w-2xl mb-4">
              Handsome guy. Tristique volutpat pulvinar vel massa, pellentesque
              egestas. Eu viverra massa quam dignissim aenean malesuada
              suscipit. Nunc, volutpat pulvinar vel mass.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center text-[#8b949e]">
                <Users size={18} className="mr-2" />
                <span className="text-sm">0 seguidores</span>
              </div>

              <div className="flex items-center text-[#8b949e]">
                <span className="text-sm">수코딩</span>
              </div>

              <a
                href={`https://github.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#58a6ff] hover:underline"
              >
                <span className="text-sm">GITHUB</span>
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
