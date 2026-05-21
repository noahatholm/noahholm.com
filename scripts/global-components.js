class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Noah Holm</h1>
        <nav>
            <a href="index">Home</a>
            <a href="evilmonth">Evil Month</a>
            <a href="snakes">List of Snakes</a>
            <a href="life">Game of Life</a>
        </nav>
      </header>
    `;
  }
}

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <!-- Instagram Button -->
        <a href="https://www.instagram.com/noahatholm/?hl=en" class="social-btn" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i>
        </a>
        <!-- Steam Button -->
        <a href="https://steamcommunity.com/id/noahatholm/" class="social-btn" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-steam"></i>
        </a>
        <!-- GitHub Button -->
        <a href="https://github.com/noahatholm/noahholm.com" class="social-btn" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
        </a>
        <p>© ${new Date().getFullYear()} My Portfolio</p>
      </footer>
    `;
  }
}

// Register them with the browser
customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);