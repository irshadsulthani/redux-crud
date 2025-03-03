import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto my-12 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Profile
      </h1>

      <form className="flex flex-col gap-5">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={currentUser.user.profilePicture}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Username Input */}
        <div className="relative">
          <input
            type="text"
            defaultValue={currentUser.user.userName}
            id="username"
            placeholder="Username"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            defaultValue={currentUser.user.email}
            id="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type="password"
            id="password"
            placeholder="New Password"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          />
        </div>

        {/* Update Button */}
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition duration-300">
          Update Profile
        </button>
      </form>

      {/* Additional Actions */}
      <div className="flex justify-between mt-6 text-sm text-red-500 font-medium">
        <a href="#" className="hover:underline transition duration-200">
          Delete Account
        </a>
        <a href="#" className="hover:underline transition duration-200">
          Logout
        </a>
      </div>
    </div>
  );
}

export default Profile;
