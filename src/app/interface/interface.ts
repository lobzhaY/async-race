export interface CarBody {
  name: string,
  color: string,
}

export interface WinnerBody {
  id: number | undefined,
  wins: number,
  time: number
}

export interface ICar {
  id: number,
  name: string,
  color: string,
  isEngineStarted: boolean,
}

export interface IWinners {
  page: number,
  limit?: number,
  sort?: string | null,
  order?: string | null,
}

export interface IWinner {
  car: {
    color: string,
    id: number,
    name: string,
  },
  id: number,
  time: number,
  wins: number,
}

export interface IState {
  id?: number,
}

export interface IRace {
  success: boolean, 
  id: number, 
  time: number
}

export interface TotalWinner {
  name?: string | undefined,
  id?: number | undefined,
  color?: string | undefined,
  time: number
}

export interface IStore {
  animation: {
    [key: number]: IState,
  },
  cars: ICar[],
  carsCount: string | null,
  carsPage: number,
  sortBy: string | null,
  sortOrder: string | null,
  view: string,
  winners: IWinner[],
  winnersCount: string | null,
  winnersPage: number
}
