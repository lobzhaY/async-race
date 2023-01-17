import { winnersApi } from "../api/index";
import { Footer, Header, Winner } from "../components/index";
import store from "../store/store";

class Winners {
  async updateStateWinners() {

    const { items, count } = await winnersApi.getWinners({ page: store.winnersPage, sort: store.sortBy, order: store.sortOrder });
    store.winners = items;
    store.winnersCount = count; 

    /* if (store.winnersPage * 10 < store.winnersCount) {
      //button nex disabled = false
    } else {
      //button nex disabled = true
    }
    if (store.winnersPage > 1) {
      //button prev disabled = false
    } else {
      //button nex disabled = true
    } */
  }

  render() {
    return `
    <main class="winners">
      <div class="container">
        <h1 class="title">Winners ( <span class="winners-num">${store.winnersCount}</span> )</h1>
        <div class="winners__garage">
          <h2 class="winners__title">Page #<span class="pagination-num">${store.winnersPage}</span></h2>
          <div class="winners__table">
            <div class="table-row-title">
              <p class="table-row__item-num table-row__item">Number</p>
              <p class="table-row__item-car table-row__item">Car</p>
              <p class="table-row__item-name table-row__item">Name</p>
              <p class="table-row__item-wins table-row__item">Wins</p>
              <p class="table-row__item-time table-row__item">Best time (s) <svg class="table-row__item-icon" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m24 30-10-9.95h20Z"/></svg></p>
            </div>
            ${store.winners.map((winner, index) => Winner.render(winner, index)).join('')}
          </div>
        </div>
      </div>
    </main>
    `
  };
};

const winners = new Winners();
export default winners;