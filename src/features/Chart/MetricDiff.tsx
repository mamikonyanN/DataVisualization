import { useEffect, useRef, useState } from 'react'
import useTestStore from '~/stores/testStore'
import Arrow from '~/ui/Arrow'
import {
  arrowheadLength,
  arrowSideMargin,
  blockHeight,
  blockStroke,
  blockWidth,
  metricMargin,
  metricMaxHeight,
  metricWidth,
  minArrowMargin,
  viewBoxHeight,
} from '~/utils/constants'
import { coeff } from '~/utils/functions'

const bad = '#FC440F'
const good = '#00CC99'
const neutral = '#898290'

const numberFormatter = new Intl.NumberFormat('en-US', {
  signDisplay: 'exceptZero',
})

const MetricDiff = () => {
  const { result, getSum, getMaxSum } = useTestStore()

  const block1TextRef = useRef<SVGTextElement | null>(null)
  const block2TextRef = useRef<SVGTextElement | null>(null)

  const [block1Width, setBlock1Width] = useState<number>(blockWidth)
  const [block2Width, setBlock2Width] = useState<number>(blockWidth)

  const [text1Width, setText1Width] = useState<number>(0)
  const [text2Width, setText2Width] = useState<number>(0)

  if (!result) return

  const diff1: number | string = getSum(result.test) - getSum(result.dev)
  const diff2: number | string = getSum(result.prod) - getSum(result.test)
  const arrowSize = 16
  const addArrSize1 = diff1 !== 0 ? arrowSize / 2 : 0
  const addArrSize2 = diff2 !== 0 ? arrowSize / 2 : 0

  useEffect(() => {
    if (block1TextRef.current) {
      setText1Width(block1TextRef.current.getBBox().width)
      setBlock1Width(
        Math.max(
          blockWidth,
          block1TextRef.current.getBBox().width + 4 + addArrSize1 * 1.5
        )
      )
    }

    if (block2TextRef.current) {
      setText2Width(block2TextRef.current.getBBox().width)
      setBlock2Width(
        Math.max(
          blockWidth,
          block2TextRef.current.getBBox().width + 4 + addArrSize2 * 1.5
        )
      )
    }
  }, [result])

  const coeff1 = coeff(getMaxSum(), metricMaxHeight)

  const heightDev = viewBoxHeight - minArrowMargin - coeff1(getSum(result.dev))
  const heightTest =
    viewBoxHeight - minArrowMargin - coeff1(getSum(result.test))
  const heightProd =
    viewBoxHeight - minArrowMargin - coeff1(getSum(result.prod))

  const fill1 = diff1 > 0 ? good : diff1 < 0 ? bad : neutral
  const fill2 = diff2 > 0 ? good : diff2 < 0 ? bad : neutral

  const arrowStartY = blockHeight / 2

  const column1x1 = metricWidth / 2
  const column2x1 = column1x1 + metricWidth + metricMargin - arrowSideMargin

  const column2x2 =
    metricWidth / 2 + metricWidth + metricMargin + arrowSideMargin
  const column3x1 = column2x2 + metricWidth + metricMargin - arrowSideMargin

  const column1Dx = Math.max(
    (metricWidth + metricMargin) / 2 -
      block1Width / 2 -
      blockStroke -
      arrowSideMargin / 2
  )

  const column2Dx = Math.max(
    (metricWidth + metricMargin) / 2 -
      block2Width / 2 -
      blockStroke -
      arrowSideMargin / 2,
    0
  )

  const block1Center = (column1x1 + column2x1) / 2
  const block1x = block1Center - block1Width / 2
  const block2Center = (column2x2 + column3x1) / 2
  const block2x = block2Center - block2Width / 2

  return (
    <g>
      <path
        strokeLinecap="round"
        fill="none"
        stroke="#898290"
        d={`
           M ${column1x1}, ${arrowStartY}
           h ${column1Dx}
           
           M ${column1x1}, ${arrowStartY}
           V ${heightDev}

           M ${column2x1}, ${arrowStartY}
           V ${heightTest}

           M ${column2x1}, ${arrowStartY}
           h ${-column1Dx}
           
           M ${column2x1}, ${arrowStartY}
           V ${heightTest}

           M ${column2x1}, ${heightTest}
           l ${-arrowheadLength},${-arrowheadLength}

           M ${column2x1}, ${heightTest}
           l ${arrowheadLength},${-arrowheadLength}

           M ${column2x2}, ${arrowStartY}
           V ${heightTest}

           M ${column2x2}, ${arrowStartY}
           h ${column2Dx}

           M ${column3x1}, ${arrowStartY}
           h ${-column2Dx}

           M ${column3x1}, ${arrowStartY}
           V ${heightProd}

           M ${column3x1}, ${heightProd}
           l ${-arrowheadLength}, ${-arrowheadLength}

           M ${column3x1}, ${heightProd}
           l ${arrowheadLength}, ${-arrowheadLength}
          `}
      />

      <rect
        width={block1Width}
        height={blockHeight}
        x={block1x}
        y={0}
        rx={blockHeight / 2}
        fill={fill1}
      />
      <Arrow
        direction={diff1 > 0 ? 1 : diff1 < 0 ? -1 : 0}
        size={arrowSize}
        x={block1x + block1Width / 2 - arrowSize / 4 - text1Width / 2}
        y={arrowStartY}
      />
      <text
        ref={block1TextRef}
        x={block1Center + addArrSize1 / 2}
        y={arrowStartY}
        fontSize={14}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
      >
        {numberFormatter.format(diff1)}
      </text>

      <rect
        width={block2Width}
        height={blockHeight}
        x={block2x}
        y={0}
        rx={blockHeight / 2}
        fill={fill2}
      />
      <Arrow
        direction={diff2 > 0 ? 1 : diff2 < 0 ? -1 : 0}
        size={arrowSize}
        x={block2x + block2Width / 2 - arrowSize / 4 - text2Width / 2}
        y={arrowStartY}
      />
      <text
        ref={block2TextRef}
        x={block2x + block2Width / 2 + addArrSize2 / 2}
        y={arrowStartY}
        fontSize={14}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
      >
        {numberFormatter.format(diff2)}
      </text>
    </g>
  )
}

export default MetricDiff
