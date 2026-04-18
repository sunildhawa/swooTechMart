import { axiosAPIinstance } from "@/utils/apiHealpers"

export const getAdmin = async()=>{
    try{
     const res = await axiosAPIinstance.get("/admin")
     return res.data
    }catch(error){
        return {success: false, data:[]}
    }
}
export const getByIdAdmin = async(id)=>{
    try{
    const res = await axiosAPIinstance.get(`/admin/fetch/${id}`, data);
    return res.data
    }catch(error){
        return {success: false, data:{}}
    }
}
