import { Garage, Winners } from "../pages/index";
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
    });

    buttonWinners!.addEventListener('click', (e) => {
      const garagePage = document.querySelector<HTMLElement>('.garage');
      garagePage!.style.display = 'none';
      const mamagementBlock = document.querySelector<HTMLElement>('.management');
      mamagementBlock!.style.display = 'none';
      const winnersPage = document.querySelector<HTMLElement>('.winners');
      winnersPage!.style.display = 'block';
    });

   // this.disabledButtonHeader();
  }

  /* disabledButtonHeader() {
  Отмена повторного нажатия на ту же кнопку, на которой открыта страница????
    document.querySelector<HTMLElement>('.header')?.addEventListener('click', (e) => {
      const target = e.target as Element;
      if (target.classList.contains('button-garage')) {
        ((document.getElementById('button-garage')) as HTMLButtonElement).dis
      }
    })
  } */

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