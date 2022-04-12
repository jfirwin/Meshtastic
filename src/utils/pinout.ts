export const CirclePath = (cx, cy, r) => {
  // FIXME ${cy-r} should be cy+r
  return `M ${cx-r} ${cy-r} a ${r} ${r} 0 0 1 ${r} ${r} a ${r} ${r} 0 0 1 -${r} ${r} a ${r} ${r} 0 0 1 -${r} -${r} a ${r} ${r} 0 0 1 ${r} -${r} z`
}
