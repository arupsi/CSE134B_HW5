
document.addEventListener('DOMContentLoaded', () => {
  const projectData = [
    {
      title: 'Awesome Project 1',
      description: 'This is the first awesome project. It does amazing things.',
      imageUrl: 'https://picsum.photos/seed/project1/400/300.jpg',
      projectUrl: 'https://www.google.com'
    },
    {
      title: 'Terrific Project 2',
      description: 'The second project is also terrific and solves world hunger.',
      imageUrl: 'https://picsum.photos/seed/project2/400/300.jpg',
      projectUrl: 'https://www.google.com'
    }
  ];

  localStorage.setItem('projectData', JSON.stringify(projectData));

  const projectContainer = document.getElementById('project-card-container');

  function clearContainer() {
    projectContainer.innerHTML = '';
  }

  function createProjectCard(project) {
    const card = document.createElement('project-card');
    card.setAttribute('title', project.title);
    card.setAttribute('description', project.description);
    card.setAttribute('image-url', project.imageUrl);
    card.setAttribute('project-url', project.projectUrl);
    return card;
  }

  function loadLocalData() {
    clearContainer();
    const storedData = localStorage.getItem('projectData');
    if (storedData) {
      const projects = JSON.parse(storedData);
      projects.forEach(project => {
        const card = createProjectCard(project);
        projectContainer.appendChild(card);
      });
    }
  }

  loadLocalData();

  document.getElementById('load-local').addEventListener('click', loadLocalData);

  document.getElementById('load-remote').addEventListener('click', () => {
    clearContainer();
    fetch('https://api.jsonbin.io/v3/b/688eb0737b4b8670d8abe6bb', {
      method: 'GET',
      headers: {
        'X-Master-Key': '$2a$10$mGjGk7aCSvOdzssmujgsZOSh1EewzsJA6fvNtD7BfX/5byKECOFxm'
      }
    })
      .then(response => response.json())
      .then(data => {
        const projects = data.record;
        console.log(projects)
        projects.forEach(project => {
          const card = document.createElement('project-card');
          card.setData(project);
          projectContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching remote data:', error);
      });
  });
});
