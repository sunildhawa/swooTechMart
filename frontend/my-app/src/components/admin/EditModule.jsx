'use client';

import { useEffect, useRef, useState } from "react";
import { slugCreate, axiosAPIinstance, notify } from "@/utils/apiHealpers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft,FiTag,FiLink,FiCheckCircle,FiImage } from "react-icons/fi";

export default function EditModule({ module, data }) {
  const router = useRouter();
  const nameRef = useRef(null);
  const slugRef = useRef(null);
  const fileRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [colorCode, setColorCode] = useState("#000000");

  useEffect(() => {
    if (!data) return;
    nameRef.current.value = data.name || "";
    slugRef.current.value = data.slug || "";
    if (module === "product") {
      setOriginalPrice(data.original_price || "");
      setDiscount(data.discount_percentage || "");
      setFinalPrice(data.final_price || "");
      setStock(data.stock || "");
    }
    if (module === "color") {
      setColorCode(data.code || "#000000");
      setPreview(data.code || "#000000");
    }
  }, [data, module]);

  useEffect(() => {
    if (module !== "product") return;
    const op = Number(originalPrice);
    const dis = Number(discount);
    if (!op) return setFinalPrice("");
    const fp = dis ? op - (op * dis) / 100 : op;
    setFinalPrice(fp.toFixed(2));
  }, [originalPrice, discount]);

  const generateSlug = () => {
    slugRef.current.value = slugCreate(nameRef.current.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", nameRef.current.value.trim());
    payload.append("slug", slugRef.current.value.trim());
    if (module === "color") payload.append("code", colorCode);
    const file = fileRef.current?.files?.[0];
    if (file && module !== "color") {
      payload.append(module === "product" ? "thumbnail" : "image", file);
    }
    if (module === "product") {
      payload.append("original_price", originalPrice);
      payload.append("discount_percentage", discount);
      payload.append("final_price", finalPrice);
      payload.append("stock", stock);
    }

    try {
      const res = await axiosAPIinstance.put(`${module}/update/${data._id}`, payload);
      notify(res.data.message, res.data.success);
      if (res.data.success) {
        router.push(`/admin/${module}`);
        router.refresh();
      }
    } catch (err) {
      notify(err?.response?.data?.message || "Update failed", false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <span className="bg-orange-100 text-orange-600 p-2 rounded-xl text-xl uppercase italic">
              {module.charAt(0)}
            </span>
            Edit {module}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Make changes to your {module} details below.</p>
        </div>
        <Link href={`/admin/${module}`} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-semibold transition-all">
          <FiArrowLeft/> Back to List
        </Link>
      </div>

      <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-5">

            {/* Input Group: Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FiTag className="text-orange-500" /> Name
              </label>
              <input
                ref={nameRef}
                onChange={generateSlug}
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                placeholder="Enter name..."
              />
            </div>

            {/* Input Group: Slug */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FiLink className="text-orange-500" /> Slug
              </label>
              <input
                ref={slugRef}
                readOnly
                className="w-full bg-slate-100 border border-slate-200 p-4 rounded-2xl outline-none text-slate-400 font-mono text-sm cursor-not-allowed"
              />
            </div>

            {/* Product Grid */}
            {module === "product" && (
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Original Price</label>
                  <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Discount (%)</label>
                  <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Final Price</label>
                  <input type="number" value={finalPrice} readOnly className="w-full bg-green-50 text-green-700 font-bold border border-green-100 p-4 rounded-2xl outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Stock</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange-500" />
                </div>
              </div>
            )}
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 rounded-[2rem] shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 text-lg">
            <FiCheckCircle size={22} /> Update {module}
          </button>
        </div>

        {/* Right Section: Media/Color */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 text-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
              {module === "color" ? "Select Color" : "Thumbnail / Image"}
            </label>

            <div
              className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 aspect-square flex items-center justify-center bg-slate-50 hover:border-orange-400 transition-all cursor-pointer"
              onClick={() => fileRef.current.click()} // ⭐ Force click toggle
            >
              {preview && module !== "color" ? (
                <img src={preview} className="w-full h-full object-cover p-2 rounded-[2rem]" alt="Preview" />
              ) : module === "color" ? (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-24 h-24 rounded-full shadow-lg border-4 border-white transition-transform group-hover:scale-110"
                    style={{ backgroundColor: colorCode }}
                  />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Click to change color</span>
                </div>
              ) : (
                <div className="text-slate-300 flex flex-col items-center">
                  <FiImage size={48} />
                  <span className="text-xs mt-2 font-medium">Click to change</span>
                </div>
              )}

              {/* ⭐ HIDDEN INPUT FIX */}
              <input
                ref={fileRef}
                type={module === "color" ? "color" : "file"}
                className="absolute w-0 h-0 opacity-0" // Input ko chota kar diya taaki box click handle kare
                value={module === "color" ? colorCode : undefined} // Color value bind kar di
                onChange={(e) => {
                  if (module === "color") {
                    const newColor = e.target.value;
                    setColorCode(newColor);
                    setPreview(newColor);
                  } else if (e.target.files[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>

            {module === "color" && (
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  value={colorCode}
                  onChange={(e) => {
                    setColorCode(e.target.value);
                    setPreview(e.target.value);
                  }}
                  className="w-full font-mono font-bold text-center text-slate-600 bg-slate-100 py-2 rounded-xl uppercase tracking-widest outline-none border border-transparent focus:border-orange-200"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}