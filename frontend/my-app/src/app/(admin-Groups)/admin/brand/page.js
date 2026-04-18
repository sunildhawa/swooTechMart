import Link from "next/link";
import { FiEdit, FiPlus } from "react-icons/fi";
import { getBrand } from "@/api/brand";
import DeleteBtn from "@/components/admin/DeleteBtn";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function Page() {
  const response = await getBrand();
  const brands = response?.data || [];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Brand Management</h2>
          <p className="text-gray-500 text-sm">
            Manage Brand, Name and Actions
          </p>
        </div>

        <Link href="/admin/brand/add">
          <button className="flex items-center gap-2 bg-[#ff7b00] text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
            <FiPlus size={18} />
            Add Brand
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-4 text-left rounded-l-xl">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Home</th>
              <th className="p-4 text-left">Best</th>
              <th className="p-4 text-left">Top</th>
              <th className="p-4 text-left rounded-r-xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.length === 0 && (
              <tr>
                <td colSpan="8" className="p-6 text-center">
                  No brands found
                </td>
              </tr>
            )}

            {brands.map((b) => (
              <tr
                key={b._id}
                className="border-t hover:bg-orange-50 transition"
              >
                <td className="p-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/brand/${b.image}`}
                    alt={b.name}
                    className="w-20 h-10 rounded-md object-contain"
                  />
                </td>

                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3 text-gray-600">{b.slug}</td>

                <td className="p-3">
                  <StatusBadge status={b.status} flag="status" url={`/brand/status/${b._id}`} />
                </td>

                <td className="p-3">
                  <StatusBadge status={b.is_home} flag="is_home" url={`/brand/is_home/${b._id}`} />
                </td>

                <td className="p-3">
                  <StatusBadge status={b.is_best} flag="is_best" url={`/brand/is_best/${b._id}`} />
                </td>

                <td className="p-3">
                  <StatusBadge status={b.is_top} flag="is_top" url={`/brand/is_top/${b._id}`} />
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/brand/edit/${b._id}`}
                      className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200"
                    >
                      <FiEdit />
                    </Link>
                    <DeleteBtn
                      url={`/brand/delete/${b._id}`}
                      redirect="/admin/brand"
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
