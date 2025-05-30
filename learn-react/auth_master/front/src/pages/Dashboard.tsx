import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import Layout from "../layout/Layout";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
              <div className="p-6 bg-white border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Welcome back
                    </h2>
                    <p className="mt-1 text-gray-600">
                      Here's what's happening with your account today.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{formatTime(currentTime)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
