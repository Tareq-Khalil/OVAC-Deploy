import React from 'react'

const curved_Rup = ({ width = '200px', height = '200px', color = '#fdef9d', x = 0, y = 0, className, style }) => {
  return (
    <div className={className} style={{ position: 'relative', transform: `translate(${x}px, ${y}px)`, ...style }}>
      <svg fill={color} height={height} width={width} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 177.501 177.501" xml:space="preserve" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0,177.501C0,79.626,79.627,0,177.501,0v15C87.898,15,15,87.898,15,177.501H0z"></path> </g></svg>
    </div>
  )
}

export default curved_Rup