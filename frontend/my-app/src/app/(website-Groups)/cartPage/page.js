// app/cart/page.js
import ShopCart from '@/components/website/addToCart/ShoppingCart'

async function getCartData() {
  // Yahan aap apna API hit karein jo saare cart items laaye
  // Agar abhi API nahi hai, toh empty array [] return karein testing ke liye
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/cart-items`, { cache: 'no-store' });
    const result = await res.json();
    return result.data || []; 
  } catch (e) {
    return []; // Error pe khali cart dikhaye
  }
}

export default async function Page() {
  const cartData = await getCartData();

  return (
    <div>
       {/* Data prop pass karna zaroori hai */}
       <ShopCart data={cartData} />
    </div>
  )
}