import CategorySidebar from "./CateBar"
import HeroBanner from "./HeroBaner"
import FeaturedBrands from "./featuredBrands"
import TopCategories from "./TopCategorise"
export default function SectionOne() {

    // temporary static data (API-ready later)
    const categories = [
        { name: 'Laptops', count: 1 },
        { name: 'PC & Computers', count: 2 },
        { name: 'Cell Phones', count: 3 },
        { name: 'Tablets', count: 4 },
        { name: 'Cameras', count: 5 },
    ]

    return (
        <section className="max-w-7xl mx-auto px-4 py-6">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <CategorySidebar categories={categories} />
                <HeroBanner />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <FeaturedBrands />
                <TopCategories />
            </div>
        </section>
    )
}