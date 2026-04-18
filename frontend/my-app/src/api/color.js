const { axiosAPIinstance } = require("@/utils/apiHealpers")

const getColors = async(params = {})=>{
    try{
      const query = new URLSearchParams(params).toString()
      const url = query.length > 0 ? `/color?${query}`:"/color"
      const res = await axiosAPIinstance.get(url);
      return res.data
    }catch(error){
        return {success: false, data: []}
    }
}
const getColorById = async(id)=>{
    try{
      const res = await axiosAPIinstance.get(`/color/fetch/${id}`);
      return res.data
    }catch(error){
        return {success: false, data: {}}
    }
 
}
module.exports = {getColors, getColorById}