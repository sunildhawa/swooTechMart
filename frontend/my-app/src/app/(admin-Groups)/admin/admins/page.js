import React from 'react';
import { ShieldCheck, Mail, Edit3, Trash2 } from 'lucide-react';
import { getAdmin } from '@/api/admin';
import Link from 'next/link';
import DeleteBtn from '@/components/admin/DeleteBtn';
import StatusBadge from '@/components/admin/StatusBadge';

const AdminManagement = async () => {
  const admins = await getAdmin();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Management</h1>
          <p className="text-gray-500">Manage, edit and monitor your system administrators.</p>
        </div>
        <Link href="/admin/admins/add" className="bg-[#5c4ae3] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#4a3bc7] transition-all shadow-lg shadow-indigo-100">
          <span>+</span> Add New Admin
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Admin</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Access Level</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Last Login</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {admins?.data.map((admin, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{admin.name}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Mail size={12} /> {admin.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-[#5c4ae3] font-bold text-sm">
                    <ShieldCheck size={16} />
                    {admin.role?.toUpperCase() || 'ADMIN'}
                  </div>
                </td>
                <td className="p-6 text-sm text-gray-500 font-medium">
                  {admin.lastLogin || 'Never'}
                </td>
                <td className="p-6">
                  <StatusBadge
                    status={admin.status}
                    flag="status"
                    url={`/admin/status/${admin._id}`}
                  />

                </td>
                <td className="p-6">
                  <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* EDIT BUTTON */}
                    <Link
                      href={`/admin/admins/edit/${admin._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Admin"
                    >
                      <Edit3 size={18} />
                    </Link>

                    {/* DELETE BUTTON */}
                    <DeleteBtn
                      url={`admin/delete/${admin._id}`}

                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Admin"
                    >
                      <Trash2 size={18} />
                    </DeleteBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagement;