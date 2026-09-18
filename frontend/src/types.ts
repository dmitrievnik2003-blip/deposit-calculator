export interface CalculateRequest {
  amount: number;
  months: number;
  rate: number;
}

export interface CalculateResponse {
  total: number;
  profit: number;
}

/** Границы полей — совпадают с валидацией на backend (CalculateRequest.java). */
export const LIMITS = {
  amount: { min: 1000, max: 10_000_000 },
  months: { min: 1, max: 60 },
  rate: { min: 1, max: 20 },
} as const;
