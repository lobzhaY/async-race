class Management {

  render() {
    return `<section class="management">
    <div class="container">
      <div class="row">
        <input type="text">
        <input type="color">
        <button>create</button>
      </div>
      <div class="row">
        <input type="text">
        <input type="color">
        <button>update</button>
      </div>
      <div class="row">
        <button>race</button>
        <button>reset</button>
        <button>generate cars</button>
      </div>
    </div>
  </section>`
  };
};

const management = new Management();
export default management;