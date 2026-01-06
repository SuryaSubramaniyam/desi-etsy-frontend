import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileImage: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.patch("/users/profile", form);
      toast.success("Profile updated!");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-[#7b1e3b] mb-2">
          Update Your Profile
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Keep your information up to date
        </p>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="profileImage"
            placeholder="Profile Image URL"
            value={form.profileImage}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          {form.profileImage && (
            <div className="flex justify-center">
              <img
                src={form.profileImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#7b1e3b]/20 shadow mt-2"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn w-full bg-yellow-400 text-[#7b1e3b] hover:bg-yellow-500 font-semibold tracking-wide"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
