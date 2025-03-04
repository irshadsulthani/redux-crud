import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-6">
      <div className="max-w-3xl text-center bg-white shadow-2xl rounded-2xl p-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          {currentUser
            ? `Hey, ${currentUser.user.userName}! 🎉`
            : "Welcome to Redux State Management 🚀"}
        </h1>
        <p className="text-gray-700 text-lg">
          Redux helps manage application state efficiently, making data flow
          predictable. It allows storing and managing global state in a central
          place, ensuring smooth UI updates.
        </p>

        {/* Benefits Section */}
        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-800">Why use Redux?</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>✅ Centralized state management</li>
            <li>✅ Predictable state updates</li>
            <li>✅ Efficient debugging with Redux DevTools</li>
            <li>✅ Works seamlessly with React</li>
          </ul>
        </div>

        {/* Conditional Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            to="/profile"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-md"
          >
            View Profile
          </Link>

          {!currentUser && (
            <Link
              to="/sign-in"
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300 shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
