import { ENGINE } from "../index";

class EngineApi {

  //PATCH
  async startEngine(id: number) {
    return (await fetch(`${ENGINE}?=${id}&status=started`)).json();
  }

  async stopEngine(id: number) {
    return (await fetch(`${ENGINE}?=${id}&status=stopped`)).json();
  }

 async driveCar(id: number) {
    const res = await fetch(`${ENGINE}?id=${id}&status=drive`).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  }

}
const engineApi = new EngineApi();
export default engineApi;