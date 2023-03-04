import '../style/app.scss';
import header from './components/header';
import { Footer, Header, Management, Car } from './components/index';
import { Garage, Winners } from './pages/index';

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
await Garage.prevPageClick();
await Garage.nextPageClick();
await Winners.addEvents();

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
