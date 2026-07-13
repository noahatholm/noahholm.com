class MyHeader extends HTMLElement {
    connectedCallback() {

    const homeUrl = this.getAttribute('home-url') || '/index.html';
    const blogUrl = this.getAttribute('blog-url') || '/blog.html';
    const projectsUrl = this.getAttribute('projects-url') || '/projects';
    const visitorUrl = this.getAttribute('visitor-url') || '/visitor-map';


    this.innerHTML = `
      <header>
        <audio id="based-god" src="/audio/lil_b.mp3"></audio>
        <h1 onclick="playBasedGod()">Noah Holm</h1>
        </button>

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
        <a href="https://github.com/noahatholm" class="social-btn" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
        </a>
        <p>© Noah Holm 2024 - ${new Date().getFullYear()} | All Rights Reserved</p>
        <p>GDPR Notice - This Website collects data</p>
        <a href="${privacyUrl}" class="link"><p>Privacy Policy</p></a>
      </footer>
    `;
  }
}

function playBasedGod() {
    const audio = document.getElementById('based-god');
    
    // Reset to start if they click it multiple times
    audio.currentTime = 0; 
    audio.play().catch(error => {
      console.log("Audio play blocked or failed:", error);
    });
  }

// Register them with the browser
customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);