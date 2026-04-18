const { axiosAPIinstance } = require("@/utils/apiHealpers");

// src/api/category.js
// export const getCategories = async(params = {})=>{
//   try{
//     const query = new URLSearchParams(params).toString();
//     const url = query.length > 0 ? `category?${query}`:"category"

//     const res = await axiosAPIinstance.get(url);
//     return res.data
//   }catch(error){
//     return {success: false, data: []}
//   }
// }

// export const getCategories  = async(params = {})=>{
//   try{
//     const query = new URLSearchParams(params).toString();
//     const url = query.length > 0 ? `category?${query}`:"category"

//     const res = await axiosAPIinstance.get(url);
//     return res.data
//   }catch(error){
//     return {success: false}
//   }
// }
export const getCategories = async(params = {})=>{
  try{
   const query = new URLSearchParams(params).toString();
   const url = query.length > 0 ? `/category?${query}`:"/category"
   const res = await axiosAPIinstance.get(url);
   return res.data
  }catch(error){
   return {success: false, data: []}
  }
}
export const getCategoryById = async (id) => {
  try {
    const res = await axiosAPIinstance.get(`/category/fetch/${id}`);
    return res.data;
  } catch {
    return { success: false, data: {} };
  }
};


