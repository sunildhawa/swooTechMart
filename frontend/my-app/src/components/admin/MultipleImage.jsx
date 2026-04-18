"use client";
import { notify, axiosAPIinstance } from "@/utils/apiHealpers";
import { useRouter } from "next/navigation";

export default function MultipleImageAdd({ productData }) {
    const router = useRouter();

    function submitHandler(e) {
        e.preventDefault();

        if (!productData?._id) {
            notify("Product not loaded", false);
            return;
        }

        if (!e.target.image.files.length) {
            notify("Please select images", false);
            return;
        }

        const payload = new FormData();
        for (let img of e.target.image.files) {
            payload.append("images", img);
        }

        axiosAPIinstance.post(
            `product/otherImageAdd/${productData._id}`,
            payload,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((response) => {
            notify(response.data.message, response.data.success);
            if (response.data.success) {
                e.target.reset();
                router.push("/admin/product");
            }
        })
        .catch((error) => {
            notify(error?.response?.data?.message || "Upload failed", false);
        });
    }

    console.log("productData =>", productData);

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10">

            <h1 className="text-3xl font-bold mb-6">Add Images</h1>

            <div className="flex overflow-x-scroll gap-4 mb-6">
                {productData?.other_images?.map((item, index) => (
                    <img
                        key={index}
                        className="w-20 h-20 object-cover rounded"
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/product/other/${item}`}
                        alt="product"
                    />
                ))}
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    multiple
                    className="w-full"
                />

                <button
                    type="button"
                    onClick={() => router.push("/admin/product")}
                    className="px-6 py-2 m-3 rounded-xl bg-white text-[#ff7b00] border border-amber-200"
                >
                    cancal
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 p-3 rounded-xl bg-[#ff7b00] text-white"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
