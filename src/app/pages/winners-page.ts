import { winnersApi } from '../api/index';
import { Winner } from '../components/index';
import store from '../store/store';

class Winners {
    async updateStateWinners(): Promise<void> {
        const { items, count } = await winnersApi.getWinners({
            page: store.winnersPage,
            sort: store.sortBy,
            order: store.sortOrder,
        });
        store.winners = items;
        store.winnersCount = count;

        if (store.winnersCount) {
            if (store.winnersPage * 10 < parseInt(store.winnersCount)) {
                (document.getElementById('next-winners') as HTMLButtonElement).disabled = false;
            } else {
                (document.getElementById('next-winners') as HTMLButtonElement).disabled = true;
            }
            if (store.winnersPage > 1) {
                (document.getElementById('prev-winners') as HTMLButtonElement).disabled = false;
            } else {
                (document.getElementById('prev-winners') as HTMLButtonElement).disabled = true;
            }
        }
    }
    async addEvents(): Promise<void> {
        document.body.addEventListener('click', async (e) => {
            const target = e.target as Element;
            if (target.classList.contains('table-wins')) {
                this.setSortOrder('wins');
            }
            if (target.classList.contains('table-time')) {
                this.setSortOrder('time');
            }
        });
    }

    async setSortOrder(sort: string): Promise<void> {
        store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
        store.sortBy = sort;

        await this.updateStateWinners();
        const winnersPage = document.querySelector<HTMLElement>('.winners');
        if (winnersPage) {
            winnersPage.innerHTML = this.render();
        }
        if (store.sortBy === 'wins') {
            if (store.sortOrder === 'asc') {
                (document.getElementById('icon-wins') as HTMLElement).style.display = 'block';
                (document.getElementById('icon-wins') as HTMLElement).style.transform = 'scale(1, -1)';
            } else {
                (document.getElementById('icon-wins') as HTMLElement).style.display = 'block';
            }
        }
        if (store.sortBy === 'time') {
            if (store.sortOrder === 'asc') {
                (document.getElementById('icon-time') as HTMLElement).style.display = 'block';
                (document.getElementById('icon-time') as HTMLElement).style.transform = 'scale(1, -1)';
            } else {
                (document.getElementById('icon-time') as HTMLElement).style.display = 'block';
            }
        }
    }

    render(): string {
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
              <p class="table-row__item-wins table-row__item table-wins">Wins <svg class="table-row__item-icon" id="icon-wins" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m24 30-10-9.95h20Z"/></svg></p>
              <p class="table-row__item-time table-row__item table-time">Best time (s)<svg class="table-row__item-icon" id="icon-time" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m24 30-10-9.95h20Z"/></svg></p>
            </div>
            ${store.winners.map((winner, index) => Winner.render(winner, index)).join('')}
          </div>
        </div>
      </div>
    </main>
    `;
    }
}

const winners = new Winners();
export default winners;
