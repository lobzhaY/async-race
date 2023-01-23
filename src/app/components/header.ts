import { Garage, Winners } from "../pages/index";
import store from "../store/store";
import { Management } from "./index";

class Header {
  addEvents() {
    const buttonGarage = document.getElementById('button-garage');
    const buttonWinners = document.getElementById('button-winners');

    buttonGarage!.addEventListener('click', (e) => {
      const garagePage = document.querySelector<HTMLElement>('.garage');
      garagePage!.style.display = 'block';
      const winnersPage = document.querySelector<HTMLElement>('.winners');
      winnersPage!.style.display = 'none';
      const mamagementBlock = document.querySelector<HTMLElement>('.management');
      mamagementBlock!.style.display = 'block';

      (document.querySelector('.garage__pagination') as HTMLElement).style.display = 'block';
          (document.querySelector('.winners__pagination') as HTMLElement).style.display = 'none';
          store.view = 'garage';
          
    });

    buttonWinners!.addEventListener('click', (e) => {
      Winners.updateStateWinners();

      const garagePage = document.querySelector<HTMLElement>('.garage');
      garagePage!.style.display = 'none';
      const mamagementBlock = document.querySelector<HTMLElement>('.management');
      mamagementBlock!.style.display = 'none';
      const winnersPage = document.querySelector<HTMLElement>('.winners');
      winnersPage!.innerHTML = Winners.render();
      winnersPage!.style.display = 'block';

      (document.querySelector('.garage__pagination') as HTMLElement).style.display = 'none';
      (document.querySelector('.winners__pagination') as HTMLElement).style.display = 'block';
      store.view = 'winners';
    });

  }


  render() {
    return `
    <header class="header">
    <div class="container">
      <div class="header__buttons">
        <button id="button-garage">to garage</button>
        <button id="button-winners">to winners</button>
      </div>
    </div>
  </header>
    `
  };
};

const header = new Header();
export default header;