import Legend from '~/features/Chart/Legend'
import Metric from '~/features/Chart/Metric'
import MetricDiff from '~/features/Chart/MetricDiff'
import NormMetric from '~/features/Chart/NormMetric'
import { metricMargin, metricWidth, viewBoxHeight } from '~/utils/constants'

const Chart = () => {
  const columnSection = metricWidth + metricMargin

  return (
    <>
      <svg viewBox={`0 0 ${columnSection * 3 + metricWidth} ${viewBoxHeight}`}>
        <MetricDiff />
        <Metric stand="dev" />
        <Metric stand="test" horisontalOffset={columnSection} />
        <Metric stand="prod" horisontalOffset={columnSection * 2} />
        <NormMetric horisontalOffset={columnSection * 3} />
      </svg>
      <Legend />
    </>
  )
}

export default Chart
