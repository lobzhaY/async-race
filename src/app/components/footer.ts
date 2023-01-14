class Footer {

  render() {
    return `
    <footer class="footer">
    <div class="container">
      <div class="footer__info">
        <a href="https://rs.school/">
          <img src="https://rs.school/images/rs_school_js.svg" alt="Logo RS School" class="footer-logo">
        </a>
        <a href="https://github.com/lobzhaY">
          <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3203526/github-icon-sm.png" class="footer-git">
        </a>
      </div>
    </div>
  </footer>
    `
  };
};

const footer = new Footer();
export default footer;