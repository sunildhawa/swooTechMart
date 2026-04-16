import Link from "next/link";
import { FiEdit, FiPlus } from "react-icons/fi";
import { getCategories } from "@/api/category";
import DeleteBtn from "@/components/admin/DeleteBtn";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function Page() {
  const categories = await getCategories();
   console.log(categories.data)
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-gray-500 text-sm">
            Manage category flags and actions
          </p>
        </div>

        <Link href="/admin/category/add">
          <button className="flex items-center gap-2 bg-[#ff7b00] text-white px-5 py-2 rounded-xl">
            <FiPlus size={18} />
            Add Category
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Top</th>
              <th className="p-4 text-left">Home</th>
              <th className="p-4 text-left">Best</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories?.data.length === 0 && (
              <tr>
                <td colSpan="8" className="p-6 text-center">
                  No categories found
                </td>
              </tr>
            )}

            {categories?.data.map((cat) => (
              <tr
                key={cat._id}
                className="border-t hover:bg-orange-50"
              >
                <td className="p-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/category/${cat.image}`}
                    className="w-20 h-10 object-cover rounded"
                  />
                </td>

                <td className="p-4">{cat.name}</td>
                <td className="p-4">{cat.slug}</td>

                <td className="p-4">
                  <StatusBadge
                    status={cat.status}
                    flag="status"
                    url={`/category/status/${cat._id}`}
                  />
                </td>

                <td className="p-4">
                  <StatusBadge
                    status={cat.is_top}
                    flag="is_top"
                    url={`/category/is_top/${cat._id}`}
                  />
                </td>

                <td className="p-4">
                  <StatusBadge
                    status={cat.is_home}
                    flag="is_home"
                    url={`/category/is_home/${cat._id}`}
                  />
                </td>

                <td className="p-4">
                  <StatusBadge
                    status={cat.is_best}
                    flag="is_best"
                    url={`/category/is_best/${cat._id}`}
                  />
                </td>

                <td className="p-4 flex gap-2">
                   <Link
                      href={`/admin/category/edit/${cat._id}`}
                      className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200"
                    >
                      <FiEdit />
                    </Link>

                  <DeleteBtn
                    url={`category/delete/${cat._id}`}
                    redirect="/admin/category"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
