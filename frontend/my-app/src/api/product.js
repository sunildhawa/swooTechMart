const { axiosAPIinstance } = require("@/utils/apiHealpers")

const getProducts = async(params = {})=>{
    try{
      const query = new URLSearchParams(params).toString();
      const url = query.length > 0 ? `product?${query}`:"product"
      const res = await axiosAPIinstance.get(url)
      return res.data
     }catch(error){
      return {success: false, data: []}
    }
}
 const getProductById = async (id) => {
  try {
    const res = await axiosAPIinstance.get(`product/fetch/${id}`);
    return res.data;
  } catch {
    return { success: false, data: {} };
  }
};

module.exports = {getProducts,getProductById}