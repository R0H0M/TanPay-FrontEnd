export default function StoreCard({ store }) {
  return (
    <div className="relative group bg-black border border-zinc-800 rounded-2xl p-6 hover:border-fuchsia-500/50 transition duration-300">

      <h2 className="text-xl font-bold text-fuchsia-400 mb-4">
        {store.name}
      </h2>

      <p className="text-zinc-400 text-sm leading-relaxed mb-3">
        📍 {store.address}
      </p>

      <p className="text-zinc-300 text-sm">
        ☎️ {store.phone}
      </p>

      {/* Hover Glow */}
      <div className="
        pointer-events-none absolute inset-0 rounded-2xl opacity-0
        group-hover:opacity-100 transition
        shadow-[0_0_40px_rgba(217,70,239,0.15)]
      " />
    </div>
  )
}
