interface Props {
  direction: -1 | 0 | 1
  size: number
  x: number
  y: number
}

const Arrow = ({ direction, size, x, y }: Props) => {
  if (direction === 0) return
  return (
    <svg
      x={x}
      y={y - size / 2}
      height={size}
      width={size / 2}
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        strokeLinecap="round"
        fill="color"
        stroke="#ffffff"
        strokeWidth={3}
        d={`        
           M ${size / 2},${0}
           V ${size}

           M ${size / 2},${direction === 1 ? size : 0}
           l ${size / 4},${(direction === 1 ? -size : size) / 2}

           M ${size / 2},${direction === 1 ? size : 0}
           l ${-size / 4},${(direction === 1 ? -size : size) / 2}
           `}
        textAnchor="middle"
        dominantBaseline="central"
      />
    </svg>
  )
}

export default Arrow
