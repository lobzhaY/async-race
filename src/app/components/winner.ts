import { IWinner } from "../interface/interface";
import store from "../store/store";

class Winner {


  render(winner: IWinner, index: number) {
    console.log(store.winnersPage);
    return `
    <div class="table-row">
      <p class="table-row__item-num table-row__items">${store.winnersPage === 1 ? ++index : ++index + (store.winnersPage * 10 - 10)}</p>
      <p class="table-row__item-car table-row__items">
      
      <svg class="winner-car" id="car-${winner.car.id}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 404.243 404.243" style="enable-background:new 0 0 404.243 404.243;" xml:space="preserve">
<g>
  <path style="fill:${winner.car.color};" d="M394.444,252.603l-4.552-0.091v-15.73c3.752-1.441,6.421-5.069,6.421-9.329
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
  <circle style="fill:${winner.car.color};" cx="317.454" cy="263.837" r="12.217"/>
  <path style="fill:${winner.car.color};" d="M171.34,185.578h81.05c3.783,0,7.243-2.135,8.939-5.518c1.695-3.382,1.338-7.432-0.926-10.464
    l-8.761-11.738l0.001,0.001c-12.25-16.415-31.008-26.409-51.466-27.419c-0.164-0.008-0.329-0.012-0.493-0.012H171.34
    c-5.522,0-10,4.477-10,10v35.15C161.34,181.101,165.817,185.578,171.34,185.578z M181.34,150.428h18.087
    c12.53,0.679,24.146,6.123,32.632,15.15H181.34V150.428z"/>

      </p>
      <p class="table-row__item-name table-row__items">${winner.car.name}</p>
      <p class="table-row__item-wins table-row__items">${winner.wins}</p>
      <p class="table-row__item-time table-row__items">${winner.time}</p>
    </div>
    `
  };
};

const winner = new Winner();
export default winner;