import { garageApi } from "../api/index";
import { Header, Management, Car, Footer } from "../components/index";
import { ICar } from "../interface/interface";
import store from "../store/store";
import { Winners } from "./index";

class Garage {
 async updateStateGarage() {
    const { items, count } = await garageApi.getCars(store.carsPage);
    store.cars = items;
    store.carsCount = count;

    const maxCarsPage: number = store.carsPage * 7;

     if (maxCarsPage < parseInt(store.carsCount!)) {
      (document.getElementById('next-garage') as HTMLButtonElement).disabled = false;
     } else {
      (document.getElementById('next-garage') as HTMLButtonElement).disabled = true;
     }
    
     if (store.carsPage > 1) {
      (document.getElementById('prev-garage') as HTMLButtonElement).disabled = false;
     } else {
      (document.getElementById('prev-garage') as HTMLButtonElement).disabled = true;
     }
  }

  prevPageClick() {
    document.body.addEventListener('click', async (e) => {
      const target = e.target as Element;
      if (target.classList.contains('prev-button')) {
        if (store.view == 'garage') {
          store.carsPage--;
          await this.updateStateGarage();
          const garagePage = document.querySelector<HTMLElement>('.garage');
          garagePage!.innerHTML = this.render();

          ((document.getElementById('race')) as HTMLButtonElement).disabled = false;
        ((document.getElementById('reset')) as HTMLButtonElement).disabled = true;
        
        } else {
          store.winnersPage--;
         await Winners.updateStateWinners();
         const winnersPage = document.querySelector<HTMLElement>('.winners');
         winnersPage!.innerHTML = Winners.render();
        }
      }
    })
  }

  nextPageClick() {
    document.body.addEventListener('click', async (e) => {
      const target = e.target as Element;
      if (target.classList.contains('next-button')) {
        if (store.view === 'garage') {
          store.carsPage++;
          await this.updateStateGarage();
          const garagePage = document.querySelector<HTMLElement>('.garage');
          garagePage!.innerHTML = this.render();

          ((document.getElementById('race')) as HTMLButtonElement).disabled = false;
        ((document.getElementById('reset')) as HTMLButtonElement).disabled = true;
        } else if (store.view === 'winners') {
          store.winnersPage++;
          await Winners.updateStateWinners();
         const winnersPage = document.querySelector<HTMLElement>('.winners');
         winnersPage!.innerHTML = Winners.render();
        }
      }
    })
  }

  render() {
    return  `
    <main class="garage">
    <div class="container">
      <h1 class="title">Garage ( <span class="winners-num"">${store.carsCount}</span> )</h1>
      <div class="garage__garage">
      <h2 class="winners__title">Garage #<span class="pagination-num">${store.carsPage}</span></h2>
      <div class="garage__container" id="garage">
      ${store.cars.map((car: ICar) => Car.render(car)).join('')}
      </div>
      </div>
    </div>

    <div class="winner-message" id="message"></div>
  </main>
    `  
  }
};

const garage = new Garage();
export default garage;
