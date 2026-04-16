'use client'

import { axiosAPIinstance, notify } from "@/utils/apiHealpers";
import { useRouter } from "next/navigation";

function StatusBadge({ status, flag, url }) {
  const router = useRouter();

  let display = "";

  if (flag === "status") display = status ? "Active" : "Inactive";
  if (flag === "is_top") display = status ? "Top" : "Not Top";
  if (flag === "is_best") display = status ? "Best" : "Not Best";
  if (flag === "is_home") display = status ? "Home" : "Not Home";
  if (flag === "is_best_seller") display = status ? "Best Seller" : "Not Best Seller";
  if (flag === "is_featured") display = status ? "Featured" : "Not Featured";
  if (flag === "is_hot") display = status ? "Hot" : "Not Hot";
  if (flag === "show_home") display = status ? "Show Home" : "Hide Home";

  const base =
    "px-3 py-1 rounded-full cursor-pointer text-sm font-medium";

 const statusHandler = async () => {
  try {
    const res = await axiosAPIinstance.put(url); // ✅ no second argument

    if (res.data.success) {
      notify(res.data.message, true);
      router.refresh();
    } else {
      notify("Update failed", false);
    }

  } catch (error) {
    notify(error?.response?.data?.message || "Update failed", false);
  }
};


  return (
    <span
      onClick={statusHandler}
      className={`${base} ${
        status
          ? "bg-green-100 text-green-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      {display}
    </span>
  );
}

export default StatusBadge;
