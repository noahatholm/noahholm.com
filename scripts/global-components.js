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
        <p id="view-counter" class="counter-error">Error fetching page views</p>
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
        <p>© Noah Holm 2024 - ${new Date().getFullYear()} | All Rights Reserved</p>
        <p>GDPR Notice - This Website does not use cookies.🍪</p>
      </footer>
    `;
  }
}

// Register them with the browser
customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);