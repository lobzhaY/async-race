import { garageApi, winnersApi } from "../api/index";

const { items: cars, count: carsCount } = await garageApi.getCars(1);
const { items: winners, count: winnersCount } = await winnersApi.getWinners({ page: 1});

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
};