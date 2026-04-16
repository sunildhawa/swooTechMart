import Image from 'next/image'

export default function PreOrderBanner() {
  return (
    <section className="relative overflow-hidden rounded-xl h-35 md:h-40">

      {/* Background Image */}
      <Image
        src="/promos/watch.png"
        alt="Oppo Watch Sport Series 8"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay (KEY FIX) */}
      <div className="absolute inset-0 bg-linear-to-r from-teal-600/85 via-teal-500/40 to-teal-500/85" />

      {/* Content */}
      <div className="relative z-10 h-full px-6 md:px-10 flex items-center justify-between">

        {/* LEFT TEXT */}
        <div className="text-white">
          <p className="text-sm font-semibold uppercase tracking-wide">
            Pre Order
          </p>
          <p className="text-xs opacity-90 mt-1">
            Be the first to own
          </p>
          <p className="text-sm font-medium mt-2">
            From $399
          </p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-white text-right hidden sm:block">
          <p className="text-xs opacity-90">
            Oppo Watch Sport Series 8
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mt-1 mb-3 leading-tight">
            A healthy leap ahead
          </h3>

          <button className="bg-white text-teal-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
            Discover Now
          </button>
        </div>

      </div>
    </section>
  )
}