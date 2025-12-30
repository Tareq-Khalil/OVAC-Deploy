import React from 'react'

const ProgramFrame = ({
  width = 1280,
  height = 320,
  stroke = '#fdef9d',
  strokeWidth = 6,
  cornerRadius = 140,
  leftPadding = 80,
  rightPadding = 80,
  topOffset = 40,
  horizontalGap = 110,
  verticalGap = 90,
  dotRadius: dotRadiusOverride,
}) => {
  const w = Number(width)
  const h = Number(height)
  const lp = Number(leftPadding)
  const rp = Number(rightPadding)
  const r = Math.min(Number(cornerRadius), Math.min(w, h) / 2)
  const lineY = topOffset

  const xStart = lp
  const xArcStart = w - rp - r
  const xArcEnd = w - rp
  const yArcEnd = lineY + r

  const yBottom = h

  const horizontalLength = xArcStart - xStart
  const gapCenterX = xStart + horizontalLength * 0.35
  const gapHalf = horizontalGap / 2
  const h1Start = xStart
  const h1End = gapCenterX - gapHalf
  const h2Start = gapCenterX + gapHalf
  const h2End = xArcStart

  const verticalLength = yBottom - yArcEnd
  const vGapCenterY = yArcEnd + verticalLength * 0.4
  const vGapHalf = verticalGap / 2
  const v1StartY = yArcEnd
  const v1EndY = vGapCenterY - vGapHalf
  const v2StartY = vGapCenterY + vGapHalf
  const v2EndY = yBottom

  const dotRadius = dotRadiusOverride ?? strokeWidth * 1.8

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <path d={`M ${h1Start} ${lineY} H ${h1End}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d={`M ${h2Start} ${lineY} H ${h2End}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>

      <path d={`M ${xArcStart} ${lineY} A ${r} ${r} 0 0 1 ${xArcEnd} ${yArcEnd}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>

      <path d={`M ${xArcEnd} ${v1StartY} V ${v1EndY}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d={`M ${xArcEnd} ${v2StartY} V ${v2EndY}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>

      <circle cx={gapCenterX} cy={lineY} r={dotRadius} fill={stroke} />

      <circle cx={xArcEnd} cy={vGapCenterY} r={dotRadius + 4} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  )
}

export default ProgramFrame


