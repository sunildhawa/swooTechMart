'use client'

import React from 'react'
import { FiTrash2 } from "react-icons/fi";
import { notify, axiosAPIinstance } from '@/utils/apiHealpers';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

export default function DeleteBtn({ url, onSuccess }) {
  const router = useRouter(); // 🔥 router for refresh

  function deleteHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosAPIinstance.delete(url)
          .then((response) => {
            notify(response.data.message, response.data.success);

            if (response.data.success) {
              // 🔥 Auto refresh page data without full reload
              router.refresh();

              // Optional: call parent callback
              if (onSuccess) onSuccess();
            }
          })
          .catch((error) => {
            notify(error?.response?.data?.message, false);
          });
      }
    });
  }

  return (
    <button
      onClick={deleteHandler}
      className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200"
    >
      <FiTrash2 />
    </button>
  );
}
