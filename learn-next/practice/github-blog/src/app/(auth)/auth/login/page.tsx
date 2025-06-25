"use client";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { Github } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#161B22] rounded-lg shadow-lg overflow-hidden border border-[#30363d]">
          <div className="px-6 py-8">
            <div className="flex justify-center mb-6">
              <Github size={48} className="text-white" />
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Welcome back
            </h1>
            <p className="text-[#8b949e] text-center mb-8">
              Sign in to continue to GitHub Blog
            </p>

            <Button
              type="button"
              variant="secondary"
              fullWidth
              className="bg-white text-bl hover:bg-gray-100 text-black! border-gray-200"
              onClick={handleGoogleLogin}
            >
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
                width={0}
                height={0}
              />
              Continue with Google
            </Button>
          </div>

          <div className="px-6 py-4 bg-[#0D1117] border-t border-[#30363d]">
            <p className="text-xs text-center text-[#8b949e]">
              By signing in, you agree to our{" "}
              <a href="#" className="text-[#58a6ff] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#58a6ff] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
