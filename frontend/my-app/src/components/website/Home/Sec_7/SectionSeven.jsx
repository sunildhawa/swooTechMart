import DualPromoBanners from './DualPromoBanners'
import RecentlyViewedRow from './RecentlyViewedRow'
import MarketplaceInfo from './MarketplaceInfo'

export default function SectionSeven() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <DualPromoBanners />
            <RecentlyViewedRow />
            <MarketplaceInfo /> {/* 👈 added here */}
        </section>
    )
}