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
<div class="garage__pagination">
<button class="prev-button" id="prev">prev</button>
<button class="next-button" id="next">next</button>
</div>
${Footer.render()}
<div class="winner-message" id="message"></div>
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



const garagePage = document.querySelector<HTMLElement>('.garage');
garagePage!.style.display = 'block';
const winnersPage = document.querySelector<HTMLElement>('.winners');
winnersPage!.style.display = 'none';
const mamagementBlock = document.querySelector<HTMLElement>('.management');
mamagementBlock!.style.display = 'block';
