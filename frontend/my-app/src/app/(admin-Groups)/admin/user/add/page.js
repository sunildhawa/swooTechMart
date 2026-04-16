"use client"
import { axiosAPIinstance, notify } from '@/utils/apiHealpers';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddUserForm = () => {
    const router = useRouter()
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
const submitHandler = async (e) => {
  e.preventDefault();

  if (!name || !Email || !password || !role || !image) {
    return notify("All fields are required!", false);
  }

  const payload = new FormData();
  payload.append("name", name);
  payload.append("email", Email);
  payload.append("password", password);
  payload.append("role", role);
  if(image) payload.append("image", image)
  try {
    const res = await axiosAPIinstance.post(`user/create`, payload);

    if (res.data.success) {
      notify(res.data.message, true);
      router.push("/admin/user")
    } else {
      notify(res.data.message || "Failed", false);
    }

  } catch (err) {
    const msg = err.response?.data?.message || "Server Error";
    notify(msg, false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New User</h2>
        
        <form type="submit" onSubmit={submitHandler} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              onChange={(e)=> setName(e.target.value)}
              placeholder="John Doe" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="john@example.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select onChange={(e)=> setRole(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white">
              <option value="user">User</option>
              <option value="admin">Admin</option>
               <option value="user">User</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              onChange={(e)=> setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* {images} */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="file" 
              onChange={(e)=> {setImage(e.target.files[0]), setPreview(URL.createObjectURL(e.target.files[0]))}}
              placeholder="images" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          {preview &&(
          <img
           src={preview}
           className='h-12 w-12 rounded-4xl border border-amber-50'
          />
          )}
         
          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mt-6"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;