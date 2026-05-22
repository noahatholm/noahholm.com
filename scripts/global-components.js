class MyHeader extends HTMLElement {
    connectedCallback() {

    const homeUrl = this.getAttribute('home-url') || '/index.html';
    const blogUrl = this.getAttribute('blog-url') || '/blog.html';
    const projectsUrl = this.getAttribute('projects-url') || '/projects';
    const visitorUrl = this.getAttribute('visitor-url') || '/visitor-map';


    this.innerHTML = `
      <header>
        <h1>Noah Holm</h1>
        <nav>
            <a href="${homeUrl}">Home</a>
            <a href="${blogUrl}">Posts</a>
            <a href="${projectsUrl}">Projects</a>
            <a href="${visitorUrl}">Visitor Map</a>
        </nav>
      </header>
    `;
  }
}

class MyFooter extends HTMLElement {
  connectedCallback() {
    const privacyUrl = this.getAttribute('privacy-url') || '/privacy.html';


    this.innerHTML = `
      <footer class="my-footer">
        <p id="view-counter" class="counter-error">Error fetching page views</p>
        <!-- Linkedin Button -->
        <a href="https://www.linkedin.com/in/noah-holm/" class="social-btn" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
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
        <p>GDPR Notice - This Website collects data</p>
        <a href="${privacyUrl}" class="link"><p>Privacy Policy</p></a>
      </footer>
    `;
  }
}

// Register them with the browser
customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);