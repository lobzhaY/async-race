
class Header {

  render() {
    return `
    <header class="header">
    <div class="container">
      <div class="header__buttons">
        <button>to garage</button>
        <button>to winners</button>
      </div>
    </div>
  </header>
    `
  };
};

const header = new Header();
export default header;