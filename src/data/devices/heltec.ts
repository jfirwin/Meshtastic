import { IDevice, Stability, UseCase } from '../device';

export const heltec: IDevice = {
  name: 'Heltec',
  misc: {
    Stability: Stability.Semi,
    InstabilityReason: "Battery Issues",
    SuggestedUse: [UseCase.Portable],
    ImagePath: '/img/hardware/heltec-v2.png',
  },
  features: {
    BLE: true,
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
    BLEVersion: '4.2',
    BLEAntenna: 'Integrated',
    WiFiVersion: '2.4GHz 802.11 b/g/n WPA/WPA2/WPA2-Enterprise/SPS',
    WiFiAntenna: 'Integrated',
    Chipset: 'ESP32',
    Frequencies: [433, 868, 915, 923],
    LoRa: 'SX1276',
  },
  variants: [
    {
      name: 'Heltec v1',
      specifications: {
        BLEVersion: '4.0',
      },
    },
    {
      name: 'Heltec v2',
      specifications: {
        BLEVersion: '4.1',
      },
    },
    {
      name: 'Heltec v2.1',
    },
  ],
};
