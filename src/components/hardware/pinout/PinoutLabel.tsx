import React from 'react';

export const PinoutLabel = (gpio, y, dimensions): JSX.Element => {
  let placement = {
    fontSize: dimensions.pinInterval * 0.75,
    boxHeight: dimensions.pinInterval * 0.85,
    labelMargin: 10,
    pinCircle: {
      color: "#c18b30",
      width: dimensions.pinRadius,
      x: null,
    },
    gpioLabel: {
      width: dimensions.pinInterval,
      x: null,
    },
    silkscreenLabel: {
      width: dimensions.silkscreenWidth,
      x: null,
    },
    meshtasticLabel: {
      width: 100,
      x: null,
    },
  }
  if (gpio.side == "left") {
    placement.gpioLabel.x = dimensions.xOffset - placement.gpioLabel.width - placement.labelMargin
    placement.pinCircle.x = dimensions.xOffset + dimensions.silkscreenWidth
    placement.silkscreenLabel.x = dimensions.xOffset
    placement.meshtasticLabel.x = placement.gpioLabel.x - placement.labelMargin - placement.meshtasticLabel.width
  }
  if (gpio.side == "right") {
    placement.gpioLabel.x = dimensions.xOffset + dimensions.boardWidth + placement.labelMargin
    placement.pinCircle.x = dimensions.xOffset + dimensions.boardWidth - dimensions.silkscreenWidth
    placement.silkscreenLabel.x = dimensions.xOffset + dimensions.boardWidth - dimensions.silkscreenWidth
    placement.meshtasticLabel.x = placement.gpioLabel.x + placement.gpioLabel.width + placement.labelMargin
  }

  if (gpio["meshtastic"])  {
    console.log("gpio is meshtastic")
    placement.pinCircle.color = "rgb(103, 234, 148)"
  }

  console.log(placement.pinCircle.x, dimensions.xOffset)
  let fontSize = dimensions.pinInterval - 4
  let boxHeight = dimensions.pinInterval - 4
  return (
    <g>
      <circle
        r={dimensions.pinRadius}
        cx={placement.pinCircle.x}
        cy={y}
        stroke={placement.pinCircle.color}
        strokeWidth={dimensions.pinRadius}
        fill="none"
      />
      <path/>

      <text
        x={placement.silkscreenLabel.x}
        y={y + (placement.fontSize / 3)}
        fill="white"
        fontSize={placement.fontSize}
        textLength={dimensions.silkscreenWidth}
        lengthAdjust="spacingAndGlyphs"
        fillRule="yellow"
      >
        LoRa 1
      </text>

      <rect x={placement.meshtasticLabel.x} y={y - (placement.fontSize / 2)} fill="blue" height={boxHeight} width={placement.meshtasticLabel.width} ry={6}/>
      <text x={placement.meshtasticLabel.x} y={y + (placement.fontSize / 3)} fill="white" fontSize={placement.fontSize} textLength={placement.meshtasticLabel.width} lengthAdjust="spacingAndGlyphs">Meshtastic Label</text>

      <rect x={placement.gpioLabel.x} y={y - (placement.fontSize / 2)} fill="pink" height={boxHeight} width={placement.gpioLabel.width} ry={6}/>
      <text x={placement.gpioLabel.x} y={y + (placement.fontSize / 3)} fill="white" fontSize={placement.fontSize} textLength={placement.gpioLabel.width} lengthAdjust="spacingAndGlyphs">LoRa 1</text>

    </g>
  )
}
