import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(currentUser.user.profilePicture);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // Track upload progress

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0); // Reset progress

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "first_time_use"); // Replace with your Cloudinary upload preset
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

      console.log('image',image);
      

      // Dispatch action to update Redux store
      dispatch({ type: "UPDATE_PROFILE_PICTURE", payload: response.data.secure_url });

    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
      setProgress(0); // Reset progress after upload
    }
  };

  return (
    <div className="max-w-lg mx-auto my-12 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Profile
      </h1>
      <form className="flex flex-col gap-5">
        {/* Profile Picture Upload */}
        <div className="flex justify-center relative">
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileUpload} />
          <img
            src={image}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-600 h-2 transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

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
