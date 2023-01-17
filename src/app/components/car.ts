import { engineApi, garageApi, winnersApi } from "../api/index";
import { CarBody, ICar } from "../interface/interface";
import { Garage } from "../pages/index";
import { Management } from "./index";

class Car {
  async addEvents() {
    this.removeCar();
    this.selectCar();
  }
  async selectCar() {
    document.body.addEventListener('click', async (e) => {
      const target = e.target as Element;
      if (target.classList.contains('button-select')) {
        const idCar = +target.id.split('button-select-')[1];
        const selectedCar = await garageApi.getCar(idCar);

        Management.disabledUpdateField('create-name', 'create-color', 'button-create', true);
        (<HTMLInputElement>document.getElementById("update-name")).value = selectedCar.name;
        (<HTMLInputElement>document.getElementById("update-color")).value = selectedCar.color;
        Management.disabledUpdateField('update-name', 'update-color', 'button-update', false);

        Management.updateCar(idCar)
      }
    })
  }

  async removeCar() {
    document.body.addEventListener('click', async (e) => {
      const target = e.target as Element;
      if (target.classList.contains('button-delete')) {
        const idButton = +target.id.split('button-delete-')[1];
        await garageApi.deleteCar(idButton);
        await winnersApi.deleteWinner(idButton);
        await Garage.updateStateGarage();

        const garagePage = document.querySelector<HTMLElement>('.garage');
        garagePage!.innerHTML = Garage.render();
      }
    })
  }

  render({ id, name, color, isEngineStarted }: ICar) {
    return `
    <div class="garage__car">
          <div class="car__info">
            <button class="button-select" id="button-select-${id}">select</button>
            <button class="button-delete" id="button-delete-${id}">remove</button>
            <h3>${name}</h3>
          </div>
          <div class="car__road">
            <div class="road__buttons">
              <button>A</button>
              <button>B</button>
            </div>
              <div class="road__car">
                <svg class="car" fill="${color}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                  y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                  <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                  <g>
                    <g>
                      <g>
                        <path
                          d="M181.1,526.5c-40.8,0-73.9,33.1-73.9,73.9c0,3.1,0.3,6.2,0.7,9.3c4.6,36.5,35.6,64.6,73.3,64.6c38.7,0,70.4-29.7,73.6-67.6c0.2-2.1,0.3-4.2,0.3-6.3C255,559.6,221.9,526.5,181.1,526.5z M144.1,572.6l15.1,15.1c-1.2,2-2.1,4.2-2.7,6.5h-21.3C136.3,586.1,139.4,578.7,144.1,572.6z M135.1,606.9h21.4c0.6,2.3,1.5,4.4,2.7,6.4l-15.1,15.1C139.4,622.3,136.3,615,135.1,606.9z M174.7,646.4c-8-1.1-15.3-4.3-21.4-8.9l15-15c2,1.2,4.1,2,6.4,2.6V646.4z M174.7,575.8c-2.3,0.6-4.5,1.5-6.5,2.7l-15.1-15.1c6.2-4.7,13.5-7.8,21.6-8.9V575.8z M187.5,554.5c8.1,1.1,15.4,4.2,21.6,8.9L194,578.5c-2-1.2-4.2-2.1-6.5-2.7L187.5,554.5L187.5,554.5z M187.5,646.3V625c2.3-0.6,4.4-1.4,6.4-2.6l15,15C202.8,642.1,195.5,645.2,187.5,646.3z M218.1,628.5l-15.2-15.2c1.2-2,2.2-4.1,2.8-6.4h21.3C225.8,614.9,222.8,622.4,218.1,628.5z M205.7,594.1c-0.6-2.3-1.5-4.5-2.7-6.5l15.1-15.1c4.7,6.2,7.7,13.5,8.9,21.6L205.7,594.1L205.7,594.1z" />
                        <path
                          d="M795.1,526.5c-40.8,0-74,33.1-74,73.9c0,3.1,0.3,6.2,0.7,9.3c4.6,36.5,35.6,64.6,73.3,64.6c38.7,0,70.4-29.7,73.6-67.6c0.2-2.1,0.3-4.2,0.3-6.3C869.1,559.6,836,526.5,795.1,526.5z M758.1,572.6l15.1,15.1c-1.2,2-2.1,4.2-2.7,6.5h-21.3C750.3,586.1,753.4,578.7,758.1,572.6z M749.1,606.9h21.4c0.6,2.3,1.5,4.4,2.7,6.4l-15.1,15.1C753.4,622.3,750.3,615,749.1,606.9z M788.7,646.4c-8-1.1-15.3-4.3-21.4-8.9l15-15c2,1.2,4.1,2,6.4,2.6V646.4z M788.7,575.8c-2.3,0.6-4.5,1.5-6.5,2.7l-15.1-15.1c6.2-4.7,13.5-7.8,21.6-8.9V575.8z M801.5,554.5c8.1,1.1,15.4,4.2,21.6,8.9l-15.1,15.1c-2-1.2-4.2-2.1-6.5-2.7V554.5z M801.5,646.3V625c2.3-0.6,4.4-1.4,6.4-2.6l15,15C816.8,642.1,809.5,645.2,801.5,646.3z M832.1,628.5L817,613.4c1.2-2,2.2-4.1,2.7-6.4H841C839.8,614.9,836.8,622.4,832.1,628.5z M819.7,594.1c-0.6-2.3-1.5-4.5-2.7-6.5l15.1-15.1c4.7,6.2,7.7,13.5,8.9,21.6L819.7,594.1L819.7,594.1z" />
                        <path
                          d="M972.7,488.2v-54.7c0-8.8-6.4-16.3-15.1-17.6c-20.9-3.3-57.8-9.4-74.5-14.6c-23.8-7.3-115.9-46.3-147.8-53.6c-31.9-7.3-175.7-46.4-313.3,1.3c-23.3,8.1-128.1,58.2-189.7,84.2c-18.2,0.4-197.8,37.8-207.4,63.5c-9.6,25.7-12.6,38.1-14.3,44.7c-1.8,6.5,0,37.7,13.3,59.4c13.6,7.7,39.8,12.9,70.1,16.3c-0.3-1.8-0.7-3.7-1-5.5c-0.5-4-0.8-7.7-0.8-11.1c0-49,39.8-88.8,88.8-88.8c49,0,88.8,39.8,88.8,88.8c0,2.5-0.2,5-0.4,7.5c-0.5,5.5-1.5,10.8-2.9,16c0.1,0,0.2,0,0.2,0l440.8-8.9c-0.2-1.1-0.5-2.3-0.6-3.4c-0.5-4-0.8-7.6-0.8-11.1c0-49,39.8-88.8,88.8-88.8c49,0,88.8,39.8,88.8,88.8c0,0.2,0,0.3,0,0.5l1.9-0.2l75.4-14.2c0,0,28.9-15.4,28.9-57.6C990,500.8,972.7,488.2,972.7,488.2z M535.4,436.3l-164.6,5c3-24.7-11.6-30.2-11.6-30.2c65.4-59.4,197.3-61.4,197.3-61.4L535.4,436.3z M720.2,428.8l-150,5l13.6-84.1c77.5-1,121.8,16.1,121.8,16.1l22.1,35.7L720.2,428.8z M804.7,428.3h-41.8l-41.8-57.4c31.4,12.5,56.4,24.8,71.4,32.5C801.6,408.1,806.5,418.2,804.7,428.3z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div class="road__finish">
                <svg class="flag" xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                  <path
                    d="M10 42V8h17.15l.95 4.3H40v18.5H27.2l-.95-4.25H13V42Zm15-22.6Zm4.75 8.4H37V15.3H25.55L24.6 11H13v12.55h15.8Z" />
                </svg>
              </div>
            </div>
        </div>
    `
  };
};

const car = new Car();
export default car;