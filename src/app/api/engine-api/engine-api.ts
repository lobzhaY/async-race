import { ENGINE } from "../index";

class EngineApi {

  async startEngine(id: number) {
   return (await fetch(`${ENGINE}?id=${id}&status=started`, { method: 'PATCH' })).json();
  }

  async stopEngine(id: number) {
    return (await fetch(`${ENGINE}?id=${id}&status=stopped`, { method: 'PATCH' })).json();
  }

 
 async driveCar(id: number) {
    const res = await fetch(`${ENGINE}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  }

}
const engineApi = new EngineApi();
export default engineApi;