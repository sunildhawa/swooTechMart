import { getColorById } from '@/api/color';
import EditModule from '@/components/admin/EditModule';
import React from 'react'

export default async function page({ params }) {
   const {color_id} = await params;
   const res = await getColorById(color_id)
   console.log(res.data)
    return (
        <EditModule module={"color"} data={res?.data || {}} />
    )
}