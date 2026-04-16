"use client";

import { FiTag, FiLink, FiImage } from "react-icons/fi";
import Select from "react-select";
import { Editor } from "primereact/editor";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { axiosAPIinstance, notify, slugCreate } from "@/utils/apiHealpers";

export default function AddProductPage() {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState(null);
  const [brands, setBrands] = useState(null);
  const [colors, setColors] = useState([]);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [colorOptions, setColorsOptions] = useState([]);

  const nameRef = useRef("");
  const slugRef = useRef("");
  const original_priceRef = useRef("")
  const discountRef = useRef("");
  const final_priceRef = useRef("");
  const previewRef = useRef(null);
  const thumbnailRef = useRef(null);
  
  const loadData = async()=>{
    const cateRes = await axiosAPIinstance.get("category");
    const brandRes = await axiosAPIinstance.get("brand");
    const colorRes = await axiosAPIinstance.get("color");
   
    setCategoryOptions(
      cateRes?.data?.data.map(item =>({
        value: item._id,
        label: item.name
      }))
    )
    setBrandOptions(
      brandRes?.data?.data.map(item => ({
        value: item._id,
        label: item.name
      }))
    );
    setColorsOptions(
      colorRes?.data?.data.map(item => ({
        value: item._id,
        label: item.name
      }))
    )
  }
  useEffect(()=>{
    loadData()
  },[])
 
  const generateSlug = ()=>{
    const slug = slugCreate(nameRef.current.value.trim());
    slugRef.current.value = slug
  }
  const handlePreview = ()=>{
    const file = thumbnailRef.current.files[0];
    if(file) previewRef.current.src = URL.createObjectURL(file)
  }
  const calculateFinalPrice = ()=>{
    const price = Number(original_priceRef.current.value.trim() || 0);
    const disc  = Number(discountRef.current.value.trim() || 0);

    if(price >= 0 && disc >= 0){
      const final = price - (price * disc) / 100;
      final_priceRef.current.value = final.toFixed(2)
    }
  }
 
  const submitHandler = async(e)=>{
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const slug = slugRef.current.value.trim();
    const original_price = original_priceRef.current.value.trim();
    const discount = discountRef.current.value.trim();
    const final_price = final_priceRef.current.value.trim();
    const thumbnail = thumbnailRef.current.files[0];
    
    
if (
  !name ||
  !slug ||
  !original_price ||
  !discount ||
  !final_price ||
  !thumbnail ||
  !description ||
  description.trim() === "<p><br></p>"
) {
  return notify("All fields are required!", false);
}

    if(!category || !brands|| colors.length === 0){
      return notify("Category/Brand/Color feild required!", false)
    }
    const payload = new FormData();
    payload.append("name", name);
    payload.append("slug", slug);
    payload.append("original_price", original_price);
    payload.append("discount_percentage",discount);
    payload.append("final_price", final_price);
    payload.append("description", description);
    payload.append("category_id", category.value);
    payload.append("brand_id", brands.value);
    colors.forEach(e => {
      payload.append("color_id[]", e.value)
    });
    
    if(thumbnail) payload.append("thumbnail", thumbnail)
   
       try{
        await axiosAPIinstance.post("product/create", payload);
         router.push("/admin/product");
         return notify("Product Created Successfull !", true)
       }catch(error){
         return notify(error?.response?.data?.data?.message || "Something went wrong.!", false)
       }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Product</h1>
      </div>

      <form className="space-y-6" onSubmit={submitHandler}>
        <div className="grid gap-4 grid-cols-2">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product Name
            </label>
            <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
              <FiTag className="text-gray-400" />
              <input
                type="text"
                ref={nameRef}
                onChange={generateSlug}
                placeholder="Enter product name"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* SLUG */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Slug
            </label>
            <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
              <FiLink className="text-gray-400" />
              <input
                type="text"
                ref={slugRef}
                placeholder="product-slug"
                className="w-full outline-none"
                readOnly
              />
            </div>
          </div>

          {/* PRICE SECTION */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <input
              className="border rounded-xl px-4 py-3 outline-none"
              placeholder="Original price"
              ref={original_priceRef}
              onChange={calculateFinalPrice}
            />
            <input
              className="border rounded-xl px-4 py-3 outline-none"
              placeholder="Discount (%)"
              ref={discountRef}
              onChange={calculateFinalPrice}
            />
            <input
              className="border rounded-xl px-4 py-3 outline-none bg-gray-50"
              placeholder="Final price"
              readOnly
              ref={final_priceRef}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-full">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <div className="mt-2 border rounded-xl px-4 py-3">
              <Editor
                style={{ height: "300px" }}
                placeholder="Write product description here..."
                value={description}
                onTextChange={(e)=> setDescription(e.htmlValue)}
              />
            </div>
          </div>

          {/* CATEGORY / BRAND / COLOR */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <Select
             placeholder="Category"
             options={categoryOptions}
             value={category}
             onChange={setCategory} 
             />
            <Select
             placeholder="Brand" 
             options={brandOptions}
             onChange={setBrands} 
             value={brands} 
              />
            <Select 
            isMulti 
            placeholder="Color"
            options={colorOptions} 
            value={colors} 
            onChange={setColors} 
            />
          </div>
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Thumbnail
          </label>
          <div className="mt-2 flex items-center gap-3 border rounded-xl px-4 py-3">
            <FiImage className="text-gray-400" />
            <input
              type="file"
              className="w-full text-sm"
              name="thumbnail"
              onChange={handlePreview}
              ref={thumbnailRef}
            />
          </div>
          {/* Placeholder for preview */}
          <div className="h-24 w-40 mt-2 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs border border-dashed">
            <img
             ref={previewRef}
             className="h-24 w-40"
             name="image"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={() => router.push("/admin/product")}
            type="button"
            className="px-6 py-2 rounded-xl border text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 rounded-xl bg-[#ff7b00] text-white hover:bg-[#e66f00] transition-colors"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
