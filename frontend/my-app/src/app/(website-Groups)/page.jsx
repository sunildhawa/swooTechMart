import SectionOne from '@/components/website/Home/Sec_1/SectionOne'
import SectionTwo from '@/components/website/Home/Sec_2/SectionTwo'
import SectionThree from '@/components/website/Home/Sec_3/SectionThree'
import SectionFour from '@/components/website/Home/Sec_4/SectionFour'
import SectionFive from '@/components/website/Home/Sec_5/SectionFive'
import SectionSix from '@/components/website/Home/Sec_6/SectionSex'
import SectionSeven from '@/components/website/Home/Sec_7/SectionSeven'
import React from 'react'
import ContactPage from "@/components/website/Contact/ContactPage";


export default function page() {
  return (
    <div className='w-full'>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <ContactPage />
    </div>
  )
}