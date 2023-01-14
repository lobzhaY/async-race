import { Header, Management, Car, Footer } from "../components/index";
class Garage {
  
  render() {
    return  `
    ${Header.render()}
    ${Management.render()}
    <main class="garage">
    <div class="container">
      <h1 class="title">Garage ( <span class="winners-num"">4</span> )</h1>
      <div class="garage__garage">
      <h2 class="winners__title">Garage #<span class="pagination-num">4</span></h2>
      <div class="garage__container" id="garage">
        ${Car.render()}

      </div>
        <div class="garage__pagination">
          <button>prev</button>
          <button>next</button>
        </div>
      </div>
    </div>
  </main>
  ${Footer.render()}
    `  
  }
};

const garage = new Garage();
export default garage;
