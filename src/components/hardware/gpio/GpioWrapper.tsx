import React from 'react';
import { PinoutSvg } from '@site/src/components/hardware/gpio/PinoutSvg.tsx';

export const GpioWrapper = (): JSX.Element => {
  return (
    <div>
      GPIO ⚡️ Wrapper
      <PinoutSvg />
      <PinoutTable />
    </div>
  );
};
