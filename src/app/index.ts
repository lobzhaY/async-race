import '../style/app.scss';
import car from './components/car';
import { Garage, Winners } from "./pages/index";

const root = document.createElement('div');
root.innerHTML = Garage.render();
document.body.append(root);
car.addListener();
