import { Footer, Header, Winner } from "../components/index";

class Winners {

  render() {
    return `
  <div class="wrapper">
  ${Header.render()}
    <main class="winners">
      <div class="container">
        <h1 class="title">Winners ( <span class="winners-num">4</span> )</h1>
        <div class="winners__garage">
          <h2 class="winners__title">Page #<span class="pagination-num">1</span></h2>
          <div class="winners__table">
            <div class="table-row-title">
              <p class="table-row__item-num table-row__item">Number</p>
              <p class="table-row__item-car table-row__item">Car</p>
              <p class="table-row__item-name table-row__item">Name</p>
              <p class="table-row__item-wins table-row__item">Wins</p>
              <p class="table-row__item-time table-row__item">Best time (s) <svg class="table-row__item-icon" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m24 30-10-9.95h20Z"/></svg></p>
            </div>
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
            ${Winner.render()}
          </div>
          <div class="garage__pagination">
            <button>prev</button>
            <button>next</button>
          </div>
        </div>
      </div>
    </main>
  ${Footer.render()}
  </div>
    `
  };
};

const winners = new Winners();
export default winners;