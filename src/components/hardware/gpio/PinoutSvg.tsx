import React from 'react';
import { MeshtasticLogoPath, PcbPath } from '@site/src/components/hardware/gpio/utils';

export const PinoutSvg = (gpio): JSX.Element => {
  let dimensions =  {
    height: 30,
    width: 100,
  }
  return (
    <svg
      height={"100%"}
      width={"75%"}
      fillRule={"evenodd"}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    >
      <defs xmlns="http://www.w3.org/2000/svg" id="defs2476">
        <linearGradient id="boardGradient">
          <stop style={{stopColor:"#0F0F0F"}} offset="0" id="boardStop1"/>
          <stop style={{stopColor:"#8b8b8b"}} offset="1" id="boardStop2"/>
        </linearGradient>
        <linearGradient xlinkHref="#boardGradient" id="gpioBoardGradient" x1={(dimensions.width)} y1={dimensions.height} x2={dimensions.width} y2={dimensions.height/10} gradientUnits="userSpaceOnUse"/>
      </defs>

      <path
        d={PcbPath(dimensions, gpio)}
        fill="url(#gpioBoardGradient)"
      /> 
      <path
        d={MeshtasticLogoPath((dimensions.width / 2),(dimensions.height / 2),1).pathCommands}
        fill="rgb(103, 234, 148)"
      />

    </svg>
  );
};
