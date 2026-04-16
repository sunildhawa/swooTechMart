import EditModule from "@/components/admin/EditModule";
import { getCategoryById } from "@/api/category";

export default async function Page({ params }) {
const { category_id } = await params;
  console.log("CATEGORY ID:", category_id); // ✅ ab undefined nahi hoga
  const categories = await getCategoryById(category_id);
   console.log(categories?.data)
  return (
    <EditModule
      module="category"
      data={categories?.data || {}}
    />
  );
}

