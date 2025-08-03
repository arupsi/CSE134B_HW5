class ProjectCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          --card-background-color: #f9f9f9;
          --card-border-color: #ddd;
          --card-text-color: #333;
          --card-link-color: #0066cc;
          --card-font-family: sans-serif;

          display: block;
          background-color: var(--card-background-color);
          border: 1px solid var(--card-border-color);
          border-radius: 8px;
          padding: 16px;
          margin: 16px;
          max-width: 300px;
          font-family: var(--card-font-family);
          color: var(--card-text-color);
        }
        .card-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        h2 {
          margin-top: 0;
        }
        .project-image {
          display: block;
          margin-bottom: 16px;
        }
        img {
          width: 100%;
          height: auto;
        }
        p {
          flex-grow: 1;
        }
        button {
          background-color: var(--card-link-color);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 8px;
        }
        button:hover {
          background-color: #0052a3;
        }
      </style>
      <div class="card-content">
        <h2 id="title"></h2>
        <div class="project-image">
          <img id="image" alt="Project screenshot">
        </div>
        <p id="description"></p>
        <button id="details-btn" type="button">View Project Details</button>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.updateContent();
  }

  static get observedAttributes() {
    return ['title', 'description', 'image-url', 'project-url'];
  }

  attributeChangedCallback() {
    this.updateContent();
  }

  updateContent() {
    const shadow = this.shadowRoot;
    const title = shadow.getElementById('title');
    const description = shadow.getElementById('description');
    const image = shadow.getElementById('image');
    const detailsBtn = shadow.getElementById('details-btn');

    if (title) title.textContent = this.getAttribute('title') || '';
    if (description) description.textContent = this.getAttribute('description') || '';
    if (image) {
      image.src = this.getAttribute('image-url') || '';
      image.alt = `Screenshot of ${this.getAttribute('title') || 'Project'}`;
    }
    if (detailsBtn) {
      detailsBtn.onclick = () => {
        const projectUrl = this.getAttribute('project-url');
        if (projectUrl) {
          window.open(projectUrl, '_blank');
        }
      };
    }
  }

  setData(projectData) {
    this.setAttribute('title', projectData.title || '');
    this.setAttribute('description', projectData.description || '');
    this.setAttribute('image-url', projectData.imageUrl || projectData.imageSrc || '');
    this.setAttribute('project-url', projectData.projectUrl || '');
  }
}

customElements.define('project-card', ProjectCard);
