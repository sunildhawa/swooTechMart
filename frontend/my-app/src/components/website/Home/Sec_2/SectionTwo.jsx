import DealsOfTheDay from './DealsOffTheDay'
import SidePromoCards from './SidepromoCard'
// import PreOrderBanner from './ProOrderBenner'

export default function SectionTwo() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
                <div className="lg:col-span-3">
                    <DealsOfTheDay />
                </div>
                <div className="lg:col-span-1">
                    <SidePromoCards />
                </div>
            </div>

            {/* <div className="mt-2">
                <PreOrderBanner/>
            </div> */}
        </section>
    )
}
