interface IconProps {
  text: string
  icon: string
  color: string
}

export function Icon({ text, icon, color }: IconProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-2 py-1 font-normal leading-relaxed text-white"
      style={{ backgroundColor: `${color}` }}
    >
      <img src={icon} alt="tipo pokemon" width={16} height={16} />
      <span className="capitalize">{text}</span>
    </div>
  )
}
