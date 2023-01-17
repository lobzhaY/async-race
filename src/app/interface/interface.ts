export interface CarBody {
  name: string,
  color: string,
}

export interface WinnerBody {
  id: number,
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
