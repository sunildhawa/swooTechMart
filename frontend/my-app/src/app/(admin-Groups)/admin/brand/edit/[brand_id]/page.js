import EditModule from "@/components/admin/EditModule";
import { getBrandById } from "@/api/brand";

export default async function Page({ params }) {
  const { brand_id } = await params; // ✅ MUST

  const res = await getBrandById(brand_id);
  return (
    <EditModule
      module="brand"
      data={res?.data || {}}
    />
  );
}
