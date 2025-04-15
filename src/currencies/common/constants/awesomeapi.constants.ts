export const AWESOME_API_BASE_URL = 'https://economia.awesomeapi.com.br/json';

export const AWESOME_API_ENDPOINTS = {
  AVAILABLE_PAIRS: `${AWESOME_API_BASE_URL}/available`,
  DAILY_COMPARISON: (pair: string, days: number) =>
    `${AWESOME_API_BASE_URL}/daily/${pair}/${days}`,
};