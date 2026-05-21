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

  const [projectName, setProjectName] = useState("DevDeploy");

  const [environment, setEnvironment] = useState("Production");

  const [showDeployForm, setShowDeployForm] = useState(false);

  const [repoUrl, setRepoUrl] = useState("");

  const [newProjectName, setNewProjectName] = useState("");

  const [newEnvironment, setNewEnvironment] = useState("Production");

  const [logs, setLogs] = useState([
    "🚀 DevDeploy System Started...",
    "✅ Jenkins Connected...",
    "✅ Kubernetes Connected...",
  ]);

  const [deployments, setDeployments] = useState([
    {
      id: 1,
      name: "Frontend Deployment",
      tech: "React + Docker + Kubernetes",
      status: "Running",
      environment: "Production",
    },

    {
      id: 2,
      name: "Backend Deployment",
      tech: "Node.js + MongoDB",
      status: "Pending",
      environment: "Development",
    },
  ]);

  const handleDeploy = () => {

    if (!newProjectName || !repoUrl) {
      alert("❌ Please fill all fields");
      return;
    }

    const deploymentId = deployments.length + 1;

    const newDeployment = {
      id: deploymentId,
      name: newProjectName,
      tech: repoUrl,
      status: "Pending",
      environment: newEnvironment,
    };

    setDeployments([...deployments, newDeployment]);

    setLogs([
      `🚀 Deployment Started: ${newProjectName}`,
      `📦 Cloning Repository...`,
      ...logs,
    ]);

    setShowDeployForm(false);

    setNewProjectName("");
    setRepoUrl("");

    /* BUILDING STATUS */
    setTimeout(() => {

      setDeployments((prevDeployments) =>
        prevDeployments.map((deployment) =>
          deployment.id === deploymentId
            ? { ...deployment, status: "Building" }
            : deployment
        )
      );

      setLogs((prevLogs) => [
        `🐳 Building Docker Image...`,
        ...prevLogs,
      ]);

    }, 2000);

    /* DEPLOYING STATUS */
    setTimeout(() => {

      setDeployments((prevDeployments) =>
        prevDeployments.map((deployment) =>
          deployment.id === deploymentId
            ? { ...deployment, status: "Deploying" }
            : deployment
        )
      );

      setLogs((prevLogs) => [
        `☸️ Deploying To Kubernetes...`,
        ...prevLogs,
      ]);

    }, 4000);

    /* SUCCESS STATUS */
    setTimeout(() => {

      setDeployments((prevDeployments) =>
        prevDeployments.map((deployment) =>
          deployment.id === deploymentId
            ? { ...deployment, status: "Running" }
            : deployment
        )
      );

      setLogs((prevLogs) => [
        `✅ Deployment Successful`,
        ...prevLogs,
      ]);

    }, 6000);
  };

  const handleRestart = (id) => {

    const deploymentName = deployments.find(
      (deployment) => deployment.id === id
    )?.name;

    const updatedDeployments = deployments.map((deployment) =>
      deployment.id === id
        ? { ...deployment, status: "Restarting..." }
        : deployment
    );

    setDeployments(updatedDeployments);

    setLogs([
      `🔄 Restarting ${deploymentName}...`,
      `⚡ Container Restart Initiated...`,
      ...logs,
    ]);

    setTimeout(() => {

      const restartedDeployments = deployments.map((deployment) =>
        deployment.id === id
          ? { ...deployment, status: "Running" }
          : deployment
      );

      setDeployments(restartedDeployments);

      setLogs((prevLogs) => [
        `✅ ${deploymentName} Restarted Successfully`,
        ...prevLogs,
      ]);

    }, 2000);
  };

  const handleDelete = (id) => {

    const deploymentName = deployments.find(
      (deployment) => deployment.id === id
    )?.name;

    const filteredDeployments = deployments.filter(
      (deployment) => deployment.id !== id
    );

    setDeployments(filteredDeployments);

    setLogs([
      `❌ Deployment Deleted: ${deploymentName}`,
      ...logs,
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-black border-r border-gray-800 p-6 hidden md:block">

        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          {projectName}
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
                {projectName} Dashboard 🚀
              </h1>

              <p className="text-gray-400 mt-2">
                Environment: {environment}
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

                <p className="text-4xl font-bold mt-4">
                  {deployments.length}
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Running Containers
                  </h2>

                  <FaDocker className="text-cyan-400 text-3xl" />
                </div>

                <p className="text-4xl font-bold mt-4">
                  4
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Successful Builds
                  </h2>

                  <FaCheckCircle className="text-green-400 text-3xl" />
                </div>

                <p className="text-4xl font-bold mt-4">
                  10
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Pending Jobs
                  </h2>

                  <FaClock className="text-yellow-400 text-3xl" />
                </div>

                <p className="text-4xl font-bold mt-4">
                  2
                </p>
              </div>

            </div>

            {/* Deployment Section */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Recent Deployments
                </h2>

                <button
                  onClick={() => setShowDeployForm(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl font-semibold"
                >
                  + New Deployment
                </button>

              </div>

              {/* Deployment Form */}
              {showDeployForm && (

                <div className="bg-gray-800 p-6 rounded-2xl mb-6 space-y-4">

                  <input
                    type="text"
                    placeholder="Project Name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="GitHub Repository URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                  />

                  <select
                    value={newEnvironment}
                    onChange={(e) => setNewEnvironment(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                  >
                    <option>Production</option>
                    <option>Staging</option>
                    <option>Development</option>
                  </select>

                  <button
                    onClick={handleDeploy}
                    className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-xl font-semibold"
                  >
                    Deploy Project
                  </button>

                </div>

              )}

              {/* Deployment Cards */}
              <div className="space-y-4">

                {deployments.map((deployment) => (

                  <div
                    key={deployment.id}
                    className="flex items-center justify-between bg-gray-800 p-4 rounded-xl"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {deployment.name}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {deployment.tech}
                      </p>

                      <p className="text-cyan-400 text-sm mt-1">
                        {deployment.environment}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <span
                        className={`px-4 py-1 rounded-full text-sm ${
                          deployment.status === "Running"
                            ? "bg-green-500"
                            : deployment.status === "Pending"
                            ? "bg-yellow-500"
                            : deployment.status === "Building"
                            ? "bg-blue-500"
                            : deployment.status === "Deploying"
                            ? "bg-purple-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {deployment.status}
                      </span>

                      <button
                        onClick={() => handleRestart(deployment.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-1 rounded-lg text-sm"
                      >
                        Restart
                      </button>

                      <button
                        onClick={() => handleDelete(deployment.id)}
                        className="bg-red-500 hover:bg-red-600 transition px-4 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Deployment Logs */}
            <div className="bg-black p-6 rounded-2xl shadow-lg border border-gray-800 mt-10">

              <h2 className="text-2xl font-bold mb-4">
                Deployment Logs
              </h2>

              <div className="bg-gray-950 p-4 rounded-xl text-green-400 font-mono text-sm h-72 overflow-y-auto space-y-2">

                {logs.map((log, index) => (

                  <p key={index}>
                    {log}
                  </p>

                ))}

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

              <p className="text-lg mb-4">
                Total Active Deployments: {deployments.length}
              </p>

              <div className="space-y-4">

                {deployments.map((deployment) => (

                  <div
                    key={deployment.id}
                    className="bg-gray-800 p-4 rounded-xl"
                  >

                    <h3 className="font-semibold text-lg">
                      {deployment.name}
                    </h3>

                    <p className="text-gray-400">
                      {deployment.tech}
                    </p>

                    <p className="text-cyan-400 mt-2">
                      {deployment.environment}
                    </p>

                    <p className="mt-2">
                      Status:
                      <span className="text-green-400 ml-2">
                        {deployment.status}
                      </span>
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

        {/* ANALYTICS PAGE */}
        {activePage === "analytics" && (

          <div>

            <h1 className="text-4xl font-bold mb-6">
              Analytics 📊
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-gray-900 p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-3">
                  Total Builds
                </h2>

                <p className="text-5xl font-bold text-cyan-400">
                  128
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-3">
                  Success Rate
                </h2>

                <p className="text-5xl font-bold text-green-400">
                  96%
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-3">
                  Failed Deployments
                </h2>

                <p className="text-5xl font-bold text-red-400">
                  4
                </p>
              </div>

            </div>

          </div>

        )}

        {/* SECURITY PAGE */}
        {activePage === "security" && (

          <div>

            <h1 className="text-4xl font-bold mb-6">
              Security 🔒
            </h1>

            <div className="bg-gray-900 p-6 rounded-2xl space-y-4">

              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">
                <span>Firewall Protection</span>
                <span className="text-green-400">Active</span>
              </div>

              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">
                <span>SSL Security</span>
                <span className="text-green-400">Enabled</span>
              </div>

              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">
                <span>DDoS Protection</span>
                <span className="text-yellow-400">Monitoring</span>
              </div>

            </div>

          </div>

        )}

        {/* SETTINGS PAGE */}
        {activePage === "settings" && (

          <div>

            <h1 className="text-4xl font-bold mb-6">
              Settings ⚙️
            </h1>

            <div className="bg-gray-900 p-6 rounded-2xl space-y-6">

              <div>

                <label className="block mb-2 text-gray-400">
                  Project Name
                </label>

                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-gray-400">
                  Environment
                </label>

                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                >

                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>

                </select>

              </div>

              <button
                className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl font-semibold"
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