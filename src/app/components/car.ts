import { engineApi, garageApi, winnersApi } from '../api/index';
import { ICar } from '../interface/interface';
import { Garage, Winners } from '../pages/index';
import store from '../store/store';
import carAnimationUtils from '../utils/animation-car-utils';
import { Management, WinnerMessage } from './index';

class Car {
    async addEvents(): Promise<void> {
        this.removeCar();
        this.selectCar();
        this.engineCar();
        this.race();
    }

    async selectCar(): Promise<void> {
        document.body.addEventListener('click', async (e): Promise<void> => {
            const target = e.target as Element;
            if (target.classList.contains('button-select')) {
                const idCar = +target.id.split('button-select-')[1];
                const selectedCar = await garageApi.getCar(idCar);

                Management.disabledUpdateField('create-name', 'create-color', 'button-create', true);
                (<HTMLInputElement>document.getElementById('update-name')).value = selectedCar.name;
                (<HTMLInputElement>document.getElementById('update-color')).value = selectedCar.color;
                Management.disabledUpdateField('update-name', 'update-color', 'button-update', false);

                Management.updateCar(idCar);
            }
        });
    }

    async removeCar(): Promise<void> {
        document.body.addEventListener('click', async (e): Promise<void> => {
            const target = e.target as Element;
            if (target.classList.contains('button-delete')) {
                const idButton = +target.id.split('button-delete-')[1];
                await garageApi.deleteCar(idButton);
                await winnersApi.deleteWinner(idButton);
                await Garage.updateStateGarage();
                await Winners.updateStateWinners();

                const garagePage = document.querySelector<HTMLElement>('.garage');
                if (garagePage) {
                    garagePage.innerHTML = Garage.render();
                }
            }
        });
    }

    async startDriving(id: number): Promise<{ success: boolean; id: number; time: number }> {
        const startButton = document.getElementById(`start-car-${id}`) as HTMLButtonElement;
        startButton.disabled = true;

        const { velocity, distance } = await engineApi.startEngine(id);
        const time = Math.round(distance / velocity);

        (document.getElementById(`stop-car-${id}`) as HTMLButtonElement).disabled = false;

        const car = document.getElementById(`car-${id}`);
        const flag = document.getElementById(`finish-${id}`);

        const distanceHTML =
            Math.floor(carAnimationUtils.getDistanceBetweenElements(car as HTMLElement, flag as HTMLElement)) + 100;

        store.animation[id] = carAnimationUtils.animationCar(car as HTMLElement, distanceHTML, time);
        const { success } = await engineApi.driveCar(id);
        if (!success) {
            window.cancelAnimationFrame(store.animation[id].id as number);
        }
        return { success, id, time };
    }

    async stopDriving(id: number): Promise<void> {
        const stopButton = document.getElementById(`stop-car-${id}`) as HTMLButtonElement;
        stopButton.disabled = true;

        await engineApi.stopEngine(id);
        (document.getElementById(`start-car-${id}`) as HTMLButtonElement).disabled = false;

        const car = document.getElementById(`car-${id}`);
        if (car) {
            car.style.transform = `translateX(0)`;
        }
        if (store.animation[id]) {
            window.cancelAnimationFrame(store.animation[id].id as number);
        }
    }

    async race(): Promise<void> {
        document.body.addEventListener('click', async (e) => {
            const target = e.target as Element;
            if (target.classList.contains('race-button')) {
                (document.getElementById('race') as HTMLButtonElement).disabled = true;

                const winner = await carAnimationUtils.race();
                await winnersApi.saveWinner(winner);
                (document.getElementById('message') as HTMLElement).innerHTML = WinnerMessage.render(winner);
                (document.getElementById('message') as HTMLElement).style.display = 'block';
                (document.getElementById('reset') as HTMLButtonElement).disabled = false;
                await Winners.updateStateWinners();
            }

            if (target.classList.contains('reset-button')) {
                (document.getElementById('race') as HTMLButtonElement).disabled = false;
                (document.getElementById('reset') as HTMLButtonElement).disabled = true;
                (document.getElementById('message') as HTMLElement).innerHTML = '';
                (document.getElementById('message') as HTMLElement).style.display = 'none';

                store.cars.map((e) => {
                    this.stopDriving(e.id);
                });
            }
        });
    }

    async engineCar(): Promise<void> {
        document.body.addEventListener('click', async (e) => {
            const target = e.target as Element;
            if (target.classList.contains('start-button')) {
                const id = parseInt(target.id.split('start-car-')[1]);
                this.startDriving(id);
            }
            if (target.classList.contains('stop-button')) {
                const id = parseInt(target.id.split('stop-car-')[1]);
                this.stopDriving(id);
            }
        });
    }

    render({ id, name, color }: ICar): string {
        return `
    <div class="garage__car">
          <div class="car__info">
            <button class="button-select" id="button-select-${id}">select</button>
            <button class="button-delete" id="button-delete-${id}">remove</button>
            <h3>${name}</h3>
          </div>
          <div class="car__road">
            <div class="road__buttons">
              <button class="start-button" id="start-car-${id}">A</button>
              <button class="stop-button" id="stop-car-${id}" disabled=true>B</button>
            </div>
              <div class="road__car">
                <svg class="car" id="car-${id}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 404.243 404.243" style="enable-background:new 0 0 404.243 404.243;" xml:space="preserve">
<g>
  <path style="fill:${color};" d="M394.444,252.603l-4.552-0.091v-15.73c3.752-1.441,6.421-5.069,6.421-9.329
    c0-4.331-2.759-8.008-6.611-9.398c-2.127-28.499-23.319-51.872-51.973-56.469l-49.959-8.014l-10.998-14.737
    c-17.819-23.876-45.104-38.413-74.86-39.882c-0.164-0.008-0.329-0.012-0.493-0.012h-50.743
    c-69.173,0-127.165,48.748-141.453,113.692C4.065,213.029,0,217.332,0,222.592v4.75c0,2.7,1.075,5.146,2.815,6.945
    c-0.848,4.514-1.311,9.161-1.311,13.917v6.798c0,5.523,4.478,10,10,10h4.233l29.387,0.59c0.925,22.052,19.146,39.71,41.421,39.71
    c21.713,0,39.57-16.778,41.314-38.049l131.655,2.643c0.096,0.003,0.194,0.01,0.289,0.01c0.018,0,0.036-0.003,0.054-0.003
    l16.625,0.334c3.087,19.836,20.283,35.065,40.971,35.065c20.113,0,36.922-14.397,40.677-33.426l35.911,0.721
    c0.068,0.001,0.137,0.002,0.205,0.002c5.43,0,9.885-4.346,9.994-9.799C404.352,257.28,399.966,252.713,394.444,252.603z
     M338.92,263.837c0,11.836-9.63,21.466-21.466,21.466c-11.837,0-21.467-9.63-21.467-21.466c0-11.836,9.63-21.466,21.467-21.466
    C329.29,242.371,338.92,252.001,338.92,263.837z M65.188,265.996l9.37,0.188c1.095,5.623,6.043,9.87,11.987,9.87
    c5.773,0,10.598-4.009,11.875-9.391l9.354,0.188c-1.473,10.411-10.419,18.452-21.23,18.452
    C75.438,285.303,66.275,276.822,65.188,265.996z M150.676,118.94h50.488c23.684,1.24,45.389,12.841,59.579,31.856l13.424,17.987
    c1.556,2.084,3.862,3.481,6.431,3.893l53.964,8.656c19.334,3.102,33.654,18.824,35.188,38.026
    c-12.579-14.72-31.253-23.841-51.881-23.841c-32.594,0-60.256,23.144-66.75,54.207l-94.805-1.903v-15.236
    c0-32.9-26.766-59.667-59.666-59.667H76.79c-12.242,0-23.799,2.956-34.027,8.162C64.418,143.949,104.679,118.94,150.676,118.94z
     M21.596,245.003c1.665-29,25.785-52.085,55.194-52.085h19.856c21.872,0,39.666,17.794,39.666,39.667v12.418H21.596z
     M317.454,222.371c-18.114,0-33.542,11.68-39.176,27.9l-6.652-0.134c5.896-20.068,24.514-34.619,46.242-34.619
    c22.357,0,41.47,15.142,46.758,36.486l-7.479-0.15C351.994,234.814,336.153,222.371,317.454,222.371z"/>
  <circle style="fill:${color};" cx="317.454" cy="263.837" r="12.217"/>
  <path style="fill:${color};" d="M171.34,185.578h81.05c3.783,0,7.243-2.135,8.939-5.518c1.695-3.382,1.338-7.432-0.926-10.464
    l-8.761-11.738l0.001,0.001c-12.25-16.415-31.008-26.409-51.466-27.419c-0.164-0.008-0.329-0.012-0.493-0.012H171.34
    c-5.522,0-10,4.477-10,10v35.15C161.34,181.101,165.817,185.578,171.34,185.578z M181.34,150.428h18.087
    c12.53,0.679,24.146,6.123,32.632,15.15H181.34V150.428z"/>
              </div>
              <div class="road__finish">
                <svg id="finish-${id}" class="flag" xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path
                    d="M10 42V8h17.15l.95 4.3H40v18.5H27.2l-.95-4.25H13V42Zm15-22.6Zm4.75 8.4H37V15.3H25.55L24.6 11H13v12.55h15.8Z" />
                </svg>
              </div>
            </div>
        </div>
    `;
    }
}

const car = new Car();
export default car;
