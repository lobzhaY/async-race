import { garageApi } from '../api/index';
import { CarBody } from '../interface/interface';
import { Garage, Winners } from '../pages/index';
import carCreateUtils from '../utils/create-car-utils';

class Management {
    async addEvents(): Promise<void> {
        this.createNewCar();
        this.disabledUpdateField('update-name', 'update-color', 'button-update', true);
        this.generateCars();
    }

    generateCars(): void {
        document.getElementById('generate')?.addEventListener('click', async (): Promise<void> => {
            const cars = carCreateUtils.generateRandomCars();
            await Promise.all(cars.map(async (car) => await garageApi.createCar(car)));
            await Garage.updateStateGarage();
            const garagePage = document.querySelector<HTMLElement>('.garage');
            if (garagePage) {
                garagePage.innerHTML = Garage.render();
            }
            (document.getElementById('generate') as HTMLButtonElement).disabled = false;
        });
    }

    disabledUpdateField(inputName: string, inputColor: string, button: string, flag: boolean): void {
        const inputNameUpdate = document.getElementById(inputName) as HTMLInputElement;
        inputNameUpdate.disabled = flag;
        const inputColorUpdate = document.getElementById(inputColor) as HTMLInputElement;
        inputColorUpdate.disabled = flag;
        const buttonUpdate = document.getElementById(button) as HTMLButtonElement;
        buttonUpdate.disabled = flag;
    }

    async updateCar(idCar: number): Promise<void> {
        const buttonUpdate = document.getElementById('button-update');
        buttonUpdate?.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault();
            const inputText = (<HTMLInputElement>document.getElementById('update-name')).value;
            const inputColor = (<HTMLInputElement>document.getElementById('update-color')).value;
            const car = Object.fromEntries(
                new Map([
                    ['name', `${inputText}`],
                    ['color', `${inputColor}`],
                ])
            ) as unknown;

            const newCar: CarBody = car as CarBody;

            await garageApi.updateCar(idCar, newCar);
            await Garage.updateStateGarage();
            await Winners.updateStateWinners();

            const garagePage = document.querySelector<HTMLElement>('.garage');
            if (garagePage) {
                garagePage.innerHTML = Garage.render();
            }

            this.disabledUpdateField('update-name', 'update-color', 'button-update', true);
            this.disabledUpdateField('create-name', 'create-color', 'button-create', false);
            (<HTMLInputElement>document.getElementById('update-name')).value = '';
            (<HTMLInputElement>document.getElementById('update-color')).value = 'aaaaaa';
        });
    }

    async createNewCar(): Promise<void> {
        const buttonCreate = document.getElementById('button-create');
        buttonCreate?.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault();
            const inputText = (<HTMLInputElement>document.getElementById('create-name')).value;
            const inputColor = (<HTMLInputElement>document.getElementById('create-color')).value;
            const car = Object.fromEntries(
                new Map([
                    ['name', `${inputText}`],
                    ['color', `${inputColor}`],
                ])
            ) as unknown;

            const newCar: CarBody = car as CarBody;

            await garageApi.createCar(newCar);
            await Garage.updateStateGarage();

            const garagePage = document.querySelector<HTMLElement>('.garage');
            if (garagePage) {
                garagePage.innerHTML = Garage.render();
            }

            (<HTMLInputElement>document.getElementById('create-name')).value = '';
            (<HTMLInputElement>document.getElementById('create-color')).value = '#aaaaaa';
        });
    }

    render(): string {
        return `<section class="management">
    <div class="container">
      <div class="row">
        <input type="text" id="create-name">
        <input type="color" id="create-color">
        <button id="button-create">create</button>
      </div>
      <div class="row">
        <input id="update-name" type="text">
        <input id="update-color" type="color">
        <button id="button-update">update</button>
      </div>
      <div class="row">
        <button class="race-button" id="race">race</button>
        <button class="reset-button" id="reset" disabled=true>reset</button>
        <button id="generate">generate cars</button>
      </div>
    </div>
  </section>`;
    }
}

const management = new Management();
export default management;
