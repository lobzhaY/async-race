import { garageApi, winnersApi } from "../api/index";
import { IStore } from "../interface/interface";

const { items: cars, count: carsCount } = await garageApi.getCars(1);
const { items: winners, count: winnersCount } = await winnersApi.getWinners({ page: 1});

const store: IStore = {
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
export default store;