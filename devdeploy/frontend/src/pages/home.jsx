function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-6xl font-bold mb-6 text-center">
        Deploy Your Projects
        <span className="text-blue-500">
          {" "}Faster 🚀
        </span>
      </h1>

      <p className="text-xl text-gray-400 text-center max-w-2xl mb-8">
        DevDeploy helps developers deploy applications with
        Docker, Kubernetes, CI/CD pipelines, and cloud automation.
      </p>

      <div className="flex gap-6">

        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition">
          Get Started
        </button>

        <button className="border border-gray-600 hover:border-blue-500 px-6 py-3 rounded-xl text-lg transition">
          Learn More
        </button>

      </div>

    </div>
  );
}

export default Home;