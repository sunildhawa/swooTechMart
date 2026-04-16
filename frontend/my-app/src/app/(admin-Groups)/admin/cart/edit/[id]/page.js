// src/app/(admin-Groups)/admin/cart/edit/[id]/page.js

import { getCartById } from "@/api/cart";
import AdminCartManagementNew from "@/components/admin/VeiwCart";

// src/app/(admin-Groups)/admin/cart/edit/[id]/page.js

export default async function Page({ params }) {
    // Next.js 15+ mein params ko await karna compulsory hai
    const { id } = await params; 
    
    console.log("Current User ID from URL:", id); // Browser terminal mein check karein

    const res = await getCartById(id);
    
    // Debug karein ki API kya bhej rahi hai
    console.log("API Response for this user:", res.data);

    const cartData = res?.data || [];
    const userInfo = cartData.length > 0 ? cartData[0].userId : null;

    return (
        <AdminCartManagementNew 
            initialData={cartData} 
            user={userInfo} 
            isEditPage={true} 
        />
    );
}