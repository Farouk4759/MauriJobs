let jobs = [];

// Load job data from jobs.json
fetch('jobs.json')
  .then(response => response.json())
  .then(data => {
    jobs = data;
    renderJobs(jobs);
  })
  .catch(error => console.error('Failed to load jobs:', error));

// Render job cards
function renderJobs(jobArray) {
  const jobList = document.getElementById('jobList');
  jobList.innerHTML = '';

  jobArray.forEach((job, index) => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.innerHTML = `
      <a href="job.html?id=${index}" style="text-decoration:none; color:inherit;">
        <h2 class="job-title">${job.title}</h2>
        <p class="company-name">${job.company}</p>
        <div class="job-meta">
          <span>📍 ${job.location}</span>
          <span>🗓 Deadline: ${job.deadline}</span>
          ${job.extra ? `<span>📝 ${job.extra}</span>` : ''}
        </div>
      </a>
    `;
    jobList.appendChild(jobCard);
  });
}


// Search functionality
document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(keyword) ||
    job.company.toLowerCase().includes(keyword) ||
    job.location.toLowerCase().includes(keyword) ||
    (job.extra && job.extra.toLowerCase().includes(keyword))
  );
  renderJobs(filteredJobs);
});

