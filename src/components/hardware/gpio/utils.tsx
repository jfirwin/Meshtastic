export const MeshtasticLogoPath = (x, y, scale) => {
    if (!scale) { scale = 1 }
    let logoWidth = 30 * scale
    let logoHeight = 15.828 * scale
    let pathCommands = [
        `M ${x} ${y}`, // Move to specified center point on SVG canvas
        `m ${((9.949 * scale) -(logoWidth/2))} ${(-logoHeight/2)}`, // offset center (we start drawing the top corner of the "/" first (9.494, 0))
        `l ${1.797 * scale} ${1.225 * scale}`, // clockwise line "/"
        `l ${-9.949 * scale} ${14.59 * scale}`, // clockwise line "/"
        `l ${-1.797 * scale} ${-1.225 * scale}`, // clockwise line "/"
        `l ${9.949 * scale} ${-14.59 * scale}`, // clockwise line "/"
        `z`, // close path
        `m ${9.719 * scale} ${3.337 * scale}`, // move down to the bottom left corner of the "/\"
        `l ${-8.517 * scale} ${12.491 * scale}`,  // clockwise line "/\"
        `l ${-1.796 * scale} ${-1.225 * scale}`, // clockwise line "/\"
        `l ${9.413 * scale} ${-13.805 * scale}`, // clockwise line "/\"
        `c ${0.202236 * scale} ${-0.29671931 * scale} ${0.538164 * scale} ${-0.47433818 * scale} ${0.897234 * scale} ${-0.47478038 * scale}`, // rounded corner "/\"
        `c ${0.359219 * scale} ${-0.0002948 * scale} ${0.695295 * scale} ${0.17673445 * scale} ${0.89812 * scale} ${0.47315896 * scale}`, // rounded corner "/\"
        `l ${9.435 * scale} ${13.784 * scale}`, // clockwise line "/\"
        `l ${-1.794 * scale} ${1.228 * scale}`, // clockwise line "/\"
        `l ${-8.537 * scale} ${-12.471 * scale}`, // clockwise line "/\"
        `z`, // close path
    ]

    return { pathCommands: pathCommands.join(" "), logoHeight, logoWidth }
}
  
