// app/admin/users/page.tsx
import { getUsers } from '@/api/user';
import React from 'react';
import { Edit3,  Plus, Mail, Shield, Key } from 'lucide-react'; // Icons ke liye
import DeleteBtn from '@/components/admin/DeleteBtn';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
export default async function AdminUserPage() {
  const userResponse = await getUsers();
  const userData = userResponse?.data || [];
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage, edit and monitor your system users.</p>
          </div>
          <Link
          href={`/admin/user/add`}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 font-semibold">
            <Plus size={18} />
            <span>Add New User</span>
          </Link>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Access Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role & Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userData.map((user, index) => (
                  <tr key={user._id || index} className="hover:bg-indigo-50/30 transition-colors group">
                    {/* Image & Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={user.profilePic ? `${API_BASE}/uploads/user/${user.profilePic}` : "/user-placeholder.png"}
                            className="h-12 w-12 rounded-full border-2 border-white shadow-sm object-cover"
                            alt="user"
                          />
                          <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${user.status ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{user.name}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Password Field (Masked) */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2 bg-slate-100 w-fit px-2 py-1 rounded border border-slate-200">
                        <Key size={14} className="text-slate-400" />
                        <span className="font-mono">••••••••</span>
                      </div>
                    </td>

                    {/* Role & Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                          <Shield size={12} /> {user.role?.toUpperCase()}
                        </span>
                         <StatusBadge
                          status={user.status}
                          flag="status"
                          url={`/user/status/${user._id}`}
                         />
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                         href={`/admin/user/edit/${user._id}`}
                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors border border-transparent hover:border-indigo-200" title="Edit User">
                        <Edit3 size={18} />
                        </Link>
                       <DeleteBtn
                        url={`/user/delete/${user._id}`}
                       />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}