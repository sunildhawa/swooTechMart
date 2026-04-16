import { axiosAPIinstance } from "@/utils/apiHealpers";

export const getUsers = async () => {
  try {
    const res = await axiosAPIinstance.get("/user");
    return res.data;
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return {
      success: false,
      data: [],
      message: error?.response?.data?.message || "Failed to fetch users",
    };
  }
};


export const getUserById = async (id) => {
  try {
    const res = await axiosAPIinstance.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.error("GET USER BY ID ERROR:", error);

    return {
      success: false,
      data: null,
      message: error?.response?.data?.message || "User not found",
    };
  }
};
