export function Header() {
  return (
    <div className="mt-6 flex h-20 w-full rounded-lg bg-white shadow-lg">
      <div className="ml-4 flex items-center justify-start gap-3 border-b-4 border-[#ff5350]">
        <img
          src="./images/icons/pokeball.svg"
          alt="Pokeball"
          height={40}
          width={40}
        />
        <span className="text-lg font-semibold text-[#ff5350]">Pokédex</span>
      </div>
    </div>
  )
}
