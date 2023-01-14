import '../style/app.scss';
import { Garage, Winners } from "./pages/index";

const root = document.createElement('div');
root.innerHTML = Garage.render();
document.body.append(root);
