import React from 'react';
import { CirclePath } from '@site/src/utils/pinout'

export const Pinout = (gpio): JSX.Element => {

gpio = [1,2,3,4,5,6,7,8,9,10,11,12,13]

const dimensions = {
  height: "500",
  width: "500",
  boardHeight: 50,
  adjustedBoardHeight: null,
  boardWidth: 90,
  adjustedBoardWidth: 90,
  cornerOffset: 9,
  halfCornerOffset: 9 / 2,
  cutoutRadius: 5,
  pinCutoutRadius: 2,
  pinInterval: 15,
  xOffset: 0, // used for centering board on svg
  yOffset: 0, // used for centering board on svg
  logoWidth: 40,
  logoScale: 1,
}

const centeredMeshtasticLogo = () => {
  let logoWidth = 30 * dimensions.logoScale
  let logoHeight = 15.828 * dimensions.logoScale
  let x = dimensions.xOffset + (10.049 * dimensions.logoScale) + (dimensions.adjustedBoardWidth / 2) - (logoWidth /2)
  let y = dimensions.yOffset + (dimensions.adjustedBoardHeight / 2)

  return `M ${x} ${y} l ${1.797 * dimensions.logoScale} ${1.225 * dimensions.logoScale} l ${-9.949 * dimensions.logoScale} ${14.59 * dimensions.logoScale} l ${-1.797 * dimensions.logoScale} ${-1.225 * dimensions.logoScale} l ${9.949 * dimensions.logoScale} ${-14.59 * dimensions.logoScale} l ${-9.949 * dimensions.logoScale} ${0 * dimensions.logoScale} z  m ${9.719 * dimensions.logoScale} ${3.337 * dimensions.logoScale} l ${-8.517 * dimensions.logoScale} ${12.491 * dimensions.logoScale} l ${-1.796 * dimensions.logoScale} ${-1.225 * dimensions.logoScale} l ${9.413 * dimensions.logoScale} ${-13.805 * dimensions.logoScale} c ${0.202236 * dimensions.logoScale} ${-0.29671931 * dimensions.logoScale} ${0.538164 * dimensions.logoScale} ${-0.47433818 * dimensions.logoScale} ${0.897234 * dimensions.logoScale} ${-0.47478038 * dimensions.logoScale} c ${0.359219 * dimensions.logoScale} ${-0.0002948 * dimensions.logoScale} ${0.695295 * dimensions.logoScale} ${0.17673445 * dimensions.logoScale} ${0.89812 * dimensions.logoScale} ${0.47315896 * dimensions.logoScale} l ${9.435 * dimensions.logoScale} ${13.784 * dimensions.logoScale} l ${-1.794 * dimensions.logoScale} ${1.228 * dimensions.logoScale} l ${-8.537 * dimensions.logoScale} ${-12.471 * dimensions.logoScale} z`
}

dimensions.adjustedBoardHeight = dimensions.boardHeight + (dimensions.pinInterval * (gpio.length))
dimensions.xOffset = (dimensions.width / 2) - (dimensions.boardWidth / 2)
dimensions.yOffset = (dimensions.height / 2) - (dimensions.adjustedBoardHeight / 2)
dimensions.logoScale = dimensions.logoWidth / 30

const corners = {
  topLeft: `C ${dimensions.halfCornerOffset + dimensions.xOffset} ${dimensions.yOffset -0.5} ${dimensions.xOffset -0.5} ${dimensions.halfCornerOffset + dimensions.yOffset} ${dimensions.xOffset} ${dimensions.cornerOffset + dimensions.yOffset}`,
  bottomLeft: `C ${dimensions.xOffset} ${(dimensions.adjustedBoardHeight - dimensions.halfCornerOffset) + dimensions.yOffset +0.5} ${dimensions.halfCornerOffset + dimensions.xOffset -0.5} ${dimensions.adjustedBoardHeight + dimensions.yOffset} ${dimensions.cornerOffset + dimensions.xOffset} ${dimensions.adjustedBoardHeight + dimensions.yOffset}`,
  bottomRight: `C ${(dimensions.boardWidth - dimensions.halfCornerOffset) + dimensions.xOffset} ${dimensions.adjustedBoardHeight + dimensions.yOffset +0.5} ${dimensions.boardWidth + dimensions.xOffset +0.5} ${(dimensions.adjustedBoardHeight - dimensions.halfCornerOffset) + dimensions.yOffset} ${dimensions.boardWidth + dimensions.xOffset} ${(dimensions.adjustedBoardHeight - dimensions.cornerOffset) + dimensions.yOffset}`,
  topRight: `C ${dimensions.boardWidth + dimensions.xOffset} ${dimensions.halfCornerOffset + dimensions.yOffset -0.5} ${(dimensions.boardWidth - dimensions.halfCornerOffset) + dimensions.xOffset +0.5} ${dimensions.yOffset} ${(dimensions.boardWidth - dimensions.cornerOffset) + dimensions.xOffset} ${dimensions.yOffset}`
}
const path = [
  `M ${dimensions.cornerOffset + dimensions.xOffset} ${dimensions.yOffset}`, // Start point (x,y)
  `${corners.topLeft}`, // top left corner
  `L ${dimensions.xOffset} ${(dimensions.adjustedBoardHeight - dimensions.cornerOffset) + dimensions.yOffset/*141.73242*/}`, // Left adjustedBoardHeight
  `${corners.bottomLeft}`, // bottom left corner
  `L ${(dimensions.boardWidth -  dimensions.cornerOffset) + dimensions.xOffset} ${dimensions.adjustedBoardHeight + dimensions.yOffset}`, // bottom boardWidth
  `${corners.bottomRight}`, // bottom right corner
  `L ${dimensions.boardWidth + dimensions.xOffset} ${dimensions.cornerOffset + dimensions.yOffset}`, // right adjustedBoardHeight
  `${corners.topRight}`, // top right corner
  `L ${dimensions.cornerOffset + dimensions.xOffset} ${dimensions.yOffset}`, // top boardWidth
  `z`, // close path
  centeredMeshtasticLogo(),
  CirclePath((dimensions.cutoutRadius * 3) + dimensions.xOffset, (dimensions.cutoutRadius * 2) + dimensions.yOffset ,dimensions.cutoutRadius), // top left corner cutout
  CirclePath(dimensions.boardWidth - (dimensions.cutoutRadius) + dimensions.xOffset, (dimensions.cutoutRadius * 2) + dimensions.yOffset ,dimensions.cutoutRadius), // top right corner cutout
  CirclePath(dimensions.boardWidth - dimensions.cutoutRadius + dimensions.xOffset, dimensions.adjustedBoardHeight - (dimensions.cutoutRadius * 2) + dimensions.yOffset ,dimensions.cutoutRadius), // bottom right corner cutout
  CirclePath((dimensions.cutoutRadius * 3) + dimensions.xOffset, dimensions.adjustedBoardHeight - (dimensions.cutoutRadius * 2) + dimensions.yOffset ,dimensions.cutoutRadius), // bottom left corner cutout
]

const key = [
  {name: "GPIO", color: "Pink"},
  {name: "Silkscreen Label", color: "White"},
  {name: "Meshtastic Definition", color: "rgb(103, 234, 148)"},
  {name: "Free", color: "#c18b30"},
  {name: "GPS", color: "Red"},
  {name: "LoRa", color: "Blue"},
  {name: "Power", color: "Yellow"},
  {name: "Sensor", color: "Orange"},
]

gpio.map((e, index) => {
  path.push(CirclePath(
    (dimensions.pinCutoutRadius * 10) + dimensions.xOffset, // x
    (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((index) * (dimensions.pinInterval)) + dimensions.yOffset, // y
    dimensions.pinCutoutRadius // radius
  )) // Left side
  path.push(CirclePath(
    dimensions.boardWidth - (dimensions.pinCutoutRadius * 9) + dimensions.xOffset, // x
    (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((index) * (dimensions.pinInterval)) + dimensions.yOffset, // y
    dimensions.pinCutoutRadius // radius
  )) // Right side
})

  return (
    <svg height={dimensions.height} width={dimensions.width}>
    <defs xmlns="http://www.w3.org/2000/svg" id="defs2476">
      <linearGradient id="boardGradient">
        <stop style={{stopColor:"#000000"}} offset="0" id="boardStop1"/>
        <stop style={{stopColor:"#8b8b8b"}} offset="1" id="boardStop2"/>
      </linearGradient>
      <linearGradient xlinkHref="#boardGradient" id="boardGradient" x1={(dimensions.boardWidth / 2) + dimensions.xOffset} y1={dimensions.adjustedBoardHeight + dimensions.yOffset} x2={(dimensions.boardWidth / 2) + dimensions.xOffset} y2={dimensions.yOffset - 75} gradientUnits="userSpaceOnUse"/>
    </defs>
      <rect fill="rgb(103, 234, 148)" height={dimensions.logoWidth} width={dimensions.logoWidth} x={dimensions.xOffset + (dimensions.adjustedBoardWidth / 2) - (dimensions.logoWidth /2)} y={dimensions.yOffset + (dimensions.adjustedBoardHeight /2) - dimensions.logoWidth/3}/>


      <rect height={dimensions.height} width={dimensions.width} fill="none"/>
      <g>
        {key.map((e, index) => {
          let keyY = (index + 1) * 20
          return (
            <g x="10" y={(index + 1) * 20}>
              <rect height="20" width="20" x="0" y={keyY} fill={e.color}/>
              <rect height="2" width="10" x="30" y={keyY + 9} fill="black"/>
              <text x="50" y={keyY + 15} style={{fill: "var(--tw-prose-body)"}}>{e.name}</text>
            </g>
          )
        })}
      </g>
      <path d={path.join(" ")} fill="url(#boardGradient)"/>
      {gpio.map((e, index) => {
        return (
          <circle
            cx={(dimensions.pinCutoutRadius * 10) - dimensions.pinCutoutRadius + dimensions.xOffset}
            cy={(dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((index) * (dimensions.pinInterval)) + dimensions.yOffset}
            r={dimensions.pinCutoutRadius}
            stroke="#c18b30"
            strokeWidth={dimensions.pinCutoutRadius}
            fill="none"
          />
        )
      })}
      {gpio.map((e, index) => {
        let y = (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((index) * (dimensions.pinInterval)) + dimensions.yOffset
        let x = dimensions.boardWidth - (dimensions.pinCutoutRadius * 9) - dimensions.pinCutoutRadius + dimensions.xOffset
        return (
          <g>
            <circle
              cx={x}
              cy={y}
              r={dimensions.pinCutoutRadius}
              stroke="#c18b30"
              strokeWidth={dimensions.pinCutoutRadius}
              fill="none"
            />
            <text fill="var(--tw-prose-body)" x={x + (dimensions.pinCutoutRadius * 1.5)} y={y + (dimensions.pinInterval / 4)} font-size="10px" textLength={(dimensions.adjustedBoardWidth + dimensions.xOffset) - (x + (dimensions.pinCutoutRadius * 1.5))} lengthAdjust="spacingAndGlyphs">LoRa 1</text>
          </g>
        )
      })}
    </svg>
  );
};
