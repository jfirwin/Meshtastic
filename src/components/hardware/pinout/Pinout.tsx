import React from 'react';
import { CirclePath, MeshtasticLogoPath, BoardPath } from '@site/src/utils/pinout'
import { PinoutLabel } from '@site/src/components/hardware/pinout/PinoutLabel'

export const Pinout = (gpio): JSX.Element => {

gpio = [
  {side: "left", silkscreen: "LoRa 1", gpio: '1', meshtastic: "PIN_UP_BUTTON"},
  {side: "right", silkscreen: "GND", gpio: '2', meshtastic: "THIS_MESSAGE"},
  {side: "left", silkscreen: "3V3", gpio: '3'},
  {side: "right", silkscreen: "5V", gpio: '4'}
]

const dimensions = {
  height: "500",
  width: "500",
  boardHeight: 50,
  adjustedBoardHeight: null,
  boardWidth: 120,
  adjustedBoardWidth: 90,
  cutoutRadius: 6,
  pinRadius: 3,
  pinInterval: 30,
  silkscreenWidth: 30,
  xOffset: 0, // used for centering board on svg
  yOffset: 0, // used for centering board on svg
  logoWidth: 35,
  logoScale: 1,
}

dimensions.adjustedBoardHeight = dimensions.boardHeight + (dimensions.pinInterval * (gpio.length))
dimensions.xOffset = (dimensions.width / 2) - (dimensions.boardWidth / 2)
dimensions.yOffset = (dimensions.height / 2) - (dimensions.adjustedBoardHeight / 2)
dimensions.logoWidth = dimensions.boardWidth - (dimensions.silkscreenWidth * 2.5)
dimensions.logoScale = dimensions.logoWidth / 30


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

  return (
    <svg height={dimensions.height} width={dimensions.width}>
    <defs xmlns="http://www.w3.org/2000/svg" id="defs2476">
      <linearGradient id="boardGradient">
        <stop style={{stopColor:"#000000"}} offset="0" id="boardStop1"/>
        <stop style={{stopColor:"#8b8b8b"}} offset="1" id="boardStop2"/>
      </linearGradient>
      <linearGradient xlinkHref="#boardGradient" id="boardGradient" x1={(dimensions.boardWidth / 2) + dimensions.xOffset} y1={dimensions.adjustedBoardHeight + dimensions.yOffset} x2={(dimensions.boardWidth / 2) + dimensions.xOffset} y2={dimensions.yOffset - 75} gradientUnits="userSpaceOnUse"/>
    </defs>
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
      <path d={BoardPath(dimensions, gpio).join(" ")} fill="url(#boardGradient)"/>
      {gpio.map((e, index) => {
        let y = (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((index) * (dimensions.pinInterval)) + dimensions.yOffset
        let x = dimensions.boardWidth - dimensions.silkscreenWidth - dimensions.pinRadius + dimensions.xOffset
        return PinoutLabel(e, y, dimensions)
      })}
      <path d={MeshtasticLogoPath(dimensions)} fill="rgb(103, 234, 148)"/>
    </svg>
  );
};
