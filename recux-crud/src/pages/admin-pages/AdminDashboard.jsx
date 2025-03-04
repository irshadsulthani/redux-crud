import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ userName: "", email: "" });
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/backend/admin/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users.");
        navigate('/adminLogin')
        console.error(error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/backend/admin/users/delete/${userId}`);
          setUsers(users.filter((user) => user._id !== userId));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          toast.error("Failed to delete user.");
          navigate('/adminLogin')
          console.error(error);
        }
      }
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ userName: user.userName, email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/backend/admin/users/${editingUser._id}`, formData);
      setUsers(users.map((user) => (user._id === editingUser._id ? { ...user, ...formData } : user)));
      toast.success("User updated successfully!");
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to update user.");
      navigate('/adminLogin')
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">👥 Users</h1>
        <a
          href="/admin/user-add"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
        >
          ➕ Add User
        </a>
      </div>

      {loading && <p className="text-gray-500">Loading users...</p>}

      {!loading && users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Email</th>
                <th className="border border-gray-300 p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="border border-gray-300 p-3">{user.userName}</td>
                  <td className="border border-gray-300 p-3">{user.email}</td>
                  <td className="border border-gray-300 p-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-500">No users found.</p>
      )}

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit User</h2>
            <label className="text-gray-600 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border p-2 mb-3 rounded-lg focus:ring focus:ring-blue-300"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              placeholder="User Name"
            />
            <label className="text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border p-2 mb-3 rounded-lg focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg transition-all"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
