const { axiosAPIinstance } = require("@/utils/apiHealpers");
const getBrand = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = query.length > 0 ? `brand?${query}`:"brand"
    

    const res = await axiosAPIinstance.get(url);  
    return res.data;
  } catch (error) {
    return {success: false, data : []}
  }
};
const getBrandById = async(id)=>{
    try{
    const res = await axiosAPIinstance.get(`brand/${id}`);
    return res.data
    }catch(error){
        return {success: false, data: {} }
    }
   
}
const addBrand = async (data) => {
  try {
    const res = await axiosAPIinstance.post("brand/create", data);
    return res.data;
  } catch (error) {
    console.error("addBrand error:", error);
    return { success: false, data: {} };
  }
};
const updateBrand = async (id, data) => {
  try {
    const res = await axiosAPIinstance.put(`brand/update/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("updateBrand error:", error);
    return { success: false, data: {} };
  }
};
// const updateFlag = async (id, flagName, value) => {
//   try {
//     const res = await axiosAPIinstance.put(
//       `brand/${flagName}/${id}`,
//       { [flagName]: value }
//     );
//     return res.data;
//   } catch (error) {
//     console.error("updateFlag error:", error.response?.data || error);
//     throw error;
//   }
// };
module.exports = {
  getBrand,
  addBrand,
  updateBrand,
  getBrandById,
};
