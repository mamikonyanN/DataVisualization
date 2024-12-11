interface Props {
  color: string
  size?: number
}

const ColorBox = (props: Props) => {
  const size = props.size || 20
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={props.color} rx={3} />
    </svg>
  )
}

export default ColorBox
