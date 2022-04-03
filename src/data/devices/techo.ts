import { IDevice, Stability, UseCase } from '../device';

export const techo: IDevice = {
  name: 'T-Echo',
  misc: {
    Stability: Stability.Broken,
    InstabilityReason: "Firmware issues, restart button fails to complete reboot and bricks device",
    SuggestedUse: [UseCase.Portable],
    ImagePath: '/img/hardware/t-echo-lilygo.jpg',
  },
  features: {
    BLE: true,
    WiFi: false,
    Modules: [
      'cannedMessage',
      'externalNotification',
      'rangeTest',
      'rotaryEncoder',
      'storeAndForward',
      'telemetry',
    ],
  },
  specifications: {
    Chipset: 'NRF52',
    Frequencies: [433, 868, 915, 923],
    LoRa: 'SX1262',
  },
  variants: [
    {
      name: 'T-Echo',
    },
  ],
};
