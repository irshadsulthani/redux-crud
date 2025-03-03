import React from 'react';
import { FcGoogle } from 'react-icons/fc';

function SignUp() {
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
    // Add your Google authentication logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 w-full max-w-sm border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>

        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-3 text-center text-gray-500">or</div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border p-2 rounded-md hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account? 
          <a href="/sign-in" className="text-blue-500 hover:underline ml-1">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
