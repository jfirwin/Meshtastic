export const CirclePath = (cx, cy, r, note) => {
  console.log(note, cx, cy, r)
  return `M ${cx} ${cy} m 0 ${-r} a ${r} ${r} 0 0 1 ${r} ${r} a ${r} ${r} 0 0 1 -${r} ${r} a ${r} ${r} 0 0 1 -${r} -${r} a ${r} ${r} 0 0 1 ${r} -${r} z`
}

export const MeshtasticLogoPath = (dimensions) => {
  let logoWidth = 30 * dimensions.logoScale
  let logoHeight = 15.828 * dimensions.logoScale
  let x = dimensions.xOffset - (logoWidth / 2) + (dimensions.logoScale * 10.049) + (dimensions.boardWidth / 2)
  // + (10.049 * dimensions.logoScale) + (dimensions.adjustedBoardWidth / 2) - (logoWidth / 2)
  let y = dimensions.yOffset + (dimensions.adjustedBoardHeight / 2) - (logoHeight / 2)
  console.log(`x:${dimensions.xOffset}, y:${dimensions.yOffset}, boardWidth:${dimensions.boardWidth}, boardHeight:${dimensions.boardHeight} `)

  return `M ${x} ${y} l ${1.797 * dimensions.logoScale} ${1.225 * dimensions.logoScale} l ${-9.949 * dimensions.logoScale} ${14.59 * dimensions.logoScale} l ${-1.797 * dimensions.logoScale} ${-1.225 * dimensions.logoScale} l ${9.949 * dimensions.logoScale} ${-14.59 * dimensions.logoScale} l ${-9.949 * dimensions.logoScale} ${0 * dimensions.logoScale} z  m ${9.719 * dimensions.logoScale} ${3.337 * dimensions.logoScale} l ${-8.517 * dimensions.logoScale} ${12.491 * dimensions.logoScale} l ${-1.796 * dimensions.logoScale} ${-1.225 * dimensions.logoScale} l ${9.413 * dimensions.logoScale} ${-13.805 * dimensions.logoScale} c ${0.202236 * dimensions.logoScale} ${-0.29671931 * dimensions.logoScale} ${0.538164 * dimensions.logoScale} ${-0.47433818 * dimensions.logoScale} ${0.897234 * dimensions.logoScale} ${-0.47478038 * dimensions.logoScale} c ${0.359219 * dimensions.logoScale} ${-0.0002948 * dimensions.logoScale} ${0.695295 * dimensions.logoScale} ${0.17673445 * dimensions.logoScale} ${0.89812 * dimensions.logoScale} ${0.47315896 * dimensions.logoScale} l ${9.435 * dimensions.logoScale} ${13.784 * dimensions.logoScale} l ${-1.794 * dimensions.logoScale} ${1.228 * dimensions.logoScale} l ${-8.537 * dimensions.logoScale} ${-12.471 * dimensions.logoScale} z`
}

export const BoardPath = (dimensions, gpio) => {
  let x = {
    left: dimensions.xOffset,
    right: dimensions.xOffset + dimensions.adjustedBoardWidth,
  }
  let y = {
    top: dimensions.yOffset,
    bottom: dimensions.yOffset + dimensions.adjustedBoardHeight
  }
  let corner = {
    full: 9,
    half: 4.5,
    curve: 0.5
  }
  const corners = {
    topLeft: `C ${corner.half + dimensions.xOffset} ${dimensions.yOffset -0.5} ${dimensions.xOffset -0.5} ${corner.half + dimensions.yOffset} ${dimensions.xOffset} ${corner.full + dimensions.yOffset}`,
    bottomLeft: `C ${dimensions.xOffset} ${(dimensions.adjustedBoardHeight - corner.half) + dimensions.yOffset +0.5} ${corner.half + dimensions.xOffset -0.5} ${dimensions.adjustedBoardHeight + dimensions.yOffset} ${corner.full + dimensions.xOffset} ${dimensions.adjustedBoardHeight + dimensions.yOffset}`,
    bottomRight: `C ${(dimensions.boardWidth - corner.half) + dimensions.xOffset} ${dimensions.adjustedBoardHeight + dimensions.yOffset +0.5} ${dimensions.boardWidth + dimensions.xOffset +0.5} ${(dimensions.adjustedBoardHeight - corner.half) + dimensions.yOffset} ${dimensions.boardWidth + dimensions.xOffset} ${(dimensions.adjustedBoardHeight - corner.full) + dimensions.yOffset}`,
    topRight: `C ${dimensions.boardWidth + dimensions.xOffset} ${corner.half + dimensions.yOffset -0.5} ${(dimensions.boardWidth - corner.half) + dimensions.xOffset +0.5} ${dimensions.yOffset} ${(dimensions.boardWidth - corner.full) + dimensions.xOffset} ${dimensions.yOffset}`
  }

  let path = [
    `M ${corner.full + dimensions.xOffset} ${dimensions.yOffset}`, // Start point (x,y)
    `${corners.topLeft}`, // top left corner
    `L ${dimensions.xOffset} ${(dimensions.adjustedBoardHeight - corner.full) + dimensions.yOffset/*141.73242*/}`, // Left adjustedBoardHeight
    `${corners.bottomLeft}`, // bottom left corner
    `L ${(dimensions.boardWidth -  corner.full) + dimensions.xOffset} ${dimensions.adjustedBoardHeight + dimensions.yOffset}`, // bottom boardWidth
    `${corners.bottomRight}`, // bottom right corner
    `L ${dimensions.boardWidth + dimensions.xOffset} ${corner.full + dimensions.yOffset}`, // right adjustedBoardHeight
    `${corners.topRight}`, // top right corner
    `L ${corner.full + dimensions.xOffset} ${dimensions.yOffset}`, // top boardWidth
    `z`, // close path
    // MeshtasticLogoPath(dimensions),
    CirclePath(dimensions.xOffset + (dimensions.cutoutRadius * 2), dimensions.yOffset + (dimensions.cutoutRadius * 2), dimensions.cutoutRadius, "topleft"), // top left corner cutout
    CirclePath(dimensions.boardWidth - (dimensions.cutoutRadius * 2) + dimensions.xOffset, dimensions.yOffset + (dimensions.cutoutRadius * 2) ,dimensions.cutoutRadius), // top right corner cutout
    CirclePath(dimensions.boardWidth - (dimensions.cutoutRadius * 2) + dimensions.xOffset, dimensions.adjustedBoardHeight - (dimensions.cutoutRadius * 2) + dimensions.yOffset ,dimensions.cutoutRadius), // bottom right corner cutout
    CirclePath((dimensions.cutoutRadius * 2) + dimensions.xOffset, dimensions.adjustedBoardHeight - (dimensions.cutoutRadius * 2) + dimensions.yOffset ,dimensions.cutoutRadius), // bottom left corner cutout
  ]

  gpio.map((e, index) => {
    path.push(CirclePath(
      dimensions.silkscreenWidth + dimensions.xOffset, // x
      (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((index) * (dimensions.pinInterval)) + dimensions.yOffset, // y
      dimensions.pinRadius // radius
    )) // Left side
    path.push(CirclePath(
      dimensions.boardWidth - dimensions.silkscreenWidth + dimensions.xOffset, // x
      (dimensions.boardHeight / 2) + (dimensions.pinInterval / 2) + ((index) * (dimensions.pinInterval)) + dimensions.yOffset, // y
      dimensions.pinRadius // radius
    )) // Right side
  })
  return path
}
