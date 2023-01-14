import { WINNERS } from "../index";

class Winners {
  /* getSortOrder(sort: number, order: number) {
    if (sort && order) return `&_sort=${sort}&_order=${order}`
    return '';
  }


  async getWinners(/* { page, limit = 10, sort, order} *//*) {
    const res = await fetch(`${WINNERS}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
    const items = await res.json();

    return {
      items: await Promise.all(items.map(async winner => ({ ...winner, car: await getCar(winner.id)})));
      count: res.headers.get('X-Total-Count')
    }
  } */

  async getWinner(id: number) {
    return (await fetch(`${WINNERS}/${id}`)).json();
  }

  async createWinner(/* body */) {
    /* {
    id: number,
    wins: number,
    time: number
  } */

  return (await fetch(WINNERS, {
    method: 'POST',
    /* body: JSON.stringify(body), */
    headers: {
      'Content-Type': 'application/json'
    }
  })).json();
  }

 async deleteWinner(id: number) {
  return (await fetch(`${WINNERS}/${id}`, { method: 'DELETE'})).json();
 } 

 async updateWinner(id: number /* , body */) {
  return (await fetch(`${WINNERS}/${id}`, {
    method: 'PUT',
    /* body: JSON.stringify(body), */
    headers: {
      'Content-Type': 'application/json'
    }
  })).json();
 }

 async getWinnerStatus(id: number) {
  return (await fetch(`${WINNERS}/${id}`)).status;
 }
/*  async saveWinner({ id, time }) {
  const winnerStatus = await this.getWinnerStatus(id);
  if (winnerStatus === 404) {
    await this.createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await this.getWinner(id);
    await this.updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
 } */

}
const winnersApi = new Winners();
export default winnersApi;