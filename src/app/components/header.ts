import { Winners } from '../pages/index';
import store from '../store/store';

class Header {
    addEvents(): void {
        const buttonGarage = document.getElementById('button-garage');
        const buttonWinners = document.getElementById('button-winners');

        buttonGarage?.addEventListener('click', () => {
            const garagePage = document.querySelector<HTMLElement>('.garage');
            if (garagePage) {
                garagePage.style.display = 'block';
            }
            const winnersPage = document.querySelector<HTMLElement>('.winners');
            if (winnersPage) {
                winnersPage.style.display = 'none';
            }
            const managementBlock = document.querySelector<HTMLElement>('.management');
            if (managementBlock) {
                managementBlock.style.display = 'block';
            }

            (document.querySelector('.garage__pagination') as HTMLElement).style.display = 'block';
            (document.querySelector('.winners__pagination') as HTMLElement).style.display = 'none';
            store.view = 'garage';
        });

        buttonWinners?.addEventListener('click', (): void => {
            Winners.updateStateWinners();

            const garagePage = document.querySelector<HTMLElement>('.garage');
            if (garagePage) {
                garagePage.style.display = 'none';
            }
            const managementBlock = document.querySelector<HTMLElement>('.management');
            if (managementBlock) {
                managementBlock.style.display = 'none';
            }
            const winnersPage = document.querySelector<HTMLElement>('.winners');
            if (winnersPage) {
                winnersPage.innerHTML = Winners.render();
                winnersPage.style.display = 'block';
            }

            (document.querySelector('.garage__pagination') as HTMLElement).style.display = 'none';
            (document.querySelector('.winners__pagination') as HTMLElement).style.display = 'block';
            store.view = 'winners';
        });
    }

    render(): string {
        return `
    <header class="header">
    <div class="container">
      <div class="header__buttons">
        <button id="button-garage">to garage</button>
        <button id="button-winners">to winners</button>
      </div>
    </div>
  </header>
    `;
    }
}

const header = new Header();
export default header;
