import '../style/app.scss';
import header from './components/header';
import { Footer, Header, Management, Car, WinnerMessage } from './components/index';
import { Garage, Winners } from "./pages/index";

const root = document.createElement('div');
root.id = 'root-container';
root.innerHTML = `${Header.render()}
${Management.render()}
${Garage.render()}
${Winners.render()}  
<div class="all-pagination">

  <div class="garage__pagination">
  <div class="pagination-container">
    <button class="prev-button" id="prev-garage">prev</button>
    <button class="next-button" id="next-garage">next</button>
    </div>
  </div>
  <div class="winners__pagination">
  <div class="pagination-container">
    <button class="prev-button" id="prev-winners">prev</button>
    <button class="next-button" id="next-winners">next</button>
  </div>
  </div>
 
</div>
${Footer.render()}
`;

document.body.append(root);

header.addEvents();

await Garage.updateStateGarage();
await Winners.updateStateWinners();
await Management.addEvents();
await Car.addEvents();
//await Management.createNewCar();
await Garage.prevPageClick();
await Garage.nextPageClick();
await Winners.addevents();



const garagePage = document.querySelector<HTMLElement>('.garage');
garagePage!.style.display = 'block';
const winnersPage = document.querySelector<HTMLElement>('.winners');
winnersPage!.style.display = 'none';
const mamagementBlock = document.querySelector<HTMLElement>('.management');
mamagementBlock!.style.display = 'block';
