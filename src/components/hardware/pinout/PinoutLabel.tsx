import React from 'react';

export const PinoutLabel = (gpio, dimensions): JSX.Element => {
  let placement = {
    fontSize: dimensions.pinInterval * 0.60,
    boxHeight: dimensions.pinInterval * 0.85,
    labelMargin: 10,
    pin: {
      color: "#c18b30",
      x: null,
      y: null,
    },
    gpio: {
      width: dimensions.pinInterval,
      x: null,
      y: null,
    },
    label: {
      width: dimensions.silkscreenWidth,
      x: null,
      y: null,
    },
    meshtastic: {
      width: 100,
      x: null,
      y: null,
    },
    symbol: {
      width: dimensions.labelMargin,
      x: null,
      y: null,
    },
  }

  if (gpio.side == "left") {
    placement.gpio.x = dimensions.xOffset - placement.gpio.width - placement.labelMargin
    placement.symbol.x = placement.gpio.x + placement.gpio.width + placement.labelMargin
    placement.pin.x = dimensions.xOffset + dimensions.silkscreenWidth
    placement.label.x = dimensions.xOffset
    placement.meshtastic.x = placement.gpio.x - placement.labelMargin - placement.meshtastic.width
    let y = (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((gpio.index) * (dimensions.pinInterval)) + dimensions.yOffset
    placement.pin.y = y
    placement.label.y = y
    placement.meshtastic.y = y
    placement.gpio.y = y
    placement.symbol.y = y

  }
  if (gpio.side == "right") {
    placement.gpio.x = dimensions.xOffset + dimensions.adjustedBoardWidth + placement.labelMargin
    placement.pin.x = dimensions.xOffset + dimensions.adjustedBoardWidth - dimensions.silkscreenWidth
    placement.label.x = dimensions.xOffset + dimensions.adjustedBoardWidth - dimensions.silkscreenWidth
    placement.meshtastic.x = placement.gpio.x + placement.gpio.width + placement.labelMargin
    let y = (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((gpio.index) * (dimensions.pinInterval)) + dimensions.yOffset
    placement.pin.y = y
    placement.label.y = y
    placement.meshtastic.y = y
    placement.gpio.y = y
    placement.symbol.y = y

  }

  if (gpio["meshtastic"])  {
    placement.pin.color = "rgb(103, 234, 148)"
  }

  let fontSize = dimensions.pinInterval - 4
  let boxHeight = dimensions.pinInterval - 4

  return (
    <g>
      <circle
        r={dimensions.pinRadius}
        cx={placement.pin.x}
        cy={placement.pin.y}
        stroke={placement.pin.color}
        strokeWidth={dimensions.pinRadius}
        fill="none"
      />
      <path/>

      <text
        x={placement.label.x + (placement.label.width / 2)}
        y={placement.label.y}
        fill="white"
        fontSize={placement.fontSize}
        textAnchor="middle"
        alignmentBaseline="middle"
        // textLength={dimensions.silkscreenWidth * 0.85}
        // lengthAdjust="spacingAndGlyphs"
      >
        {gpio.label}
      </text>

      <path
        d={GroundPath(placement.symbol.x, placement.symbol.y, dimensions, placement)}
        stroke="green"
        strokeWidth="1px"
        fill="none"
      />

      <rect
        x={placement.meshtastic.x}
        y={placement.meshtastic.y - (boxHeight / 2)}
        fill="blue"
        height={boxHeight}
        width={placement.meshtastic.width}
        ry={6}
      />
      <text
        x={placement.meshtastic.x + (placement.meshtastic.width / 2)}
        y={placement.meshtastic.y}
        fill="white"
        fontSize={placement.fontSize}
        textAnchor="middle"
        alignmentBaseline="middle"
        //textLength={placement.meshtastic.width}
        //lengthAdjust="spacingAndGlyphs"
      >
        {console.log("placement.meshtastic.y", placement.meshtastic.y)}
        {gpio.meshtastic}
      </text>

      <rect
        x={placement.gpio.x}
        y={placement.gpio.y - (boxHeight / 2)}
        fill="grey"
        height={boxHeight}
        width={placement.gpio.width}
        ry={6}
      />
      <text
        x={placement.gpio.x + (placement.gpio.width / 2)}
        y={placement.gpio.y}
        fill="white"
        fontSize={placement.fontSize}
        textAnchor="middle"
        alignmentBaseline="middle"
        //textLength={placement.gpio.width}
        //lengthAdjust="spacingAndGlyphs"
      >
        {gpio.pinNumber}
      </text>

    </g>
  )
}
