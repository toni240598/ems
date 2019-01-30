export enum Equipment {
  All  = '*',
  Site = 'Site',
  Zone = 'Zone',
  AC = 'AC',
  Chiller = 'Chiller',
  Pump = 'Pompa',
  Dispenser = 'Dispenser',
  Padlock = 'PL1BT',
  Lamp = 'L100w',
  Door = 'Door',

  BreakerR2 = 'Breaker R2',
  BreakerR3 = 'Breaker R3',
  BreakerR4 = 'Breaker R4',
  BreakerR5 = 'Breaker R5',
  BreakerR6 = 'Breaker R6',

  BreakerS2 = 'Breaker S2',
  BreakerS3 = 'Breaker S3',
  BreakerS4 = 'Breaker S4',
  BreakerS5 = 'Breaker S5',
  BreakerS6 = 'Breaker S6',

  BreakerT2 = 'Breaker T2',
  BreakerT3 = 'Breaker T3',
  BreakerT4 = 'Breaker T4',
  BreakerT5 = 'Breaker T5',
  BreakerT6 = 'Breaker T6',

  Rectifier = 'Rectifier',
  Genset    = 'Genset',
  Engine    = 'Engine',
  ATS       = 'ATS',
  RectifierModule = 'Rectifier Module',
  PDU       = 'PDU'
}

export class EqType {
    constructor(input?: EqType) {
        Object.assign(this, input);
    }

    id: Number;
    type: Equipment;
    brand: String;
    series: String;

}
