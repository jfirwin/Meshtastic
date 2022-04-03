import { IDevice, Stability, UseCase } from '../device';

export const tlora: IDevice = {
  name: 'T-Lora',
  misc: {
    Stability: Stability.Stable,
    SuggestedUse: [UseCase.Portable],
    ImagePath: '/img/hardware/lora-v1.3.png',
  },
  features: {
    BLE: false,
    WiFi: true,
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
    WiFiVersion: '2.4GHz 802.11 b/g/n WPA/WPA2/WPA2-Enterprise/SPS',
    WiFiAntenna: 'Integrated',
    Chipset: 'ESP32',
    Frequencies: [433, 868, 915, 923],
    LoRa: 'SX1276',
  },
  variants: [
    {
      name: 'T-Lora v1',
    },
    {
      name: 'T-Lora v1.3',
    },
    {
      name: 'T-Lora v2',
    },
    {
      name: 'T-Lora v2.1.16',
    },
  ],
};
