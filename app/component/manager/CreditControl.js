export default function CreditControl({ value, onChange }) {
  const STEP = 100000 // 100 هزار تومان

  return (
    <div className="flex items-center gap-2">
      {/* minus */}
      <button
        onClick={() => onChange(Math.max(0, value - STEP))}
        className="w-9 h-9 flex items-center justify-center
                   rounded-lg bg-zinc-800 hover:bg-red-500/20
                   text-red-400 font-bold"
      >
        −
      </button>

      {/* value */}
      <input
        readOnly
        value={value.toLocaleString()}
        className="w-36 text-center bg-black border border-zinc-700
                   rounded-lg py-2 text-white font-semibold"
      />

      {/* plus */}
      <button
        onClick={() => onChange(value + STEP)}
        className="w-9 h-9 flex items-center justify-center
                   rounded-lg bg-zinc-800 hover:bg-green-500/20
                   text-green-400 font-bold"
      >
        +
      </button>
    </div>
  )
}
