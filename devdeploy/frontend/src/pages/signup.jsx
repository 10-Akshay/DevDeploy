function Signup() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Signup
        </h1>

        <form className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Enter Name"
            className="p-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Enter Email"
            className="p-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="p-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold text-lg"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;