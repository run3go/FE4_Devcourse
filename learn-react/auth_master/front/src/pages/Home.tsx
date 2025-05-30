import { Shield } from "lucide-react";
import { Link } from "react-router";
import Layout from "../layout/Layout";

export default function Home() {
  const isAuthenticated = true;
  return (
    <>
      <Layout>
        <div className="bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
            <Shield className="h-16 w-16 mx-auto text-blue-600 mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Secure Authentication</span>
              <span className="block text-blue-600">
                with JWT & React Router
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 sm:max-w-3xl">
              A comprehensive demonstration of protected routes and
              authentication flows using JWT tokens.
            </p>
            <div className="mt-10 flex justify-center">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg md:px-10 transition duration-150 ease-in-out"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/login"
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg md:px-10 transition duration-150 ease-in-out"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg md:px-10 transition duration-150 ease-in-out"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
