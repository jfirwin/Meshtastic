import React from 'react';
import { CirclePath, MeshtasticLogoPath, BoardPath, LargerNum } from '@site/src/utils/pinout'
import { PinoutLabel } from '@site/src/components/hardware/pinout/PinoutLabel'

export const Pinout = ({gpio}): JSX.Element => {

/* Sort array by side for appropriate label creation */
let left = []
let right = []
let top = []
let bottom = []

gpio.map(e => {
  if (e.side == "left") { left.push(e) }
  if (e.side == "right") { right.push(e) }
  if (e.side == "top") { top.push(e) }
  if (e.side == "bottom") { bottom.push(e) }
})

/* TODO add sorting to left,right,top,bottom to ensure GPIO order is correct */

/* Put gpio together in a single array */
let formattedGpio = [left, right, top, bottom]

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
  xOffset: 0,
  yOffset: 0,
  logoWidth: 35,
  logoScale: 1,
}

/* Centering board and setting height/width according to number of GPIO */
dimensions.adjustedBoardHeight = dimensions.boardHeight + (dimensions.pinInterval * (LargerNum(formattedGpio[0].length, formattedGpio[1].length)))
dimensions.xOffset = (dimensions.width / 2) - (dimensions.boardWidth / 2)
dimensions.yOffset = (dimensions.height / 2) - (dimensions.adjustedBoardHeight / 2)
dimensions.logoWidth = dimensions.boardWidth - (dimensions.silkscreenWidth * 2.5)
dimensions.logoScale = dimensions.logoWidth / 30

  return (
    <svg height={dimensions.height} width={dimensions.width}>

    /* Create gradient for board */
    <defs xmlns="http://www.w3.org/2000/svg" id="defs2476">
      <linearGradient id="boardGradient">
        <stop style={{stopColor:"#000000"}} offset="0" id="boardStop1"/>
        <stop style={{stopColor:"#8b8b8b"}} offset="1" id="boardStop2"/>
      </linearGradient>
      <linearGradient xlinkHref="#boardGradient" id="boardGradient" x1={(dimensions.boardWidth / 2) + dimensions.xOffset} y1={dimensions.adjustedBoardHeight + dimensions.yOffset} x2={(dimensions.boardWidth / 2) + dimensions.xOffset} y2={dimensions.yOffset - 75} gradientUnits="userSpaceOnUse"/>
    </defs>

      /* Create board (including cutouts for each GPIO) and apply gradient */
      <path d={BoardPath(dimensions, left, right, top, bottom).join(" ")} fill="url(#boardGradient)"/>

      /* Set GPIO labels */
      {left.map(e =>{
        return PinoutLabel(e, dimensions)
      })}
      {right.map(e => {
        return PinoutLabel(e, dimensions)
      })}
      {top.map(e => {
        return PinoutLabel(e, dimensions)
      })}
      {bottom.map(e => {
        return PinoutLabel(e, dimensions)
      })}

      /* Add Meshtastic Logo to board (auto centered/scaled) */
      <path d={MeshtasticLogoPath(dimensions)} fill="rgb(103, 234, 148)"/>
    </svg>
  );
};
