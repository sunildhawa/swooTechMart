export default function DashboardCards({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="w-12 h-12 bg-orange-100 text-[#ff7b00] rounded-xl flex items-center justify-center mb-4">
              <Icon size={22} />
            </div>

            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        );
      })}
    </div>
  );
}
