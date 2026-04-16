import { getProductById } from "@/api/product";
import ShopCart from "@/components/website/addToCart/ShoppingCart";

export default async function Page({ params }) {
  const { id } = await params; 
  console.log("PRODUCT ID FROM URL:", id);

  const response = await getProductById(id);
  const productData = response?.data || null;

  console.log("FETCHED PRODUCT DATA:", productData);

  if (!productData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">Product nahi mila!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Component ka naam vahi rakhein jo import kiya hai */}
      <ShopCart data={productData} />
    </div>
  );
}