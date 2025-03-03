import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(error);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/backend/admin/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Sign in failed! ❌');
      }

      dispatch(signInSuccess(data));
      toast.success('User signed in successfully! 🎉', { autoClose: 3000 });
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Sign in failed! ❌', { autoClose: 3000 });
      dispatch(signInFailure(error));
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
    toast.info('Google Sign-In is under development!', { autoClose: 3000 });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border p-2 rounded-md focus:outline-blue-500"
            required
            onChange={handleChange}
          />

          <button
            disabled={loading}
            type="submit"
            className={`py-2 rounded-md font-medium text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Loading...' : 'Sign In'}
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
          Don't have an account?
          <a href="/sign-up" className="text-blue-500 hover:underline ml-1">Sign Up</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
