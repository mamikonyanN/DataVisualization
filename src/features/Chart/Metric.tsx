import { useState } from 'react'
import MetricSection from '~/features/Chart/MetricSection'
import useTestStore from '~/stores/testStore'
import { IsnstanceType } from '~/types'
import {
  metricMaxHeight,
  metricTitleMargin,
  metricWidth,
  viewBoxHeight,
} from '~/utils/constants'
import { coeff } from '~/utils/functions'

interface Props {
  stand: IsnstanceType
  horisontalOffset?: number
}

const Metric = (props: Props) => {
  const [popupVisible, setPopupVisibility] = useState<boolean>(false)
  const { result, getMaxSum } = useTestStore()
  if (!result) return

  const coeff1 = coeff(getMaxSum(), metricMaxHeight)

  const stand = result[props.stand]

  const front = coeff1(stand.front)
  const back = coeff1(stand.back)
  const db = coeff1(stand.db)

  const horisontalOffset = props.horisontalOffset || 0
  const verticalOffset = viewBoxHeight - (back + front + db) - metricTitleMargin

  return (
    <g>
      <g style={{ clipPath: 'inset(0 round 10px)' }}>
        <MetricSection
          x={horisontalOffset}
          y={verticalOffset}
          width={metricWidth}
          height={front}
          color="#4AB6E8"
          title={stand.front}
        />

        <MetricSection
          x={horisontalOffset}
          y={verticalOffset + front}
          width={metricWidth}
          height={back}
          color="#AA6FAC"
          title={stand.back}
        />

        <MetricSection
          x={horisontalOffset}
          y={verticalOffset + front + back}
          width={metricWidth}
          height={db}
          color="#E85498"
          title={stand.db}
        />
      </g>

      <text
        style={{ cursor: 'pointer' }}
        x={horisontalOffset + metricWidth / 2}
        y={viewBoxHeight}
        fontSize={10}
        fontWeight={400}
        textAnchor="middle"
        dominantBaseline="text-after-edge"
        fill="#898290"
        onMouseEnter={() => setPopupVisibility(true)}
        onMouseLeave={() => setPopupVisibility(false)}
      >
        {props.stand}
      </text>

      {popupVisible && (
        <>
          <rect
            x={horisontalOffset}
            y={viewBoxHeight - metricTitleMargin - 35}
            width={metricWidth}
            height={35}
            fill="#ffffff"
          />

          <text
            x={horisontalOffset + metricWidth / 2}
            y={viewBoxHeight - metricTitleMargin - 30}
            fontSize={10}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#4AB6E8"
          >
            {stand.front}
          </text>
          <text
            x={horisontalOffset + metricWidth / 2}
            y={viewBoxHeight - metricTitleMargin - 20}
            fontSize={10}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#AA6FAC"
          >
            {stand.back}
          </text>
          <text
            x={horisontalOffset + metricWidth / 2}
            y={viewBoxHeight - metricTitleMargin - 10}
            fontSize={10}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#E85498"
          >
            {stand.db}
          </text>
        </>
      )}
    </g>
  )
}

export default Metric
