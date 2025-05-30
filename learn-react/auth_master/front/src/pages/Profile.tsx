import { Shield, Lock } from "lucide-react";
import Layout from "../layout/Layout";
import { axiosInstance } from "../api/axios";
import { useEffect } from "react";

export default function Profile() {
  const getUser = async () => {
    const { data } = await axiosInstance.get("/user");
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details and application settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Auth info card */}
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Authentication Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details about your authentication status.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-900">
                    You are authenticated and your token is valid.
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    Protected routes you can access:
                  </h4>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    <li>/dashboard - Main dashboard view</li>
                    <li>/profile - This profile page</li>
                    <li>Any other routes that require authentication</li>
                  </ul>
                </div>

                <div className="mt-4 flex items-center">
                  <Lock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-900">
                    In a real application, you would see detailed information
                    about your JWT token here.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
