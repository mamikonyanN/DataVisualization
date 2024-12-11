import { useEffect, useRef, useState } from 'react'
import useTestStore from '~/stores/testStore'
import {
  metricMaxHeight,
  metricTitleMargin,
  metricWidth,
  normInnerBlockPadding,
  normInnerBlockWidth,
  normInnerBoxHeight,
  viewBoxHeight,
} from '~/utils/constants'
import { coeff } from '~/utils/functions'

interface Props {
  horisontalOffset: number
}

const NormMetric = (props: Props) => {
  const innerBoxRef = useRef<SVGRectElement | null>(null)
  const [innerBoxWidth, setInnerBoxWidth] =
    useState<number>(normInnerBlockWidth)
  const [innerBoxHeight] = useState<number>(normInnerBoxHeight)
  const [popupVisible, setPopupVisibility] = useState<boolean>(false)

  useEffect(() => {
    setInnerBoxWidth((width) =>
      innerBoxRef.current
        ? Math.max(
            width,
            innerBoxRef.current.getBBox().width + normInnerBlockPadding * 2
          )
        : width
    )
  }, [])

  const { result, getMaxSum } = useTestStore()

  if (!result) return

  const coeff1 = coeff(getMaxSum(), metricMaxHeight)

  const horisontalOffset = props.horisontalOffset
  const verticalOffset = viewBoxHeight - coeff1(result.norm) - metricTitleMargin

  const columnHeight = coeff1(result.norm)
  const columnX = horisontalOffset
  const columnY = verticalOffset

  const innerBoxX = columnX + (metricWidth - innerBoxWidth) / 2
  const innerBoxY = columnY + (columnHeight - innerBoxHeight) / 2

  const titleY = viewBoxHeight

  return (
    <g>
      <pattern
        id="striped-pattern"
        patternUnits="userSpaceOnUse"
        width="10"
        height="10"
        patternTransform="rotate(45)"
      >
        <rect x="0" y="0" width="5" height="10" fill="#4AB6E8" />
      </pattern>

      <g style={{ clipPath: 'inset(0 round 10px)' }}>
        <rect
          x={columnX}
          y={columnY}
          width={metricWidth}
          height={columnHeight}
          fill="url(#striped-pattern)"
        />

        <rect
          x={innerBoxX}
          y={innerBoxY}
          width={innerBoxWidth}
          height={innerBoxHeight}
          fill="#ffffff"
          rx={5}
          ref={innerBoxRef}
        />
        <text
          x={horisontalOffset + metricWidth / 2}
          y={verticalOffset + columnHeight / 2}
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#898290"
          fontWeight={700}
        >
          {result.norm}
        </text>
      </g>

      <text
        style={{ cursor: 'pointer' }}
        x={horisontalOffset + metricWidth / 2}
        y={titleY}
        fontSize={10}
        fontWeight={400}
        textAnchor="middle"
        dominantBaseline="text-after-edge"
        fill="#898290"
        onMouseEnter={() => setPopupVisibility(true)}
        onMouseLeave={() => setPopupVisibility(false)}
      >
        норматив
      </text>

      {popupVisible && (
        <>
          <rect
            x={horisontalOffset}
            y={viewBoxHeight - metricTitleMargin - 20}
            width={metricWidth}
            height={20}
            fill="#ffffff"
          />

          <text
            x={horisontalOffset + metricWidth / 2}
            y={viewBoxHeight - metricTitleMargin - 10}
            fontSize={10}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#4AB6E8"
          >
            {result.norm}
          </text>
        </>
      )}
    </g>
  )
}

export default NormMetric
