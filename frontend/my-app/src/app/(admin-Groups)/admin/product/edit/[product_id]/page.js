import EditModule from "@/components/admin/EditModule";
import { getProductById } from "@/api/product";

export default async function Page({ params }) {

  // 🔥 FIX: params ko await karo
  const { product_id } = await params;
  console.log("PRODUCT ID:", product_id); // ✅ ab undefined nahi hoga
  const product = await getProductById(product_id);
   console.log(product?.data)
  return (
    <EditModule
      module="product"
      data={product?.data || {}}
    />
  );
}
