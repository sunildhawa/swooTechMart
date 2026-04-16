"use client";

import { axiosAPIinstance, notify, slugCreate } from "@/utils/apiHealpers";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiTag, FiLink, FiImage } from "react-icons/fi";

export default function AddCategoryPage() {
  const router = useRouter();
  const nameRef = useRef(null);
  const slugRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const generateSlug = () => {
    const name = nameRef.current.value;
    slugRef.current.value = slugCreate(name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const slug = slugRef.current.value.trim();
    const imageFile = e.target.image?.files[0];

    if (!name || !slug) {
      notify("Name & Slug field required!", false);
      return;
    }

    if (!imageFile) {
      notify("Image is required!", false);
      return;
    }

    const payload = new FormData();
    payload.append("name", name);
    payload.append("slug", slug);
    payload.append("image", imageFile);

    try {
      const response = await axiosAPIinstance.post(
        "category/create",
        payload
      );

      notify(
        response.data.message || "Category created successfully",
        response.data.success
      );

      if (response.data.success) {
        router.push("/admin/category");
      }
    } catch (error) {
      notify(
        error.response?.data?.message || "Something went wrong!",
        false
      );
    }
  };

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Category</h1>
        <p className="text-gray-500">
          Create a new category with slug and image
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* CATEGORY NAME */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Category Name
          </label>
          <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff7b00]">
            <FiTag className="text-gray-400" />
            <input
              type="text"
              ref={nameRef}
              onChange={generateSlug}
              placeholder="Enter category name"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* SLUG */}
        <div>
          <label className="text-sm font-medium text-gray-600">Slug</label>
          <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
            <FiLink className="text-gray-400" />
            <input
              type="text"
              ref={slugRef}
              readOnly
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* IMAGE */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Category Image
          </label>
          <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
            <FiImage className="text-gray-400" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="w-full text-sm text-gray-500"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-24 w-24 mt-4 rounded-xl object-cover"
            />
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.push("/admin/category")}
            className="px-6 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-[#ff7b00] text-white"
          >
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}
