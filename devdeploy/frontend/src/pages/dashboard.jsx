import React, { useState } from "react";

import {
  FaServer,
  FaDocker,
  FaCheckCircle,
  FaClock,
  FaHome,
  FaChartBar,
  FaCog,
  FaUserShield,
} from "react-icons/fa";

const Dashboard = () => {

  const [activePage, setActivePage] = useState("dashboard");

  const handleDeploy = () => {
    alert("🚀 New Deployment Started Successfully!");
  };

  const handleRestart = () => {
    alert("🔄 Container Restarted Successfully!");
  };

  const handleDelete = () => {
    alert("❌ Deployment Deleted Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-black border-r border-gray-800 p-6 hidden md:block">

        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          DevDeploy
        </h1>

        <div className="space-y-6">

          <div
            onClick={() => setActivePage("dashboard")}
            className="flex items-center gap-3 text-cyan-400 cursor-pointer"
          >
            <FaHome />
            <span>Dashboard</span>
          </div>

          <div
            onClick={() => setActivePage("deployments")}
            className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition"
          >
            <FaServer />
            <span>Deployments</span>
          </div>

          <div
            onClick={() => setActivePage("analytics")}
            className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition"
          >
            <FaChartBar />
            <span>Analytics</span>
          </div>

          <div
            onClick={() => setActivePage("security")}
            className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition"
          >
            <FaUserShield />
            <span>Security</span>
          </div>

          <div
            onClick={() => setActivePage("settings")}
            className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition"
          >
            <FaCog />
            <span>Settings</span>
          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* DASHBOARD PAGE */}
        {activePage === "dashboard" && (

          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold">
                DevDeploy Dashboard 🚀
              </h1>

              <p className="text-gray-400 mt-2">
                Monitor deployments, containers, and CI/CD pipelines
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">

              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Total Deployments
                  </h2>

                  <FaServer className="text-blue-400 text-3xl" />
                </div>

                <p className="text-4xl font-bold mt-4">12</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Running Containers
                  </h2>

                  <FaDocker className="text-cyan-400 text-3xl" />
                </div>

                <p className="text-4xl font-bold mt-4">4</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Successful Builds
                  </h2>

                  <FaCheckCircle className="text-green-400 text-3xl" />
                </div>

                <p className="text-4xl font-bold mt-4">10</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Pending Jobs
                  </h2>

                  <FaClock className="text-yellow-400 text-3xl" />
                </div>

                <p className="text-4xl font-bold mt-4">2</p>
              </div>

            </div>

            {/* Deployment Section */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg mb-10">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Recent Deployments
                </h2>

                <button
                  onClick={handleDeploy}
                  className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl font-semibold"
                >
                  + New Deployment
                </button>

              </div>

              <div className="space-y-4">

                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">

                  <div>
                    <h3 className="font-semibold">
                      Frontend Deployment
                    </h3>

                    <p className="text-gray-400 text-sm">
                      React + Docker + Kubernetes
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <span className="bg-green-500 px-4 py-1 rounded-full text-sm">
                      Running
                    </span>

                    <button
                      onClick={handleRestart}
                      className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-1 rounded-lg text-sm"
                    >
                      Restart
                    </button>

                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 transition px-4 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </>
        )}

        {/* DEPLOYMENTS PAGE */}
        {activePage === "deployments" && (

          <div>
            <h1 className="text-4xl font-bold mb-6">
              Deployments 🚀
            </h1>

            <div className="bg-gray-900 p-6 rounded-2xl">
              <p className="text-lg">
                Here you can manage all deployments.
              </p>
            </div>
          </div>

        )}

        {/* ANALYTICS PAGE */}
        {activePage === "analytics" && (

          <div>
            <h1 className="text-4xl font-bold mb-6">
              Analytics 📊
            </h1>

            <div className="bg-gray-900 p-6 rounded-2xl">
              <p className="text-lg">
                Analytics and deployment statistics will appear here.
              </p>
            </div>
          </div>

        )}

        {/* SECURITY PAGE */}
        {activePage === "security" && (

          <div>
            <h1 className="text-4xl font-bold mb-6">
              Security 🔒
            </h1>

            <div className="bg-gray-900 p-6 rounded-2xl">
              <p className="text-lg">
                Security monitoring and protection settings.
              </p>
            </div>
          </div>

        )}

        {/* SETTINGS PAGE */}
        {activePage === "settings" && (

          <div>
            <h1 className="text-4xl font-bold mb-6">
              Settings ⚙️
            </h1>

            <div className="bg-gray-900 p-6 rounded-2xl space-y-4">

              <div>
                <label className="block mb-2 text-gray-400">
                  Project Name
                </label>

                <input
                  type="text"
                  placeholder="DevDeploy"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-400">
                  Environment
                </label>

                <select className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 outline-none">

                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>

                </select>
              </div>

              <button
                className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl font-semibold"
                onClick={() => alert("⚙️ Settings Saved Successfully!")}
              >
                Save Settings
              </button>

            </div>
          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;