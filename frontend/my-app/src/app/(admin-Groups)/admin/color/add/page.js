"use client";
import { useRef } from "react";
import { FiTag, FiLink, FiImage } from "react-icons/fi";
import { slugCreate, notify, axiosAPIinstance } from "@/utils/apiHealpers";
import { useRouter } from "next/navigation";


export default function AddCategoryPage() {
    const router = useRouter()
    const nameRef = useRef();
    const slugRef = useRef();

    function generateSlug() {
        const slug = slugCreate(nameRef.current.value);
        slugRef.current.value = slug
    }
    function submitHandler(e) {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            slug: slugRef.current.value,
            code: e.target.code.value,
        }
        axiosAPIinstance.post("color/create", payload).then((response) => {
            notify(response.data.message, response.data.success);
            if (response.data.success) {
                nameRef.current.value = "";
                slugRef.current.value = "";
                router.push("/admin/color")
            }
           
        }).catch((error) => {
            notify(error?.response?.data?.message, false)
        })

    }

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10">

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Add Color</h1>

            </div>

            {/* FORM */}
            <form onSubmit={submitHandler} className="space-y-6">
                {/* CATEGORY NAME */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff7b00]">
                        <FiTag className="text-gray-400" />
                        <input
                            onChange={generateSlug}
                            ref={nameRef}
                            type="text"
                            placeholder="Enter color name"
                            className="w-full outline-none"
                        />
                    </div>
                </div>

                {/* SLUG */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Slug
                    </label>
                    <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff7b00]">
                        <FiLink className="text-gray-400" />
                        <input
                            ref={slugRef}
                            readOnly
                            type="text"
                            placeholder="enter-color-slug"
                            className="w-full outline-none"
                        />
                    </div>
                </div>

                {/* CATEGORY IMAGE */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        hexCode
                    </label>
                    <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
                        <FiImage className="text-gray-400" />
                        <input
                            type="color"
                            name="code"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-orange-50 file:text-[#ff7b00]
                            hover:file:bg-orange-100"
                        />
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-end gap-4 pt-6">
                    <button
                        onClick={()=> router.push("/admin/color")}
                        type="button"
                        className="px-6 py-2 rounded-xl border text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button

                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#ff7b00] text-white hover:opacity-90"
                    >
                        Save Category
                    </button>
                </div>
            </form>
        </div>
    );
}