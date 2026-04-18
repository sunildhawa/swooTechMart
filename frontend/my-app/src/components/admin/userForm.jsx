"use client";

import { axiosAPIinstance, notify } from "@/utils/apiHealpers";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserFormUI({ data }) {
  const router = useRouter();

  const nameRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);
  const imageRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState(true);

  /* ================= PREFILL DATA (EDIT MODE) ================= */
  useEffect(() => {
    if (!data) return;

    if (nameRef.current) nameRef.current.value = data.name || "";
    if (emailRef.current) emailRef.current.value = data.email || "";

    setRole(data.role || "Admin");
    setStatus(data.status ?? true);
  }, [data]);

  /* ================= CLEAN IMAGE PREVIEW ================= */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ================= SUBMIT ================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passRef.current.value.trim();
    const image = imageRef.current.files[0];

    if (!name || !email) {
      return notify("Name & Email are required", false);
    }

    const payload = new FormData();
    payload.append("name", name);
    payload.append("email", email);
    payload.append("role", role);
    payload.append("status", status);

    // password optional (only if user enters)
    if (password) payload.append("password", password);

    // image optional
    if (image) payload.append("image", image);

    try {
      const res = await axiosAPIinstance.put(
        `/user/update/${data._id}`,
        payload
      );

      notify(res.data.message || "User updated", res.data.success);
      router.push("/admin/user");
    } catch (err) {
      notify(
        err?.response?.data?.message || "Server error",
        false
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit User
        </h1>
        <p className="text-gray-500 text-sm">
          Update user details and permissions
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={submitHandler}>
          <div className="p-6 space-y-6">

            {/* NAME & PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  User Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  New Password (optional)
                </label>
                <input
                  ref={passRef}
                  type="password"
                  placeholder="Leave blank to keep same"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* ROLE & STATUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Status
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={status === true}
                      onChange={() => setStatus(true)}
                    />
                    Active
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={status === false}
                      onChange={() => setStatus(false)}
                    />
                    Inactive
                  </label>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Profile Image
              </label>
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
              />

              <div className="mt-3">
                {preview ? (
                  <img
                    src={preview}
                    className="h-24 w-24 rounded border"
                  />
                ) : (
                  data?.image && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/user/${data.image}`}
                      className="h-24 w-24 rounded border"
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
