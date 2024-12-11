import { useEffect, useRef, useState } from 'react'

interface Props {
  x: number
  y: number
  width: number
  height: number
  color: string
  title: number | string
}

const MetricSection = ({ x, y, width, height, color, title }: Props) => {
  const textRef = useRef<SVGTextElement | null>(null)
  const [textHeight, setTextHeight] = useState<number>(0)

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.getBBox().height)
    }
  }, [])

  return (
    <>
      <rect x={x} y={y} width={width} height={height} fill={color} />
      {height >= textHeight && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          fontSize={14}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          ref={textRef}
        >
          {title}
        </text>
      )}
    </>
  )
}

export default MetricSection
