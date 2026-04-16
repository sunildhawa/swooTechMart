import Link from "next/link";
import { FiEdit, FiPlus } from "react-icons/fi";
import DeleteBtn from "@/components/admin/DeleteBtn";
import StatusBadge from "@/components/admin/StatusBadge";
import { getColors } from "@/api/color";

export default async function Page() {
  // 🚀 Server-side fetch
  const res = await getColors();
  const colors = res?.success && Array.isArray(res.data) ? res.data : [];

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Color Management</h2>

        {/* ADD BUTTON */}
        <Link href="/admin/color/add">
          <button className="flex items-center gap-2 bg-[#ff7b00] text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
            <FiPlus size={18} />
            Add Color
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-4 text-left rounded-l-xl">Color</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left rounded-r-xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            {colors.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  No colors found
                </td>
              </tr>
            )}

            {colors.map((color) => (
              <tr key={color._id} className="border-t hover:bg-orange-50 transition">
                
                {/* COLOR BLOCK */}
                <td className="p-4">
                  <div
                    style={{ background: color.code }}
                    className="w-20 h-10 rounded-md"
                  ></div>
                </td>

                {/* NAME & SLUG */}
                <td className="p-4 font-medium">{color.name}</td>
                <td className="p-4 text-gray-600">{color.slug}</td>

                {/* STATUS BADGE */}
                <td className="p-4">
                  <StatusBadge
                    status={color.status}
                    flag="status"
                    url={`/color/status/${color._id}`}
                  />
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/color/edit/${color._id}`}
                      className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200"
                    >
                      <FiEdit />
                    </Link>

                    <DeleteBtn
                      url={`/color/delete/${color._id}`}
                      redirect="/admin/color"
                    />
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
