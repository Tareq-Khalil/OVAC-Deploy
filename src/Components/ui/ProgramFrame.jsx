import React from 'react'

// Single responsive SVG that composes the shape out of three parts:
// 1) Horizontal line (split into two parts with a gap)
// 2) Quarter-circle corner arc (continuous)
// 3) Vertical line (split into two parts with a gap)
// Dots are centered inside the gaps: solid on the horizontal gap, hollow on the vertical gap.
// All geometry is computed from a few easy-to-tune props.
const ProgramFrame = ({
  width = 1280,
  height = 320,
  stroke = '#fdef9d',
  strokeWidth = 6,
  cornerRadius = 140,
  leftPadding = 80,
  rightPadding = 80,
  topOffset = 40,
  // Gap between the two horizontal segments (a dot sits in the middle)
  horizontalGap = 110,
  // Gap between the two vertical segments (a dot sits in the middle)
  verticalGap = 90,
  // Optional manual dot radius override (defaults from stroke width)
  dotRadius: dotRadiusOverride,
}) => {
  const w = Number(width)
  const h = Number(height)
  const lp = Number(leftPadding)
  const rp = Number(rightPadding)
  const r = Math.min(Number(cornerRadius), Math.min(w, h) / 2)
  const lineY = topOffset

  // Corner geometry
  const xStart = lp
  const xArcStart = w - rp - r
  const xArcEnd = w - rp
  const yArcEnd = lineY + r

  // Vertical end at bottom minus a small margin
  const yBottom = h

  // Horizontal split: compute the gap centered somewhere along the long line
  // We center the gap at 35% of the distance to the corner by default.
  const horizontalLength = xArcStart - xStart
  const gapCenterX = xStart + horizontalLength * 0.35
  const gapHalf = horizontalGap / 2
  const h1Start = xStart
  const h1End = gapCenterX - gapHalf
  const h2Start = gapCenterX + gapHalf
  const h2End = xArcStart

  // Vertical split: the gap is placed at 40% of the vertical run, starting from the end of the arc
  const verticalLength = yBottom - yArcEnd
  const vGapCenterY = yArcEnd + verticalLength * 0.4
  const vGapHalf = verticalGap / 2
  const v1StartY = yArcEnd
  const v1EndY = vGapCenterY - vGapHalf
  const v2StartY = vGapCenterY + vGapHalf
  const v2EndY = yBottom

  // Dot size (solid/hollow share same radius)
  const dotRadius = dotRadiusOverride ?? strokeWidth * 1.8

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      {/* 1) Horizontal line, split into two segments with a gap */}
      <path d={`M ${h1Start} ${lineY} H ${h1End}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d={`M ${h2Start} ${lineY} H ${h2End}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>

      {/* 2) Quarter-circle corner arc connecting horizontal to vertical (continuous) */}
      <path d={`M ${xArcStart} ${lineY} A ${r} ${r} 0 0 1 ${xArcEnd} ${yArcEnd}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>

      {/* 3) Vertical line, split into two segments with a gap */}
      <path d={`M ${xArcEnd} ${v1StartY} V ${v1EndY}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d={`M ${xArcEnd} ${v2StartY} V ${v2EndY}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"/>

      {/* Solid dot centered in the horizontal gap */}
      <circle cx={gapCenterX} cy={lineY} r={dotRadius} fill={stroke} />

      {/* Hollow dot centered in the vertical gap */}
      <circle cx={xArcEnd} cy={vGapCenterY} r={dotRadius + 4} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  )
}

export default ProgramFrame


