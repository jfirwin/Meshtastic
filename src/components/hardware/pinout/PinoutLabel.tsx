import React from 'react';

export const PinoutLabel = (gpio, dimensions): JSX.Element => {
  let placement = {
    fontSize: dimensions.pinInterval * 0.75,
    boxHeight: dimensions.pinInterval * 0.85,
    labelMargin: 10,
    pinCircle: {
      color: "#c18b30",
      width: dimensions.pinRadius,
      x: null,
      y: null,
    },
    gpioLabel: {
      width: dimensions.pinInterval,
      x: null,
      y: null,
    },
    silkscreenLabel: {
      width: dimensions.silkscreenWidth,
      x: null,
      y: null,
    },
    meshtasticLabel: {
      width: 100,
      x: null,
      y: null,
    },
  }
  if (gpio.side == "left") {
    placement.gpioLabel.x = dimensions.xOffset - placement.gpioLabel.width - placement.labelMargin
    placement.pinCircle.x = dimensions.xOffset + dimensions.silkscreenWidth
    placement.silkscreenLabel.x = dimensions.xOffset
    placement.meshtasticLabel.x = placement.gpioLabel.x - placement.labelMargin - placement.meshtasticLabel.width
    let y = (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((gpio.index) * (dimensions.pinInterval)) + dimensions.yOffset
    placement.pinCircle.y = y
    placement.silkscreenLabel.y = y
    placement.meshtasticLabel.y = y
    placement.gpioLabel.y = y

  }
  if (gpio.side == "right") {
    placement.gpioLabel.x = dimensions.xOffset + dimensions.boardWidth + placement.labelMargin
    placement.pinCircle.x = dimensions.xOffset + dimensions.boardWidth - dimensions.silkscreenWidth
    placement.silkscreenLabel.x = dimensions.xOffset + dimensions.boardWidth - dimensions.silkscreenWidth
    placement.meshtasticLabel.x = placement.gpioLabel.x + placement.gpioLabel.width + placement.labelMargin
    let y = (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((gpio.index) * (dimensions.pinInterval)) + dimensions.yOffset
    placement.pinCircle.y = y
    placement.silkscreenLabel.y = y
    placement.meshtasticLabel.y = y
    placement.gpioLabel.y = y

  }

  if (gpio["meshtastic"])  {
    placement.pinCircle.color = "rgb(103, 234, 148)"
  }

  let fontSize = dimensions.pinInterval - 4
  let boxHeight = dimensions.pinInterval - 4
  return (
    <g>
      <circle
        r={dimensions.pinRadius}
        cx={placement.pinCircle.x}
        cy={placement.pinCircle.y}
        stroke={placement.pinCircle.color}
        strokeWidth={dimensions.pinRadius}
        fill="none"
      />
      <path/>

      <text
        x={placement.silkscreenLabel.x}
        y={placement.silkscreenLabel.y + (placement.fontSize / 3)}
        fill="white"
        fontSize={placement.fontSize}
        textLength={dimensions.silkscreenWidth}
        lengthAdjust="spacingAndGlyphs"
      >
        {gpio.label}
      </text>

      <rect x={placement.meshtasticLabel.x} y={placement.meshtasticLabel.y - (placement.fontSize / 2)} fill="blue" height={boxHeight} width={placement.meshtasticLabel.width} ry={6}/>
      <text x={placement.meshtasticLabel.x} y={placement.meshtasticLabel.y + (placement.fontSize / 3)} fill="white" fontSize={placement.fontSize} textLength={placement.meshtasticLabel.width} lengthAdjust="spacingAndGlyphs">
        {gpio.meshtastic}
      </text>

      <rect x={placement.gpioLabel.x} y={placement.gpioLabel.y - (placement.fontSize / 2)} fill="pink" height={boxHeight} width={placement.gpioLabel.width} ry={6}/>
      <text x={placement.gpioLabel.x} y={placement.gpioLabel.y + (placement.fontSize / 3)} fill="white" fontSize={placement.fontSize} textLength={placement.gpioLabel.width} lengthAdjust="spacingAndGlyphs">
        {gpio.pinNumber}
      </text>

    </g>
  )
}
