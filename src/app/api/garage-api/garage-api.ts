import { GARAGE } from "../index";

class GarageApi {
  async getCars(page: number, limit: number = 7) {
    const res = await fetch(`${GARAGE}?_page=${page}&_limit=${limit}`);

    return {
      items: await res.json(),
      count: res.headers.get('X-Total-Count')
    };
  }

  async getCar(id: number) {
    return (await fetch(`${GARAGE}/${id}`)).json();
  }

  async createCar(/* body */) {
    /* {
    name: string,
    color: string
  } */
    return (await fetch(GARAGE, {
      method: 'POST',
      /* body: JSON.stringify(body), */
      headers: {
        'Content-Type': 'application/json'
      },
    })).json();
  }

  async deleteCar(id: number) {
    return (await fetch(`${GARAGE}/${id}`, { method: 'DELETE'})).json();
  }

  async updateCar(id: number /*, body */) {
    /* {
    name: string,
    color: string
  } */
    return (await fetch(`${GARAGE}/${id}`, {
      method: 'PUT',
      /* body: JSON.stringify(body), */
      headers: {
        'Content-Type': 'application/json'
      },
    })).json();
  }

}
const garageApi = new GarageApi();
export default garageApi;