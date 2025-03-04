import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logOut, updatingUser } from "../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(currentUser.user.profilePicture);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('/backend/auth/logout');
      
      if (res.status === 200) {
        toast.success("User Logged Out Successfully");
        dispatch(logOut());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Logout");
    }
  };
  

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteUserStart()); // Start loading state
  
    try {
      const res = await axios.delete(`/backend/user/delete/${currentUser.user._id}`, {
        withCredentials: true,
      });
  
      if (res.status === 200) {
        toast.success("Account Deleted Successfully!");
        dispatch(deleteUserSuccess()); // Dispatch success action
  
        setTimeout(() => {
          navigate("/sign-up");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      dispatch(deleteUserFailure(error.response?.data?.message || "Failed to delete user")); // Dispatch failure action
      toast.error("Failed to delete the user");
    }
  };
  

  const handleClickUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/backend/user/update/${currentUser.user._id}`,
        {
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value || undefined,
          profilePicture: image,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(updatingUser(res.data));
      toast.success("Profile updated successfully! ✅");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Failed to update profile. ❌");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "first_time_use");
    formData.append("cloud_name", "dgjiridsn");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgjiridsn/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          },
        }
      );

      setImage(response.data.secure_url);
      dispatch({ type: "UPDATE_PROFILE_PICTURE", payload: response.data.secure_url });

      toast.success("Image uploaded successfully! ✅");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. ❌");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-12 p-8 bg-white shadow-xl rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Profile
      </h1>
      <form className="flex flex-col gap-5">
        <div className="flex justify-center relative">
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileUpload} />
          <img
            src={image}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
        </div>

        {uploading && (
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-600 h-2 transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            defaultValue={currentUser.user.userName}
            id="username"
            placeholder="Username"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          />
        </div>

        <div className="relative">
          <input
            type="email"
            defaultValue={currentUser.user.email}
            id="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          />
        </div>

        <div className="relative">
          <input
            type="password"
            id="password"
            placeholder="New Password"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          />
        </div>

        <button
          onClick={handleClickUpdate}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition duration-300"
        >
          Update Profile
        </button>
      </form>

      <div className="flex justify-between mt-6 text-sm text-red-500 font-medium">
        <a onClick={handleDelete} href="#" className="hover:underline transition duration-200">
          Delete Account
        </a>
        <a href="#" onClick={handleLogout} className="hover:underline transition duration-200">
          Logout
        </a>
      </div>
    </div>
  );
}

export default Profile;
