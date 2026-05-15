function Dashboard() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Dashboard 🚀
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl transition"
        >
          Logout
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-4">
            Deployments
          </h2>

          <p className="text-gray-400">
            Manage your application deployments.
          </p>

        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-4">
            CI/CD Pipelines
          </h2>

          <p className="text-gray-400">
            Automate builds and deployments.
          </p>

        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-4">
            Kubernetes
          </h2>

          <p className="text-gray-400">
            Scale applications efficiently.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;