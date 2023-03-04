export const BASE_URL = 'http://localhost:3000';
export const GARAGE = `${BASE_URL}/garage`;
export const ENGINE = `${BASE_URL}/engine`;
export const WINNERS = `${BASE_URL}/winners`;

export { default as engineApi } from './engine-api/engine-api';
export { default as garageApi } from './garage-api/garage-api';
export { default as winnersApi } from './winners-api/winners-api';
