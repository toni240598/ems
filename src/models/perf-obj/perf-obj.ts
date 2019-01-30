export enum Performance {
  All  = '*',
  Coil = 'Temperature Coil',
  Temperature = 'Temperature',
  Power = 'Power',
  Energy = 'Energy',
  Humidity = 'Humidity',
  VAR = 'VAR',
  PF = 'PF',
  Current = 'Current',
  Voltage = 'Voltage',
  RunningHours = 'Running Hours',
  RPM = 'RPM',
  CoolantLevel = 'Coolant Level',
  EngineStatus = 'Engine Status',
  FuelLevel    = 'Fuel Level',
  OilPressure  = 'Oil Pressure',
  CoolantTemperature = 'Coolant Temperature',
  Frequency = 'Frequency',
  VoltageR = 'Voltage R',
  VoltageS = 'Voltage S',
  VoltageT = 'Voltage T',
  CurrentR = 'Current R',
  CurrentS = 'Current S',
  CurrentT = 'Current T',
  PFR      = 'PF R',
  PFS      = 'PF S',
  PFT      = 'PF T',
  InputVoltageR = 'Input Voltage R',
  InputVoltageS = 'Input Voltage S',
  InputVoltageT = 'Input Voltage T',
  RectifierUtilization = 'Rectifier Utilization',
  BatteryCurrent = 'Battery Current',
  LoadCurrent = 'Load Current',
  BatteryBreakerStatus = 'Battery Breaker Status',
  BatteryTestStatus = 'Battery Test Status',
  BatteryCapacityLeft = 'Battery Capacity Left',
  EqualityStage = 'Equality Stage',
  BatteryQuality = 'Battery Quality',
  BatteryTemperature = 'Battery Temperature',
  BatteryVoltage = 'Battery Voltage',
  FuelConsumed = 'Fuel Consumed',
  NumberStart = 'Number Start',
  BatteryCapacityUsed = 'Battery Capacity Used',
  OpenCount = 'Open Count',
  TemperatureMaterial = 'Temperature Material',
  GPSLatitude = 'GPSLatitude',
  GPSLongitude = 'GPSLongitude',
  IOLeftDoor  = 'IO Left Door',
  IORightDoor = 'IO Right Door'
}

export enum Period {
  All  = '*',
  Hourly = 'Hourly',
  Daily = 'MIN5',
  Weekly = 'HOUR1',
  Monthly  = 'HOUR6'
}

export enum Unit {
  Watt = 'W',
  WattHour = 'WH',
  Celcius = '°C',
  Voltage = 'V',
  Ampere  = 'A',
  Percen  = '%'
}

export class PerfObj {
    constructor(input?: PerfObj) {
        Object.assign(this, input);
    }

    private id: Number;
    private name: Performance;
    private unit: String;
    private period: Period;

    getId(): Number {
        return this.id;
    }

    setId(id: Number) {
        this.id = id;
    }

    getName(): Performance {
        return this.name;
    }

    setName(name: Performance) {
        this.name = name;
    }

    getUnit(): String {
        return this.unit;
    }

    setUnit(unit: String) {
        this.unit = unit;
    }

    getPeriod(): Period {
        return this.period;
    }

    setPeriod(period: Period) {
        this.period = period;
    }
}