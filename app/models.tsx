

export interface ArquiRequest {
  last_parameters: NailCutData[]
}

export interface EspParameters {
  distancia_cm: number,
  humedad: number,
  ph: number,
  rele_estado: string,
  tds_ppm: number,
  temperatura_aire: number,
  timestamp: Date
}

// New model for nail cutting system data
export interface NailCutData {
  fsr: number;
  angle: number;
  cutOk: number;
  state: number;
  distance: number;
}

