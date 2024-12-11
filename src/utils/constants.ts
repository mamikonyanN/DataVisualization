// Конфигурация значений графа

// колонки
export const metricWidth = 80
export const metricMargin = 20
export const metricTitleMargin = 20
export const metricMaxHeight = 255

export const normInnerBlockPadding = 2
export const normInnerBoxHeight = 24 + normInnerBlockPadding * 2
export const normInnerBlockWidth = metricWidth * 0.5 + normInnerBlockPadding * 2

// стрелки
export const arrowBodyHeight = 50
export const arrowBottomMargin = 5
export const arrowSideMargin = 10
export const arrowheadLength = 2

// блоки с разницей
export const blockWidth = 48
export const blockHeight = 24
export const blockStroke = 1

// сборные значения
export const minArrowMargin = arrowBottomMargin + metricTitleMargin
export const totalViewBoxMargin = arrowBodyHeight + metricTitleMargin
export const viewBoxHeight = metricMaxHeight + totalViewBoxMargin
