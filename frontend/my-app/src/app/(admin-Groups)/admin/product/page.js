import Link from "next/link";
import { FiEdit, FiPlus } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import { getProducts } from "@/api/product";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ViewButton from "@/components/admin/ViewButton";

export default async function Page() {
  // 🚀 Server-side fetch
  const res = await getProducts();
  const products = res?.success && Array.isArray(res.data) ? res.data : [];

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-gray-500 text-sm">
            Manage products, pricing and status
          </p>
        </div>

        <Link href="/admin/product/add">
          <button className="flex items-center gap-2 bg-[#ff7b00] text-white px-5 py-2 rounded-xl hover:opacity-90">
            <FiPlus size={18} />
            Add Product
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Best</th>
              <th className="p-4 text-left">Featured</th>
              <th className="p-4 text-left">Top</th>
              <th className="p-4 text-left">Home</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="9" className="p-6 text-center">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-orange-50 transition"
              >
                {/* IMAGE */}
                <td className="p-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/product/${product.thumbnail}`}
                    alt={product.name}
                    className="w-20 h-12 rounded-md object-cover"
                  />
                </td>

                {/* NAME & SLUG */}
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 font-medium">{product.slug}</td>

                {/* STATUS BADGES */}
                <td className="p-3">
                  <StatusBadge
                    status={product.status}
                    flag="status"
                    url={`/product/status/${product._id}`}
                  />
                </td>
                <td className="p-3">
                  <StatusBadge
                    status={product.is_best_seller}
                    flag="is_best_seller"
                    url={`/product/is_best_seller/${product._id}`}
                  />
                </td>
                <td className="p-3">
                  <StatusBadge
                    status={product.show_home}
                    flag="show_home"
                    url={`/product/show_home/${product._id}`}
                  />
                </td>
                <td className="p-3">
                  <StatusBadge
                    status={product.is_featured}
                    flag="is_featured"
                    url={`/product/is_featured/${product._id}`}
                  />
                </td>
                <td className="p-3">
                  <StatusBadge
                    status={product.is_hot}
                    flag="is_hot"
                    url={`/product/is_hot/${product._id}`}
                  />
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/admin/product/edit/${product._id}`}
                      className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200"
                    >
                      <FiEdit />
                    </Link>

                    <DeleteBtn
                      url={`/product/delete/${product._id}`}
                      redirect="/admin/product"
                    />

                    <ViewButton
                      product={product}
                      imageBaseUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/product/`}
                    />

                    <Link
                      href={`/admin/product/add-multiple-images/${product._id}`}
                      className="p-2 rounded-lg bg-orange-100 text-[#ff7b00] hover:bg-orange-200"
                    >
                      <FaImages />
                    </Link>
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
