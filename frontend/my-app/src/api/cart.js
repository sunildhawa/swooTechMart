const { axiosAPIinstance } = require("@/utils/apiHealpers")

export const  getCart = async()=>{
    try{
    const res = await axiosAPIinstance.get(`cart`)
    return res.data
    }catch(error){
        return {success: false, data: []}
    }
}
export const  getCartById = async(id)=>{
  try{
    const res = await axiosAPIinstance.get(`cart/user/${id}`)
    return res.data
  }catch(error){
    return {success: false, data:{}}
  }
}
